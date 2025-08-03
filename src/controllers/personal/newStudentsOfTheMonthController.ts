import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getPersonalByEmail, getPersonalById } from "src/services/database/IPersonalRepository";
import { newStudentsOfTheMonth } from "src/services/database/IStudentRepository";
import { getUserById } from "src/services/database/IUserRepository";
import { ServerError } from "src/services/serverError";
import { checkAccessWithPersonal } from "src/utils/checkAccess";

export async function newStudentsOfTheMonthController(fastify: fastifyContextDTO) {
    const thisUserIsAuthorized = await checkAccessWithPersonal(fastify, getUserById);

    const personal = await getPersonalByEmail(thisUserIsAuthorized.email)
    if (!personal) throw new ServerError("Personal não encontrado")

    const newStudents = await newStudentsOfTheMonth(personal.id);

    fastify.res.send(newStudents);
}