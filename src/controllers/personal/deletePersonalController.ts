import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import {
  deletePersonal,

  getPersonalById,
} from "../../services/database/IPersonalRepository";
import { getUserById } from "../../services/database/IUserRepository";
import { ServerError } from "../../services/serverError";
import { checkAccess } from "../../utils/checkAccess";

export async function deletePersonalController(fastify: fastifyContextDTO) {
  const { id } = fastify.req.params as { id: string };

  const personal = await getPersonalById(id);

  if (!personal) throw new ServerError("Personal não encontrado", 404);

  await deletePersonal(id); 
  fastify.res.status(200).send({ message: "Personal deletado com sucesso" });
}

