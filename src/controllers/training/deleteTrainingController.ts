import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { deleteTraining, getTrainingById } from "src/services/database/ItrainingRepository";
import { ServerError } from "src/services/serverError";

export async function deleteTrainingController(fastify: fastifyContextDTO) {
    const { user, params } = fastify.req;
    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };
    if (!id) throw new ServerError("ID do treino não fornecido", 400);

    const trainingExists = await getTrainingById(id);
    if (!trainingExists) throw new ServerError("Treino não encontrado", 404);

    await deleteTraining(id);

    fastify.res.status(200).send({ message: "Treino deletado com sucesso" });
}

