import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getTrainingById } from "../../services/database/ITrainingRepository";
import { ServerError } from "../../services/serverError";

export async function getByIdTrainingController(fastify: fastifyContextDTO) {
    const { user, params } = fastify.req;
    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };
    if (!id) throw new ServerError("ID do treino não fornecido", 400);

    const training = await getTrainingById(id);

    fastify.res.status(200).send({ training });
}
