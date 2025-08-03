import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { exerciseDTO, exerciseSchema } from "src/schemas/exerciseSchema";
import { createExercise } from "src/services/database/IExercisesRepository";
import { createTraining } from "src/services/database/ITrainingRepository";
import { normalizeMultipartBody } from "src/services/normalizeMultipartBody";
import { ServerError } from "src/services/serverError";
import { typeUploads } from "src/types/typeUploads";
import { createUserPhotoMultipart } from "src/utils/photoMultipart";

export async function createExerciseController(fastify: fastifyContextDTO) {
    const { user, body } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const data = normalizeMultipartBody(body as exerciseDTO);
    const parsed = exerciseSchema.safeParse(data);

    if (!parsed.success) throw new ServerError("Dados inválidos");

    await createUserPhotoMultipart(body, parsed, typeUploads.EXERCISE);

    const exercise = await createExercise( {...parsed.data} );

    fastify.res.status(201).send({ message: "Exercício criado com sucesso", exercise: exercise });
}
