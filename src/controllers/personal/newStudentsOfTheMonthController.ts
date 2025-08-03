import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getPersonalByEmail, getPersonalById } from "../../services/database/IPersonalRepository";
import { newStudentsOfTheMonth } from "../../services/database/IStudentRepository";
import { getUserById } from "../../services/database/IUserRepository";
import { ServerError } from "../../services/serverError";
import { checkAccessWithPersonal } from "../../utils/checkAccess";

export async function newStudentsOfTheMonthController(fastify: fastifyContextDTO) {
    const thisUserIsAuthorized = await checkAccessWithPersonal(fastify, getUserById);

    const personal = await getPersonalByEmail(thisUserIsAuthorized.email)
    if (!personal) throw new ServerError("Personal não encontrado")

    const newStudents = await newStudentsOfTheMonth(personal.id);

    fastify.res.send(newStudents);
}