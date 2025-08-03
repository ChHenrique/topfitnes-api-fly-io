import { FastifyInstance } from "fastify";
import { createStudentTrainingController } from "src/controllers/studentTraining/createStudentTrainingController";
import { deleteStudentTrainingController } from "src/controllers/studentTraining/deleteStudentTrainingController";
import { getStudentTrainingByIdController } from "src/controllers/studentTraining/getStudentTrainingByIdController";
import { updateStudentTrainingController } from "src/controllers/studentTraining/updateStudentTrainingController";


import { authMiddleware } from "src/middlewares/authMiddleware";

export async function studentTrainingRoutes(fastify: FastifyInstance) {
    fastify.post('/student-training/create', { preHandler: authMiddleware }, async (req, res) => await createStudentTrainingController({ req, res }));
    fastify.put('/student-training/update/:id', { preHandler: authMiddleware }, async (req, res) => await updateStudentTrainingController({ req, res }));
    fastify.get('/student-training/:idaluno', { preHandler: authMiddleware }, async (req, res) => await getStudentTrainingByIdController({ req, res }));
    fastify.delete('/student-training/delete/:id', { preHandler: authMiddleware }, async (req, res) => await deleteStudentTrainingController({ req, res }));
};