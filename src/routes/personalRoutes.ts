import { FastifyInstance } from "fastify";
import { createPersonalController } from "src/controllers/personal/createPersonalController";
import { deletePersonalController } from "src/controllers/personal/deletePersonalController";
import { getAllPersonalController } from "src/controllers/personal/getAllPersonalController";
import { getPersonalController } from "src/controllers/personal/getPersonalController";
import { loginPersonalController } from "src/controllers/personal/loginPersonalController";
import { logoutPersonalController } from "src/controllers/personal/logoutPersonalController";
import { updatePersonalController } from "src/controllers/personal/updatePersonalController";
import { newStudentsOfTheMonthController } from "src/controllers/personal/newStudentsOfTheMonthController";
import { overdueStudentByPersonalController } from "src/controllers/personal/overdueStudentPersonalController";
import { authMiddleware } from "src/middlewares/authMiddleware";
import { getPersonalByToken } from "src/controllers/personal/getPersonalByToken";

export async function personalRoutes(fastify: FastifyInstance) {
    fastify.post("/personal/register", { preHandler: authMiddleware }, async (req, res) => await createPersonalController({ req, res }));

    fastify.post("/personal/login", async (req, res) => await loginPersonalController({ req, res }));

    fastify.put("/personal/:id", { preHandler: authMiddleware }, async (req, res) => await updatePersonalController({ req, res }));

    fastify.get("/personal/:id", { preHandler: authMiddleware }, async (req, res) => await getPersonalController({ req, res }));

    fastify.delete("/personal/:id", { preHandler: authMiddleware }, async (req, res) => await deletePersonalController({ req, res }));

    fastify.get("/personal/all", { preHandler: authMiddleware }, async (req, res) => await getAllPersonalController({ req, res }));

    fastify.delete("/personal/logout", { preHandler: authMiddleware }, async (req, res) => await logoutPersonalController({ req, res }));

    fastify.get("/personal/newStudentsOfTheMonth/:id", { preHandler: authMiddleware }, async (req, res) => await newStudentsOfTheMonthController({ req, res }));

    fastify.get("/personal/studentOverdue/:id", { preHandler: authMiddleware }, async (req, res) => await overdueStudentByPersonalController({ req, res }));

    fastify.get("/personal/token", { preHandler: authMiddleware }, async (req, res) => await getPersonalByToken({req, res}))
}
