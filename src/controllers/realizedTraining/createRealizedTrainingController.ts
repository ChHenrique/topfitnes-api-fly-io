import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { realizedTrainingSchema, realizedTrainingSchemaDTO } from "src/schemas/realizedTrainingSchema";
import { createRealizedTraining } from "src/services/database/realizedTrainingRepository";
import { ServerError } from "src/services/serverError";

export async function createRealizedTrainingController(fastify: fastifyContextDTO) {
    const user = fastify.req.user;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    const rawData = fastify.req.body as realizedTrainingSchemaDTO

    const parsedData = realizedTrainingSchema.safeParse(rawData);
    if (!parsedData.success) throw new ServerError("Dados inválidos", 400);

    const realizedTraining = await createRealizedTraining(parsedData.data);
    if (!realizedTraining) throw new ServerError("Erro ao criar treino realizado", 500);
    fastify.res.status(201).send({
        message: "Treino realizado criado com sucesso",
        realizedTraining: realizedTraining
    });
}

