import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { exerciseDTO, exerciseSchema } from "../../schemas/exerciseSchema";
import { getExerciseById, updateExercise } from "../../services/database/IExercisesRepository";
import { normalizeMultipartBody } from "../../services/normalizeMultipartBody";
import { ServerError } from "../../services/serverError";
import { typeUploads } from "../../types/typeUploads";
import { updateUserPhotoMultipart } from "../../utils/photoMultipart";

export async function updateExerciseController(fastify: fastifyContextDTO) {
    const { user, body, params } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };
    if (!id) throw new ServerError("ID do exercício não fornecido", 400);

    const exerciseExists = await getExerciseById(id);
    if (!exerciseExists) throw new ServerError("Exercício não encontrado", 404);

    const data = normalizeMultipartBody(body as exerciseDTO);
    const parsed = exerciseSchema.partial().safeParse(data);

    if (!parsed.success) throw new ServerError("Dados inválidos");

    await updateUserPhotoMultipart(body, parsed, typeUploads.EXERCISE);

    const updatedExercise = await updateExercise(id, parsed.data);

    fastify.res.status(200).send({ message: "Exercício atualizado com sucesso", exercise: updatedExercise });
}

