import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getStudentTrainingById } from "../../services/database/studentTrainingRepository";
import { ServerError } from "../../services/serverError";

export async function getStudentTrainingByIdController(req: fastifyContextDTO) {
    const { user, params } = req.req;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role === "ALUNO") throw new ServerError("Acesso negado", 403);

    const { id } = params as { id?: string };

    if (!id) throw new ServerError("ID do aluno não fornecido", 400);

    const studentTraining = await getStudentTrainingById(id);

    if (!studentTraining || studentTraining.length === 0) {
        throw new ServerError("Nenhum treino encontrado para este aluno", 404);
    }

    req.res.status(200).send({ message: "Treinos encontrados com sucesso", studentTraining });
}