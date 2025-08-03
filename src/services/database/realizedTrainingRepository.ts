import { prisma } from "../../config/prisma";
import { realizedTrainingSchemaDTO } from "../../schemas/realizedTrainingSchema";

export async function createRealizedTraining(data: realizedTrainingSchemaDTO) {
    const realizedTraining = await prisma.treinoRealizado.create({
        data: {...data}
    })
    return realizedTraining;
}

export async function deleteRealizedTraining(idRealizedTraining: string) {
    await prisma.treinoRealizado.delete({
        where: { id: idRealizedTraining }
    })
    
}