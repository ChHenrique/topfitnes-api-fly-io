import { FastifyInstance } from "fastify";
import { createTrainingController } from "src/controllers/training/createTrainingController";
import { deleteTrainingController } from "src/controllers/training/deleteTrainingController";
import { getAllTrainingController } from "src/controllers/training/getAllTrainingController";
import { getByIdTrainingController } from "src/controllers/training/getByIdTrainingController";
import { updateTrainingController } from "src/controllers/training/updateTrainingController";
import { authMiddleware } from "src/middlewares/authMiddleware";

export async function trainingRoutes(fastify: FastifyInstance) {
    fastify.post('/training/create', { preHandler: authMiddleware }, async (req, res) => await createTrainingController({ req, res }));
    fastify.put('/training/update/:id', { preHandler: authMiddleware }, async (req, res) => await updateTrainingController({ req, res }));
    fastify.get('/trainings', { preHandler: authMiddleware }, async (req, res) => await getAllTrainingController({ req, res }));
    fastify.get('/training/:id', { preHandler: authMiddleware }, async (req, res) => await getByIdTrainingController({ req, res }));
    // fastify.get('/trainings/month'), {preHandler: authMiddleware }, async (req, res) => await 
    fastify.delete('/training/:id', { preHandler: authMiddleware }, async (req, res) => await deleteTrainingController({ req, res }));
};