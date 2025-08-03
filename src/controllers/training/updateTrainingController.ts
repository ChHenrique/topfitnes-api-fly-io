import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { trainingSchema, TrainingSchemaDTO } from "src/schemas/trainingSchema";
import { getTrainingById, updateTraining } from "src/services/database/ItrainingRepository";
import { normalizeMultipartBody } from "src/services/normalizeMultipartBody";
import { ServerError } from "src/services/serverError";
import { typeUploads } from "src/types/typeUploads";
import { updateUserPhotoMultipart } from "src/utils/photoMultipart";

export async function updateTrainingController(fastify: fastifyContextDTO) {
    const { user, body, params } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };
    if (!id) throw new ServerError("ID do treino não fornecido", 400);

    const trainingExists = await getTrainingById(id);
    if (!trainingExists) throw new ServerError("Treino não encontrado", 404);

    const data = normalizeMultipartBody(body as TrainingSchemaDTO);
    const parsed = trainingSchema.partial().safeParse(data);

    if (!parsed.success) throw new ServerError("Dados inválidos");

    await updateUserPhotoMultipart(body, parsed, typeUploads.TRAINING);

    const updatedTraining = await updateTraining(id, parsed.data);

    fastify.res.status(200).send({ message: "Treino atualizado com sucesso", training: updatedTraining });
}

