import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getPersonalByEmail } from "src/services/database/IPersonalRepository";
import { ServerError } from "src/services/serverError";

export async function getPersonalByToken(fastify: fastifyContextDTO){
    const user = fastify.req.user;
    if (!user) throw new ServerError("Usuário não autenticado", 401);

    const personal = await getPersonalByEmail(user.email);
    if (!personal) throw new ServerError("Personal não encontrado");

    fastify.res.send(personal)
} 