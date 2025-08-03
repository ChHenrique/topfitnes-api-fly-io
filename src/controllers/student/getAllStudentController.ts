import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getAllStudents } from "../../services/database/IStudentRepository";
import { ServerError } from "../../services/serverError";

export async function getAllStudentsController(fastify: fastifyContextDTO) {
     const user = fastify.req.user;

     if (!user) throw new ServerError("Usuário não autenticado", 401);

    const students = await getAllStudents();
    if (!students || students.length === 0) throw new ServerError("Nenhum aluno encontrado", 404);

    const sanitizedStudents = students.map(({ senha, role, ...rest }) => rest);
    fastify.res.status(200).send(sanitizedStudents);
}