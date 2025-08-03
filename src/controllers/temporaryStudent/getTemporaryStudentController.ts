import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getTemporaryStudent } from "src/services/database/ITemporaryStudentRepository";
import { ServerError } from "src/services/serverError";

export async function getTemporaryStudentController(fastify: fastifyContextDTO) {
    /* 
    const user = fastify.req.user;
    if (!user) throw new ServerError("user não autenticado", 401);

    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403);
   */
    const { temporaryStudentId } = fastify.req.params as { temporaryStudentId: string };

    const isTemporaryStudentExist = await getTemporaryStudent(temporaryStudentId);
    if (!isTemporaryStudentExist) throw new ServerError("Aluno temporário não encontrado", 404)
    
    fastify.res.send(isTemporaryStudentExist);
}