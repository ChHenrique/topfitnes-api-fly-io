import { FastifyInstance } from "fastify";
import { createExerciseController } from "../controllers/exercise/createExerciseController";
import { deleteExerciseController } from "../controllers/exercise/deleteExerciseController";
import { getAllExerciseController } from "../controllers/exercise/getAllExerciseController";
import { getByIdExerciseController } from "../controllers/exercise/getByIdExerciseController";
import { updateExerciseController } from "../controllers/exercise/updateExerciseController";

import { authMiddleware } from "../middlewares/authMiddleware";

export async function exerciseRoutes(fastify: FastifyInstance) {
    fastify.post('/exercise/create', { preHandler: authMiddleware }, async (req, res) => await createExerciseController({ req, res }));
    fastify.put('/exercise/update/:id', { preHandler: authMiddleware }, async (req, res) => await updateExerciseController({ req, res }));
    fastify.get('/exercises', { preHandler: authMiddleware }, async (req, res) => await getAllExerciseController({ req, res }));
    fastify.get('/exercise/:id', { preHandler: authMiddleware }, async (req, res) => await getByIdExerciseController({ req, res }));
    fastify.delete('/exercise/:id', { preHandler: authMiddleware }, async (req, res) => await deleteExerciseController({ req, res }));
};