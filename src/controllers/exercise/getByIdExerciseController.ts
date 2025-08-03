import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getExerciseById } from "src/services/database/IExercisesRepository";
import { ServerError } from "src/services/serverError";

export async function getByIdExerciseController(fastify: fastifyContextDTO) {
    const { user, params } = fastify.req;
    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };
    if (!id) throw new ServerError("ID do exercício não fornecido", 400);

    const exercise = await getExerciseById(id);

    fastify.res.status(200).send({ exercise });
}
