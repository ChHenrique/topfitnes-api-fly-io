import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getUserById } from "src/services/database/IUserRepository";
import { checkAccess } from "src/utils/checkAccess";

export async function getAdminController(fastify: fastifyContextDTO){
    const isAdminExist = await checkAccess(fastify, getUserById);
    
    const { senha, role, ...rest } = isAdminExist;
    fastify.res.status(200).send(rest);
}