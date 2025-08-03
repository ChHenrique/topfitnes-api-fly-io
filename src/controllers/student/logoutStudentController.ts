import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getStudentById } from "src/services/database/IStudentRepository";
import { checkAccessWithPersonal } from "src/utils/checkAccess";

export async function logoutStudentController(fastify: fastifyContextDTO){
    await checkAccessWithPersonal(fastify, getStudentById);

    fastify.res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/student",
    }).status(200).send({ message: "Logout realizado com sucesso" });
}