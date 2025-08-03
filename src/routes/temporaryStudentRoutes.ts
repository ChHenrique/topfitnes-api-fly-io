import { FastifyInstance } from "fastify";
import { createTemporaryStudentController } from "../controllers/temporaryStudent/createTemporaryStudentController";
import { deleteTemporaryStudentController } from "../controllers/temporaryStudent/deleteTemporaryStudentController";
import { getAllTemporaryStudentAcceptsController } from "../controllers/temporaryStudent/getAllTemporaryStudentAcceptController";
import { getAllTemporaryStudentController } from "../controllers/temporaryStudent/getAllTemporaryStudentController";
import { getTemporaryStudentController } from "../controllers/temporaryStudent/getTemporaryStudentController";
import { updateTemporaryStudentController } from "../controllers/temporaryStudent/updateTemporaryStudentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getTemporaryStudent } from "../services/database/ITemporaryStudentRepository";

export async function temporaryStudentRoutes(fastify: FastifyInstance){
    fastify.post('/temporaryStudent', async (req, res) => await createTemporaryStudentController({req, res}));

    fastify.put('/temporaryStudent/:temporaryStudentId', async (req, res) => await updateTemporaryStudentController({req, res}));

    fastify.delete('/temporaryStudent/:temporaryStudentId', async (req, res) => await deleteTemporaryStudentController({req, res}));

    fastify.get('/temporaryStudent/:temporaryStudentId', async (req, res) => await getTemporaryStudentController({req, res}))

    fastify.get('/temporaryStudent/all', async (req, res) => await getAllTemporaryStudentController({req, res}))

    fastify.get('/temporaryStudent/accept', async (req, res) => await getAllTemporaryStudentAcceptsController({req, res}))
}