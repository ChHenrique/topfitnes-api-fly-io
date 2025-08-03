import { FastifyReply, FastifyRequest } from "fastify";


export interface fastifyContextDTO {
    req: FastifyRequest,
    res: FastifyReply
}