import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { deleteAdmin, getAdminByEmail, getAdminById } from "src/services/database/IAdminRepository";
import { getUserById } from "src/services/database/IUserRepository";
import { ServerError } from "src/services/serverError";
import { checkAccess } from "src/utils/checkAccess";

export async function deleteAdminController(fastify: fastifyContextDTO){
    const isAdminExist = await checkAccess(fastify, getUserById);

    const admin = await getAdminByEmail(isAdminExist.email);
    if (!admin) throw new ServerError("Admin não encontrado", 404)
    
    await deleteAdmin(admin.usuario_id, isAdminExist.id);
    fastify.res.status(200).send({ message: "Administrador deletado com sucesso" });
}