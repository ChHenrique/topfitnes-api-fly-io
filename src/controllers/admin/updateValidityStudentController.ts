import { Aluno } from "@prisma/client";
import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getPlan } from "../../services/database/IPlanRepository";
import { getStudentById, updateValidity } from "../../services/database/IStudentRepository";
import { ServerError } from "../../services/serverError";
import { calculateValidity } from "../../utils/calculateValidity";
import { checkAccessWithPersonal } from "../../utils/checkAccess";
import jwt from "jsonwebtoken"
import { timeValidityJWT } from "../../utils/timeValidityJWT";
import { payloadJWT } from "../../utils/payloadJWT";

export async function updateValidityController(fastify: fastifyContextDTO) {
    const user = fastify.req.user;
    const { id } = fastify.req.params as {id: string};

    if (!user) throw new ServerError("Não autorizado", 401);

    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403)
    const student: Aluno = await checkAccessWithPersonal(fastify, getStudentById);

    if (!student.plano_id) throw new ServerError("Nenhum plano ligado ao aluno foi encontrado", 404)

    const expirationValidity = student.data_validade_plano < new Date();
    if (!expirationValidity) throw new ServerError("O plano ainda está ativo. Só pode ser renovado após o vencimento.");

    const plano = await getPlan(student.plano_id)
    if (!plano) throw new ServerError("Plano não encontrado", 404);

    const newValidity = calculateValidity(plano.duracaoMeses);
    const updatedStudent = await updateValidity(student.id, newValidity);

    const expiresIn = timeValidityJWT(updatedStudent.data_validade_plano);
    const payload = payloadJWT(student, "ALUNO")

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn
    });

    fastify.res.setCookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: expiresIn * 1000,
        path: "/student"
    }).send({ message: "Validade atualizada", vencimento: newValidity });
}