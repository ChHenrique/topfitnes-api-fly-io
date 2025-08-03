import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getPersonalById } from "../../services/database/IPersonalRepository";
import { checkAccess } from "../../utils/checkAccess";

export async function logoutPersonalController(fastify: fastifyContextDTO){
    await checkAccess(fastify, getPersonalById);

    fastify.res.clearCookie("token", {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }).status(200).send({ message: "Logout realizado com sucesso" });
}