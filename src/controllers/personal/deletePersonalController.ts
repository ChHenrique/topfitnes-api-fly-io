import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import {
  deletePersonal,

  getPersonalById,
} from "src/services/database/IPersonalRepository";
import { getUserById } from "src/services/database/IUserRepository";
import { ServerError } from "src/services/serverError";
import { checkAccess } from "src/utils/checkAccess";

export async function deletePersonalController(fastify: fastifyContextDTO) {
  const { id } = fastify.req.params as { id: string };

  const personal = await getPersonalById(id);

  if (!personal) throw new ServerError("Personal não encontrado", 404);

  await deletePersonal(id); 
  fastify.res.status(200).send({ message: "Personal deletado com sucesso" });
}

