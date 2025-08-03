import { FastifyInstance } from "fastify";
import { createTrainingController } from "../controllers/training/createTrainingController";
import { deleteTrainingController } from "../controllers/training/deleteTrainingController";
import { getAllTrainingController } from "../controllers/training/getAllTrainingController";
import { getByIdTrainingController } from "../controllers/training/getByIdTrainingController";
import { updateTrainingController } from "../controllers/training/updateTrainingController";
import { authMiddleware } from "../middlewares/authMiddleware";

export async function trainingRoutes(fastify: FastifyInstance) {
    fastify.post('/training/create', { preHandler: authMiddleware }, async (req, res) => await createTrainingController({ req, res }));
    fastify.put('/training/update/:id', { preHandler: authMiddleware }, async (req, res) => await updateTrainingController({ req, res }));
    fastify.get('/trainings', { preHandler: authMiddleware }, async (req, res) => await getAllTrainingController({ req, res }));
    fastify.get('/training/:id', { preHandler: authMiddleware }, async (req, res) => await getByIdTrainingController({ req, res }));
    // fastify.get('/trainings/month'), {preHandler: authMiddleware }, async (req, res) => await 
    fastify.delete('/training/:id', { preHandler: authMiddleware }, async (req, res) => await deleteTrainingController({ req, res }));
};