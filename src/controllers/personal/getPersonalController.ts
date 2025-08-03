import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getPersonalByEmail } from "src/services/database/IPersonalRepository";
import { getUserById } from "src/services/database/IUserRepository";
import { ServerError } from "src/services/serverError";
import { checkAccess } from "src/utils/checkAccess";

export async function getPersonalController(fastify: fastifyContextDTO){
    const verification = await checkAccess(fastify, getUserById);

    const personal = await getPersonalByEmail(verification.email);
    if (!personal) throw new ServerError("Personal não encontrado", 404);
    
    const { senha, role, ...rest } = personal;
    fastify.res.status(200).send(rest);
}