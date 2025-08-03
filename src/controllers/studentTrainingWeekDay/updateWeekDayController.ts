import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { prisma } from "src/config/prisma";
import { DiaSemana } from "@prisma/client";
import { ServerError } from "src/services/serverError";

export async function updateWeekDayController(fastify: fastifyContextDTO) {
  const { id } = fastify.req.params as { id: string };
  const { diaSemana } = fastify.req.body as { diaSemana: DiaSemana };

  if (!id || !diaSemana) throw new ServerError("Parâmetros inválidos", 400);

  const updated = await prisma.alunoTreinoDiaSemana.update({
    where: { id },
    data: { diaSemana }
  });

  fastify.res.status(200).send({ message: "Dia da semana atualizado com sucesso", updated });
}
