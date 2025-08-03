import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getAllPersonals } from "../../services/database/IPersonalRepository";
import { ServerError } from "../../services/serverError";

export async function getAllPersonalController(fastify: fastifyContextDTO){
    const user = fastify.req.user;

     if (!user) throw new ServerError("Usuário não autenticado", 401);
    // if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403);

    const personals = await getAllPersonals();

    const sanitizedPersonals = personals.map(({ senha, role, ...rest }) => rest);
    fastify.res.status(200).send(sanitizedPersonals);
}