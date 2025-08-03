import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getAllAdmins } from "../../services/database/IAdminRepository";
import { ServerError } from "../../services/serverError";

export async function getAllAdminController(fastify: fastifyContextDTO){
    const user = fastify.req.user;

    if (!user) throw new ServerError("Usuário não autenticado");
    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado");
    
    const admins = await getAllAdmins();
    const dataAdminsnotSensitive = admins.map(({ senha, role, ...rest }) => rest);

    fastify.res.status(200).send(dataAdminsnotSensitive);
}