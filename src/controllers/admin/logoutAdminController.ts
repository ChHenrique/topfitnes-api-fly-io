import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { ServerError } from "../../services/serverError";

export async function logoutAdminController(fastify: fastifyContextDTO){
    const user = fastify.req.user;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403);

    fastify.res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    }).status(200).send({ message: "Logout realizado com sucesso" });
    
}