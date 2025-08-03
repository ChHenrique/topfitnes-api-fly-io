import { FastifyInstance } from "fastify";
import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { ServerError } from "../../services/serverError";
import { notifyAluno } from "../../services/socketIOSigleton";

export async function notifyStudentCOntroller(fastify: fastifyContextDTO){
    const user = fastify.req.user;
    if (!user) throw new ServerError("Usuário não autenticado", 401);

    notifyAluno(user.id, "Sua mensalidade vence em 3 dias");
    fastify.res.send({ok: true});

}