import { prisma } from "../../config/prisma";
import { studentTrainingDTO } from "../../schemas/studentTrainingSchema";


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

 export async function updateStudentTraining(id: string, aluno_id: string, treino_id: string) {
  return await prisma.alunoTreino.update({
   where: { id },
    data: { 
      aluno_id,
      treino_id
     }
  });
 }

export async function deleteStudentTraining(id: string) {
  return await prisma.alunoTreino.delete({
    where: { id }
  });
}
