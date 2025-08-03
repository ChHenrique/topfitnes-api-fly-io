import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getUserById } from "src/services/database/IUserRepository";
import { checkAccessWithPersonal } from "src/utils/checkAccess";

export async function getStudentController(fastify: fastifyContextDTO) {


    // mudei de getStudentByid pra GetUserById, n sei se vai ter algumas implicações no futuro, mas tá funcionando
    const isStudentExist = await checkAccessWithPersonal(fastify, getUserById);

    const { senha, role, ...rest } = isStudentExist;
    fastify.res.status(200).send(rest);
}