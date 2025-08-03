import { prisma } from "src/config/prisma";
import { TrainingSchemaDTO } from "src/schemas/trainingSchema";

export async function getAllTrainings() {
    return await prisma.treino.findMany({
        include: { exercicios: true, alunos: true },
    });
}

export async function getTrainingById(id: string) {
    return await prisma.treino.findUnique({
        where: { id },
        include: { exercicios: true, alunos: true },
    });
}

export async function createTraining(data: TrainingSchemaDTO & { criador_id: string }) {
    return await prisma.treino.create({
        data: { ...data }
    });
}

export async function updateTraining(id: string, data: Partial<TrainingSchemaDTO>) {
    return await prisma.treino.update({
        where: { id },
        data: { ...data }
    });   
}

export async function deleteTraining(id: string) {
    return await prisma.treino.delete({
        where: { id }
    }); 
}