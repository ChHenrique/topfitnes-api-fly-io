import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getUserById } from "../../services/database/IUserRepository";
import { checkAccess } from "../../utils/checkAccess";

export async function getAdminController(fastify: fastifyContextDTO){
    const isAdminExist = await checkAccess(fastify, getUserById);
    
    const { senha, role, ...rest } = isAdminExist;
    fastify.res.status(200).send(rest);
}