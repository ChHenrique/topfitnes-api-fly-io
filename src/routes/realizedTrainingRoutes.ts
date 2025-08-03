import { FastifyInstance } from "fastify";
import { createRealizedTrainingController } from "src/controllers/realizedTraining/createRealizedTrainingController";
import { deleteRealizedTrainingController } from "src/controllers/realizedTraining/deleteRealizedController";


import { authMiddleware } from "src/middlewares/authMiddleware";

export async function realizedTrainingRoutes(fastify: FastifyInstance) {
    fastify.post('/realizedtraining/create', { preHandler: authMiddleware }, async (req, res) => await createRealizedTrainingController({ req, res }));
    fastify.delete('/realizedtraining/delete/:id', { preHandler: authMiddleware }, async (req, res) => await deleteRealizedTrainingController({ req, res }));
};