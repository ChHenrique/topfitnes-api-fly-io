import { FastifyInstance } from "fastify";
import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { ServerError } from "src/services/serverError";
import { notifyAluno } from "src/services/socketIOSigleton";

export async function notifyStudentCOntroller(fastify: fastifyContextDTO){
    const user = fastify.req.user;
    if (!user) throw new ServerError("Usuário não autenticado", 401);

    notifyAluno(user.id, "Sua mensalidade vence em 3 dias");
    fastify.res.send({ok: true});

}