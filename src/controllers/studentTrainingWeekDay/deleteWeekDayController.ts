import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { deleteWeekDay } from "../../services/database/studentTrainingDayWeekRepository";

import { ServerError } from "../../services/serverError";

export async function deleteWeekDayController(fastify: fastifyContextDTO) {
  const { id } = fastify.req.params as { id: string };

  if (!id) throw new ServerError("Parâmetro 'id' é obrigatório", 400);

  await deleteWeekDay(id);
  fastify.res.status(200).send({ message: "Dia da semana deletado com sucesso" });
}
