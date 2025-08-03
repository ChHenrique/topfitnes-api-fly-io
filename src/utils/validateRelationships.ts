import { prisma } from "src/config/prisma";
import { ServerError } from "src/services/serverError";

export async function validateRelationships(planoId: string, personalId?: string) {
  const planoExists = await prisma.plano.count({ where: { id: planoId } });
  if (!planoExists) throw new ServerError("Plano não encontrado", 404);

  if (personalId) {
    const personalExists = await prisma.personal.count({ where: { id: personalId } });
    if (!personalExists) throw new ServerError("Personal trainer não encontrado", 404);
  }
}
