import { FastifyInstance } from "fastify";
import { createAdminController } from "src/controllers/admin/createAdminController";
import { deleteAdminController } from "src/controllers/admin/deleteAdminController";
import { getAdminController } from "src/controllers/admin/getAdminController";
import { getAllAdminController } from "src/controllers/admin/getAllAdminController";
import { loginAdminController } from "src/controllers/admin/loginAdminController";
import { logoutAdminController } from "src/controllers/admin/logoutAdminController";
import { updateAdminController } from "src/controllers/admin/updateAdminController";
import { overdueStudentController } from "src/controllers/personal/overdueStudentPersonalController";
import { updateValidityController } from "src/controllers/admin/updateValidityStudentController";
import { authMiddleware } from "src/middlewares/authMiddleware";

export async function adminRoutes(fastify: FastifyInstance) {
    fastify.get('/admin/:id', { preHandler: authMiddleware }, async (req, res) => await getAdminController({ req, res }));

    fastify.get('/admin/all', { preHandler: authMiddleware }, async (req, res) => await getAllAdminController({ req, res }));

    fastify.post('/admin/register', async (req, res) => await createAdminController({ req, res }));

    fastify.post('/admin/login', async (req, res) => await loginAdminController({ req, res }));

    fastify.put('/admin', { preHandler: authMiddleware }, async (req, res) => await updateAdminController({ req, res }));

    fastify.delete('/admin/:id', { preHandler: authMiddleware }, async (req, res) => deleteAdminController({ req, res }));

    fastify.delete('/admin/logout', { preHandler: authMiddleware }, async (req, res) => logoutAdminController({ req, res }));

    fastify.get("/admin/studentOverdue", { preHandler: authMiddleware }, async (req, res) => await overdueStudentController({ req, res }));

    fastify.put("/admin/studentUpdateValidity/:id", async (req, res) => await updateValidityController({ req, res }))
};