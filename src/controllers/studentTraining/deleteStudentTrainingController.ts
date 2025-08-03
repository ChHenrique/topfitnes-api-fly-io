import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { deleteStudentTraining } from "../../services/database/studentTrainingRepository";
import { ServerError } from "../../services/serverError";

export async function deleteStudentTrainingController(fastify: fastifyContextDTO) {
    const { user, params } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };
    if (!id) throw new ServerError("ID do treino aluno não fornecido", 400);

    await deleteStudentTraining(id);

    fastify.res.status(200).send({ message: "Treino aluno deletado com sucesso" });
}