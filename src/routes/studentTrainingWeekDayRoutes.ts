import { FastifyInstance } from "fastify";
import { authMiddleware } from "src/middlewares/authMiddleware";
import { createWeekDaysController } from "src/controllers/studentTrainingWeekDay/createWeekDaysController";
import { getWeekDaysByStudentTrainingController } from "src/controllers/studentTrainingWeekDay/getWeekDaysByStudentTrainingController";
import { deleteWeekDayController } from "src/controllers/studentTrainingWeekDay/deleteWeekDayController";
import { updateWeekDayController } from "src/controllers/studentTrainingWeekDay/updateWeekDayController";

export async function studentTrainingWeekDayRoutes(fastify: FastifyInstance) {
    fastify.post('/student-training/weekday', { preHandler: authMiddleware }, async (req, res) =>
        await createWeekDaysController({ req, res })
    );

    fastify.get('/student-training/weekday/:alunoTreinoId', { preHandler: authMiddleware }, async (req, res) =>
        await getWeekDaysByStudentTrainingController({ req, res })
    );

    fastify.delete('/student-training/weekday/:id', { preHandler: authMiddleware }, async (req, res) =>
        await deleteWeekDayController({ req, res })
    );

    fastify.put('/student-training/weekday/:id', { preHandler: authMiddleware }, async (req, res) =>
        await updateWeekDayController({ req, res })
    );
}
