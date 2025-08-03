import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { deleteStudent, getStudentByEmail } from "../../services/database/IStudentRepository";
import { getUserById } from "../../services/database/IUserRepository";
import { ServerError } from "../../services/serverError";
import { checkAccessWithPersonal } from "../../utils/checkAccess";

export async function deleteStudentController(fastify: fastifyContextDTO) {
    const isStudent = await checkAccessWithPersonal(fastify, getUserById);
    const student = await getStudentByEmail(isStudent.email);

    if (!student) throw new ServerError("Aluno não encontrado");
    await deleteStudent(student.usuario_id, student.id);
    
    fastify.res.status(200).send({ message: "Aluno deletado com sucesso" });
}