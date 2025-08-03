import { prisma } from "../../config/prisma";
import { DiaSemana } from "@prisma/client";

export async function getWeekDaysByStudentTraining(studentTrainingId: string) {
  return await prisma.alunoTreinoDiaSemana.findMany({
    where: { alunoTreinoId: studentTrainingId }
  });
}

export async function deleteWeekDay(id: string) {
  return await prisma.alunoTreinoDiaSemana.delete({
    where: { id }
  });
}

export async function createWeekDays(data: { studentTrainingId: string, weekDays: DiaSemana[] }) {
  const records = data.weekDays.map((day) => ({
    alunoTreinoId: data.studentTrainingId,
    diaSemana: day as DiaSemana 
  }));

  return await prisma.alunoTreinoDiaSemana.createMany({
    data: records
  });
}
