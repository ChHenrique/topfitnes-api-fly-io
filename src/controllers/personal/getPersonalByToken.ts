import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getPersonalByEmail } from "../../services/database/IPersonalRepository";
import { ServerError } from "../../services/serverError";

export async function getPersonalByToken(fastify: fastifyContextDTO){
    const user = fastify.req.user;
    if (!user) throw new ServerError("Usuário não autenticado", 401);

    const personal = await getPersonalByEmail(user.email);
    if (!personal) throw new ServerError("Personal não encontrado");

    fastify.res.send(personal)
} 