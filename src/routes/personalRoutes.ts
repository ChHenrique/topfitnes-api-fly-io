import { FastifyInstance } from "fastify";
import { createPersonalController } from "../controllers/personal/createPersonalController";
import { deletePersonalController } from "../controllers/personal/deletePersonalController";
import { getAllPersonalController } from "../controllers/personal/getAllPersonalController";
import { getPersonalController } from "../controllers/personal/getPersonalController";
import { loginPersonalController } from "../controllers/personal/loginPersonalController";
import { logoutPersonalController } from "../controllers/personal/logoutPersonalController";
import { updatePersonalController } from "../controllers/personal/updatePersonalController";
import { newStudentsOfTheMonthController } from "../controllers/personal/newStudentsOfTheMonthController";
import { overdueStudentByPersonalController } from "../controllers/personal/overdueStudentPersonalController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getPersonalByToken } from "../controllers/personal/getPersonalByToken";

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
