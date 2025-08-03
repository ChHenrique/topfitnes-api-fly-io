import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getAllExercises } from "../../services/database/IExercisesRepository";

import { ServerError } from "../../services/serverError";

export async function getAllExerciseController(fastify: fastifyContextDTO) {
    const { user } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const exercises = await getAllExercises();

    fastify.res.status(200).send({ exercises });
}
