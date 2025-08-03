import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { trainingSchema, TrainingSchemaDTO } from "../../schemas/trainingSchema";
import { getPersonalByEmail } from "../../services/database/IPersonalRepository";
import { createTraining } from "../../services/database/ITrainingRepository";
import { normalizeMultipartBody } from "../../services/normalizeMultipartBody";
import { ServerError } from "../../services/serverError";
import { typeUploads } from "../../types/typeUploads";
import { createUserPhotoMultipart } from "../../utils/photoMultipart";

export async function createTrainingController(fastify: fastifyContextDTO) {
    const { user, body } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const data = normalizeMultipartBody(body as TrainingSchemaDTO);
    const parsed = trainingSchema.safeParse(data);

    if (!parsed.success) throw new ServerError("Dados inválidos");

    const personal = await getPersonalByEmail(user.email)
    if (!personal) throw new ServerError("User não encontrado");

    await createUserPhotoMultipart(body, parsed, typeUploads.TRAINING);

    await createTraining({
        ...parsed.data,
        criador_id: personal.id
    });

    fastify.res.status(201).send({ message: "Treino criado com sucesso" });
}
