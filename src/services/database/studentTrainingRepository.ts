import { prisma } from "src/config/prisma";
import { studentTrainingDTO } from "src/schemas/studentTrainingSchema";


export async function createStudentTraining(data: studentTrainingDTO) {
  return await prisma.alunoTreino.create({ data });
}

export async function getStudentTrainingById(aluno_id: string) {
  return await prisma.alunoTreino.findMany({
    where: { aluno_id },
    include: {
      treino: true,
      dias_semana: true
    }
  });
}

export async function updateStudentTraining(id: string, concluido: boolean) {
  return await prisma.alunoTreino.update({
    where: { id },
    data: { concluido }
  });
}

export async function deleteStudentTraining(id: string) {
  return await prisma.alunoTreino.delete({
    where: { id }
  });
}
