import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getTemporaryStudent, updateTemporaryStudent } from "../../services/database/ITemporaryStudentRepository";
import { ServerError } from "../../services/serverError";

export async function updateTemporaryStudentController(fastify: fastifyContextDTO){
    /* 
    const user = fastify.req.user;
    if (!user) throw new ServerError("user não autenticado", 401);

    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403);
   */
    const { status } = fastify.req.body as { status: boolean };
    const { temporaryStudentId } = fastify.req.params as { temporaryStudentId: string };  

    const isTemporaryStudentExist = await getTemporaryStudent(temporaryStudentId);
    if (!isTemporaryStudentExist) throw new ServerError("Aluno temporário não encontrado", 404)

    await updateTemporaryStudent(status, temporaryStudentId);
    fastify.res.send(`O aluno temporário ${isTemporaryStudentExist.nome} foi atualizado`)
}