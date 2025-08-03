import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getPersonalByEmail, getPersonalById } from "src/services/database/IPersonalRepository";
import { overdueStudents, overdueStudentsByPersonal } from "src/services/database/IStudentRepository";
import { getUserById } from "src/services/database/IUserRepository";
import { ServerError } from "src/services/serverError";
import { checkAccessWithPersonal } from "src/utils/checkAccess";

export async function overdueStudentByPersonalController(fastify: fastifyContextDTO){
    const thisUserIsAuthorized = await checkAccessWithPersonal(fastify, getUserById);

    const personal = await getPersonalByEmail(thisUserIsAuthorized.email)
    if (!personal) throw new ServerError("Personal não encontrado")
        
    const overdueStudents = await overdueStudentsByPersonal(personal.id);
    fastify.res.send(overdueStudents);
}


export async function overdueStudentController(fastify: fastifyContextDTO){
    const user = fastify.req.user;
    if (!user) throw new ServerError("Não autenticado", 401);

    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403);    
    const findManyOverdueStudents = await overdueStudents();

    fastify.res.send(findManyOverdueStudents);
}


