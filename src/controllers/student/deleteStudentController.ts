import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { deleteStudent, getStudentByEmail } from "src/services/database/IStudentRepository";
import { getUserById } from "src/services/database/IUserRepository";
import { ServerError } from "src/services/serverError";
import { checkAccessWithPersonal } from "src/utils/checkAccess";

export async function deleteStudentController(fastify: fastifyContextDTO) {
    const isStudent = await checkAccessWithPersonal(fastify, getUserById);
    const student = await getStudentByEmail(isStudent.email);

    if (!student) throw new ServerError("Aluno não encontrado");
    await deleteStudent(student.usuario_id, student.id);
    
    fastify.res.status(200).send({ message: "Aluno deletado com sucesso" });
}