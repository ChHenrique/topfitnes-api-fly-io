import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "process";
import { ServerError } from "src/services/serverError";
import { userDTO } from "src/types/user";

export async function authMiddleware(req: FastifyRequest){
    const token = req.cookies.token;
    if (!token) throw new ServerError("Unauthorized", 401);

    const decoded = jwt.verify(token, env.JWT_SECRET as string) as userDTO;
    req.user = decoded;
}