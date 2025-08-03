import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getStudentById } from "../../services/database/IStudentRepository";
import { checkAccessWithPersonal } from "../../utils/checkAccess";

export async function logoutStudentController(fastify: fastifyContextDTO){
    await checkAccessWithPersonal(fastify, getStudentById);

    fastify.res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/student",
    }).status(200).send({ message: "Logout realizado com sucesso" });
}