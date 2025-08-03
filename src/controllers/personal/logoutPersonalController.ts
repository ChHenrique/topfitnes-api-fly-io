import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getPersonalById } from "src/services/database/IPersonalRepository";
import { checkAccess } from "src/utils/checkAccess";

export async function logoutPersonalController(fastify: fastifyContextDTO){
    await checkAccess(fastify, getPersonalById);

    fastify.res.clearCookie("token", {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }).status(200).send({ message: "Logout realizado com sucesso" });
}