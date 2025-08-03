import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { studentTrainingDTO, studentTrainingSchema } from "src/schemas/studentTrainingSchema";
import { createStudentTraining } from "src/services/database/studentTrainingRepository";
import { normalizeMultipartBody } from "src/services/normalizeMultipartBody";
import { ServerError } from "src/services/serverError";

export async function createStudentTrainingController(fastify: fastifyContextDTO) {
    const { user, body } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const data = normalizeMultipartBody(body as studentTrainingDTO);
    const parsed = studentTrainingSchema.safeParse(data);

    if (!parsed.success) throw new ServerError("Dados inválidos");

    const studentTraining = await createStudentTraining( {...parsed.data} );

    fastify.res.status(201).send({ message: "Treino aluno criado com sucesso", studentTraining: studentTraining });
}
