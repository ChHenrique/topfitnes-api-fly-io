import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { studentTrainingDTO, studentTrainingSchema } from "../../schemas/studentTrainingSchema";
import { createStudentTraining } from "../../services/database/studentTrainingRepository";
import { normalizeMultipartBody } from "../../services/normalizeMultipartBody";
import { ServerError } from "../../services/serverError";

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
