import { FastifyInstance } from "fastify";
import { createTemporaryStudentController } from "src/controllers/temporaryStudent/createTemporaryStudentController";
import { deleteTemporaryStudentController } from "src/controllers/temporaryStudent/deleteTemporaryStudentController";
import { getAllTemporaryStudentAcceptsController } from "src/controllers/temporaryStudent/getAllTemporaryStudentAcceptController";
import { getAllTemporaryStudentController } from "src/controllers/temporaryStudent/getAllTemporaryStudentController";
import { getTemporaryStudentController } from "src/controllers/temporaryStudent/getTemporaryStudentController";
import { updateTemporaryStudentController } from "src/controllers/temporaryStudent/updateTemporaryStudentController";
import { authMiddleware } from "src/middlewares/authMiddleware";
import { getTemporaryStudent } from "src/services/database/ITemporaryStudentRepository";

export async function temporaryStudentRoutes(fastify: FastifyInstance){
    fastify.post('/temporaryStudent', async (req, res) => await createTemporaryStudentController({req, res}));

    fastify.put('/temporaryStudent/:temporaryStudentId', async (req, res) => await updateTemporaryStudentController({req, res}));

    fastify.delete('/temporaryStudent/:temporaryStudentId', async (req, res) => await deleteTemporaryStudentController({req, res}));

    fastify.get('/temporaryStudent/:temporaryStudentId', async (req, res) => await getTemporaryStudentController({req, res}))

    fastify.get('/temporaryStudent/all', async (req, res) => await getAllTemporaryStudentController({req, res}))

    fastify.get('/temporaryStudent/accept', async (req, res) => await getAllTemporaryStudentAcceptsController({req, res}))
}