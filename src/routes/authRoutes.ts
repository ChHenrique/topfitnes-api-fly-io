import { FastifyInstance } from "fastify";
import { loginUserController } from "src/controllers/auth/loginUser";
import { logOutUserController } from "src/controllers/auth/logoutUser";
import { authMiddleware } from "src/middlewares/authMiddleware";

export async function authRoutes(fastify: FastifyInstance){
    fastify.post("/login", async (req, res) => await loginUserController({req, res}))
    fastify.delete("/logout", { preHandler: authMiddleware}, async (req, res) => await logOutUserController({req, res}))
}