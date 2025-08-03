import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getPersonalByEmail } from "../../services/database/IPersonalRepository";
import { getUserById } from "../../services/database/IUserRepository";
import { ServerError } from "../../services/serverError";
import { checkAccess } from "../../utils/checkAccess";

export async function getPersonalController(fastify: fastifyContextDTO){
    const verification = await checkAccess(fastify, getUserById);

    const personal = await getPersonalByEmail(verification.email);
    if (!personal) throw new ServerError("Personal não encontrado", 404);
    
    const { senha, role, ...rest } = personal;
    fastify.res.status(200).send(rest);
}