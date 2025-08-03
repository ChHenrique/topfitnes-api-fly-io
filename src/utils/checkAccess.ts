import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { ServerError } from "src/services/serverError";

export async function checkAccess(fastify: fastifyContextDTO, getUserById: Function) {
    const user = fastify.req.user;
    console.log(user)
    if (!user) throw new ServerError("Usuário não autenticado", 401)
    const { id } = fastify.req.params as { id?: string }; // id opcional

    const isAdmin = user?.role === "ADMINISTRADOR";
    const isSelfDelete = !id || id === user?.id;

    if (!isAdmin && !isSelfDelete) throw new ServerError("Acesso negado", 403);
    const targetId = isAdmin ? (id || user.id) : user.id;

    const isUser = await getUserById(targetId);
    if (!isUser) throw new ServerError("User não encontrado", 404);

    return isUser;
}



export async function checkAccessWithPersonal(fastify: fastifyContextDTO, getUserById: Function) {
    const user = fastify.req.user;
    const { id } = fastify.req.params as { id: string };

    const isAuthorized = user?.role === "ADMINISTRADOR" || user?.role === "PERSONAL";
    const isSelfDelete = !id || id === user?.id;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (!isAuthorized && !isSelfDelete) throw new ServerError("Acesso negado", 403);

    const targetId = isAuthorized ? id : user.id;
    const isUser = await getUserById(targetId);

    if (!isUser) throw new ServerError("User não encontrado", 404);

    return isUser;
}
