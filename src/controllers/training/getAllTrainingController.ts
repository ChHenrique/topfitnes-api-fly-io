import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getAllTrainings } from "../../services/database/ITrainingRepository";
import { ServerError } from "../../services/serverError";

export async function getAllTrainingController(fastify: fastifyContextDTO) {
    const { user } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const trainings = await getAllTrainings();

    fastify.res.status(200).send({ trainings });
}
