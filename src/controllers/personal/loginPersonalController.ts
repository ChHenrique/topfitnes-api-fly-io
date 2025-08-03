import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { loginPersonalSchema, LoginPersonalSchemaDTO } from "../../schemas/personalSchema";
import { getPersonalByEmail, getPersonalByPhone } from "../../services/database/IPersonalRepository";
import { ServerError } from "../../services/serverError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { payloadJWT } from "../../utils/payloadJWT";

export async function loginPersonalController(fastify: fastifyContextDTO){
    const data = fastify.req.body as LoginPersonalSchemaDTO;
    let personal;

    const parsedData = loginPersonalSchema.safeParse(data);
    if (!parsedData.success) throw new ServerError("Dados inválidos");

    if (parsedData.data.email){
        personal = await getPersonalByEmail(parsedData.data.email);
    } else if (parsedData.data.telefone) {
        personal = await getPersonalByPhone(parsedData.data.telefone);
    } else {
        throw new ServerError("Credencias inválidas");
    }

    if (!personal) throw new ServerError("Credencias inválidas");

    const isPasswordValid = await bcrypt.compare(parsedData.data.senha, personal.senha);
    if (!isPasswordValid) throw new ServerError("Credencias inválidas");

    const payload = payloadJWT(personal, "PERSONAL");
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: parsedData.data.rememberMe ? "60d" : "1h",
    });

    fastify.res.setCookie("token", token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: parsedData.data.rememberMe ? 60 * 60 * 24 * 60 : 60 * 60,
    }).send({message: "Login realizado com sucesso",
    });
}