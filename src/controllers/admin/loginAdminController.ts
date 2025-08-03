import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { loginAdminSchema, LoginAdminSchemaDTO } from "../../schemas/adminSchema";
import { getAdminByEmail, getAdminByPhone } from "../../services/database/IAdminRepository";
import { ServerError } from "../../services/serverError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userDTO } from "../../types/user";
import { payloadJWT } from "../../utils/payloadJWT";

export async function loginAdminController(fastify: fastifyContextDTO){
    const data = fastify.req.body as LoginAdminSchemaDTO;
    let admin;

    const parsedData = loginAdminSchema.safeParse(data);
    if (!parsedData.success) throw new ServerError("Dados inválidos");

    if (parsedData.data.email){
        admin = await getAdminByEmail(parsedData.data.email);
    } else if (parsedData.data.telefone) {
        admin = await getAdminByPhone(parsedData.data.telefone);
    } else {
        throw new ServerError("Email ou telefone são obrigatórios", 400);
    }

    if (!admin) throw new ServerError("Credencias inválidas");

    const isPasswordValid = await bcrypt.compare(parsedData.data.senha, admin.senha);
    if (!isPasswordValid) throw new ServerError("Credencias inválidas", 401);

    const payload = payloadJWT(admin, "ADMINISTRADOR")
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: parsedData.data.rememberMe ? "60d" : "1h",
    });

    fastify.res.setCookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: parsedData.data.rememberMe ? 60 * 60 * 24 * 60 : 60 * 60,
    }).send({message: "Login realizado com sucesso",});
}