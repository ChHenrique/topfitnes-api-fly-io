import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getWeekDaysByStudentTraining } from "src/services/database/studentTrainingDayWeekRepository";
import { ServerError } from "src/services/serverError";

export async function getWeekDaysByStudentTrainingController(fastify: fastifyContextDTO) {
  const { alunoTreinoId } = fastify.req.params as { alunoTreinoId: string };

  if (!alunoTreinoId) throw new ServerError("Parâmetro 'alunoTreinoId' é obrigatório", 400);

  const days = await getWeekDaysByStudentTraining(alunoTreinoId);
  fastify.res.status(200).send({ weekDays: days });
}
