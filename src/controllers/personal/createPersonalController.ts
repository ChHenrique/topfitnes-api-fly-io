import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { personalSchema, PersonalSchemaDTO } from "../../schemas/personalSchema";
import { createPersonal, getPersonalByEmail, getPersonalByPhone } from "../../services/database/IPersonalRepository";
import { normalizeMultipartBody } from "../../services/normalizeMultipartBody";
import { ServerError } from "../../services/serverError";
import bcrypt from "bcrypt";
import { typeUploads } from "../../types/typeUploads";
import { photoStorageService } from "../../services/photoStorageService";
import { createUserPhotoMultipart } from "../../utils/photoMultipart";
import { verifyEmailOrPhoneExist } from "../../utils/verifyEmailOrPhoneExist";

export async function createPersonalController(fastify: fastifyContextDTO) {
    const user = fastify.req.user;

    if (!user) throw new ServerError("Usuário não autenticado", 401);
    if (user.role !== "ADMINISTRADOR") throw new ServerError("Acesso negado", 403);

    const rawData = fastify.req.body as PersonalSchemaDTO;
    const data = normalizeMultipartBody(rawData);

    const parsedData = personalSchema.safeParse(data);
    if (!parsedData.success) throw new ServerError("Dados inválidos", 400);

    await verifyEmailOrPhoneExist(parsedData)

    const hashedPassword = await bcrypt.hash(parsedData.data.senha, 10);
    parsedData.data.senha = hashedPassword;

    await createUserPhotoMultipart(rawData, parsedData, typeUploads.PERSONAL);

    const personal = await createPersonal(parsedData.data);
    fastify.res.status(201).send({
        message: "Personal criado com sucesso",
        personal: personal
    });
}