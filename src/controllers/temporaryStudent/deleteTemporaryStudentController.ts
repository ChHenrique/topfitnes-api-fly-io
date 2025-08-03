import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { deleteTemporaryStudent, getTemporaryStudent } from "../../services/database/ITemporaryStudentRepository";
import { ServerError } from "../../services/serverError";

export async function deleteTemporaryStudentController(fastify: fastifyContextDTO) {
   /* 
    const user = fastify.req.user;
    if (!user) throw new ServerError("user não autenticado", 401);

    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403);
   */
    const { temporaryStudentId } = fastify.req.params as { temporaryStudentId: string };

    const isTemporaryStudentExist = await getTemporaryStudent(temporaryStudentId);
    if (!isTemporaryStudentExist) throw new ServerError("Aluno temporário não encontrado", 404)

    await deleteTemporaryStudent(isTemporaryStudentExist.id);
    fastify.res.send(`O aluno temporário ${isTemporaryStudentExist.nome} foi removido`)
}