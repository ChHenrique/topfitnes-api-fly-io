import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { studentTrainingDayWeekSchema } from "../../schemas/studentTrainingDayWeek";
import { createWeekDays } from "../../services/database/studentTrainingDayWeekRepository";

import { ServerError } from "../../services/serverError";


export async function createWeekDaysController(fastify: fastifyContextDTO) {
  const { body } = fastify.req;

  const parsed = studentTrainingDayWeekSchema.safeParse(body);
  if (!parsed.success) throw new ServerError("Dados inválidos");

  const result = await createWeekDays({
    studentTrainingId: parsed.data.alunoTreinoId,
    weekDays: parsed.data.diasSemana
  });
  fastify.res.status(201).send({ message: "Dias da semana criados com sucesso", count: result.count });
}
