import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { studentTrainingDTO, studentTrainingSchema } from "../../schemas/studentTrainingSchema";
import { updateStudentTraining } from "../../services/database/studentTrainingRepository";
import { normalizeMultipartBody } from "../../services/normalizeMultipartBody";
import { ServerError } from "../../services/serverError";

export async function updateStudentTrainingController(fastify: fastifyContextDTO) {
    const { user, body, params } = fastify.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };
    if (!id) throw new ServerError("ID do treino aluno não fornecido", 400);

    const data = normalizeMultipartBody(body as studentTrainingDTO);
    const parsed = studentTrainingSchema.safeParse(data);

    if (!parsed.success) throw new ServerError("Dados inválidos");

    const updatedStudentTraining = await updateStudentTraining(id, parsed.data.aluno_id, parsed.data.treino_id);

    fastify.res.status(200).send({ message: "Treino aluno atualizado com sucesso", studentTraining: updatedStudentTraining });
}