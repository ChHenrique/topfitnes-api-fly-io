import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { deleteRealizedTraining } from "src/services/database/realizedTrainingRepository";
import { ServerError } from "src/services/serverError";

export async function deleteRealizedTrainingController(fastify: fastifyContextDTO) {
    const { id } = fastify.req.params as { id: string };
    const user = fastify.req.user;
    if (!user) throw new ServerError("Usuário não autenticado", 401);
    
    await deleteRealizedTraining(id);
    
    fastify.res.status(200).send({ message: "Treino realizado deletado com sucesso!" });
}