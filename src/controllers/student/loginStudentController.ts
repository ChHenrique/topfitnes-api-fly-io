import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { loginStudentSchema, LoginStudentSchemaDTO } from "../../schemas/studentSchema";
import { getStudentByEmail, getStudentByPhone } from "../../services/database/IStudentRepository";
import { ServerError } from "../../services/serverError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { timeValidityJWT } from "../../utils/timeValidityJWT";

export async function loginStudentController(fastify: fastifyContextDTO){
    const data = fastify.req.body as LoginStudentSchemaDTO;
    let student;

    const parsedData = loginStudentSchema.safeParse(data);
    if (!parsedData.success) {
        console.log("erro: ", parsedData.error.format);
        throw new Error("Dados inválidos");
    }

    if (parsedData.data.email){
        student = await getStudentByEmail(parsedData.data.email);
    } else if (parsedData.data.telefone){
        student = await getStudentByPhone(parsedData.data.telefone);
    } else {
            throw new ServerError("Credencias inválidas");
    }

    if (!student) throw new ServerError("Credenciais inválidas");

    const isPasswordValid = await bcrypt.compare(parsedData.data.senha, student.senha);
    if (!isPasswordValid) throw new ServerError("Credenciais inválidas");
    
    const expiresIn = timeValidityJWT(student.data_validade_plano)
    const payload = {
        id: student.id,
        role: "ALUNO",
        email: student.email,
        telefone: student.telefone,
        rememberMe: parsedData.data.rememberMe,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn
    });

    fastify.res.setCookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: expiresIn,
        path: "/student"
    }).send({message: "Login realizado com sucesso",
    });
}