import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getAllTemporaryStudentsAccepts } from "src/services/database/ITemporaryStudentRepository";
import { ServerError } from "src/services/serverError";

export async function getAllTemporaryStudentAcceptsController(fastify: fastifyContextDTO) {
    /* 
    const user = fastify.req.user;
    if (!user) throw new ServerError("user não autenticado", 401);

    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403);
   */
    const temporaryStudents = await getAllTemporaryStudentsAccepts();
    if (temporaryStudents.length === 0 && !temporaryStudents) {
        fastify.res.send("Nenhum aluno temporário foi encontrado")
        return
    };

    fastify.res.send(temporaryStudents);
}