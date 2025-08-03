import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { deleteAdmin, getAdminByEmail, getAdminById } from "../../services/database/IAdminRepository";
import { getUserById } from "../../services/database/IUserRepository";
import { ServerError } from "../../services/serverError";
import { checkAccess } from "../../utils/checkAccess";

export async function deleteAdminController(fastify: fastifyContextDTO){
    const isAdminExist = await checkAccess(fastify, getUserById);

    const admin = await getAdminByEmail(isAdminExist.email);
    if (!admin) throw new ServerError("Admin não encontrado", 404)
    
    await deleteAdmin(admin.usuario_id);
    fastify.res.status(200).send({ message: "Administrador deletado com sucesso" });
}