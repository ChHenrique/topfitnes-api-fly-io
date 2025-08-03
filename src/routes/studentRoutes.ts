import { FastifyInstance } from "fastify";
import { get } from "http";
import { createStudentController } from "src/controllers/student/createStudentController";
import { deleteStudentController } from "src/controllers/student/deleteStudentController";
import { getAllStudentsController } from "src/controllers/student/getAllStudentController";
import { getStudentController } from "src/controllers/student/getStundentController";
import { loginStudentController } from "src/controllers/student/loginStudentController";
import { logoutStudentController } from "src/controllers/student/logoutStudentController";
import { notifyStudentCOntroller } from "src/controllers/student/notifyStudentController";
import { overdueStudentByPersonalController, overdueStudentController } from "src/controllers/personal/overdueStudentPersonalController";
import { updateStudentController } from "src/controllers/student/updateStudentController";
import { updateValidityController } from "src/controllers/admin/updateValidityStudentController";
import { authMiddleware } from "src/middlewares/authMiddleware";
import { getAllPlanController } from "src/controllers/plan/getAllPlanController";

export async function studentRoutes(fastify: FastifyInstance) {
    fastify.post("/student/register", { preHandler: authMiddleware }, async (req, res) => await createStudentController({ req, res }));

    fastify.post("/student/login", async (req, res) => await loginStudentController({ req, res }));

    fastify.delete("/student/logout/:id", { preHandler: authMiddleware }, async (req, res) => await logoutStudentController({ req, res }));

    fastify.put("/student/:id", { preHandler: authMiddleware }, async (req, res) => await updateStudentController({ req, res }));

    fastify.get("/student/:id", { preHandler: authMiddleware }, async (req, res) => await getStudentController({ req, res }));

    fastify.get("/student/all", { preHandler: authMiddleware }, async (req, res) => getAllStudentsController({ req, res }));

    fastify.delete("/student/:id", { preHandler: authMiddleware }, async (req, res) => deleteStudentController({ req, res }));  

    fastify.post("/student/notify", {preHandler: authMiddleware}, async (req, res) => notifyStudentCOntroller({req,res}))

    fastify.get("/student/plan", async (req, res) => await getAllPlanController({req, res}))
}