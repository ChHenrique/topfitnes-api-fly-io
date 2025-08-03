import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { ServerError } from "src/services/serverError";

export async function logOutUserController(fastify: fastifyContextDTO){
    const user = fastify.req.user;
    if (!user) throw new ServerError("User não autenticado", 401);

    let isStudent = false;
    if (user.role === "ALUNO") isStudent = true

    fastify.res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    }).status(200).send({ message: "Logout realizado com sucesso", role: user.role });
}