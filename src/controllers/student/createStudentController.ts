import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { studentSchema, studentSchemaDTO } from "src/schemas/studentSchema";
import { createStudent } from "src/services/database/IStudentRepository";
import { normalizeMultipartBody } from "src/services/normalizeMultipartBody";
import { ServerError } from "src/services/serverError";
import bcrypt from "bcrypt";
import { createUserPhotoMultipart } from "src/utils/photoMultipart";
import { typeUploads } from "src/types/typeUploads";
import { getPlan } from "src/services/database/IPlanRepository";
import { calculateValidity } from "src/utils/calculateValidity";
import { verifyEmailOrPhoneExist } from "src/utils/verifyEmailOrPhoneExist";

export async function createStudentController(fastify: fastifyContextDTO) {
    const user = fastify.req.user;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role !== "ADMINISTRADOR" && user.role !== "PERSONAL") throw new ServerError("Acesso negado", 403);

    const rawData = fastify.req.body as studentSchemaDTO;
    const data = normalizeMultipartBody(rawData);

    if (user.role === "PERSONAL") data.personalId = user.id;

    const parsedData = studentSchema.safeParse(data);
    if (!parsedData.success) throw new ServerError("Dados inválidos");

    await verifyEmailOrPhoneExist(parsedData)
    if (!parsedData.data.email && !parsedData.data.telefone) throw new ServerError("Email ou telefone é obrigatório", 400);

    const plan = await getPlan(parsedData.data.planoId)
    if (!plan) throw new ServerError("Plano não encontrado", 404);

    const hashedPassword = await bcrypt.hash(parsedData.data.senha, 10);
    parsedData.data.senha = hashedPassword;

    await createUserPhotoMultipart(rawData, parsedData, typeUploads.ALUNO);
    const validityPlan = calculateValidity(plan.duracaoMeses)

    const student = await createStudent(parsedData.data, validityPlan);
    const { senha, ...rest } = student;

    fastify.res.status(201).send({
        message: "Aluno criado com sucesso",
        student: rest,
    });
}