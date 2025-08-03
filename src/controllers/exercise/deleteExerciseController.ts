import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { deleteExercise, getExerciseById } from "src/services/database/IExercisesRepository";
import { ServerError } from "src/services/serverError";

export async function deleteExerciseController(fastify: fastifyContextDTO) {
    const { user, params } = fastify.req;
    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };
    if (!id) throw new ServerError("ID do treino não fornecido", 400);

    const exerciseExists = await getExerciseById(id);
    if (!exerciseExists) throw new ServerError("Treino não encontrado", 404);

    await deleteExercise(id);

    fastify.res.status(200).send({ message: "Treino deletado com sucesso" });
}

