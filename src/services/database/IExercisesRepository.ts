import { prisma } from "src/config/prisma";
import { ServerError } from "../serverError";
import { exerciseDTO } from "src/schemas/exerciseSchema";

export async function createExercise(data: exerciseDTO) {
    const exercise = await prisma.exercicio.create({
        data: { ...data},
    });
    
    return exercise;
}

export async function updateExercise(id: string, data: Partial<exerciseDTO>) {
    const exercise = await prisma.exercicio.update({
        where: { id },
        data: { ...data },
    });

    return exercise;
}

export async function getExerciseById(id: string) {
    const exercise = await prisma.exercicio.findUnique({
        where: { id },
    });

    return exercise;
}

export async function getAllExercises() {
    const exercises = await prisma.exercicio.findMany();

    return exercises;
}

export async function deleteExercise(id: string) {
    const exercise = await prisma.exercicio.delete({
        where: { id },
    });

    return exercise;
}

