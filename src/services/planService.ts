import { getStudentById } from "./database/IStudentRepository";
import { ServerError } from "./serverError";

export const validateStudentPlan = async (studentId: string) => {
  const aluno = await getStudentById(studentId);
  if (!aluno) throw new ServerError("Aluno não encontrado", 404);
  
  const dataValidade = new Date(aluno.data_validade_plano);
  const hoje = new Date();
  
  if (dataValidade < hoje) {
    throw new ServerError("Plano expirado", 403);
  }
}