import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { personalSchema, PersonalSchemaDTO } from "src/schemas/personalSchema";
import { createPersonal, getPersonalByEmail, getPersonalByPhone } from "src/services/database/IPersonalRepository";
import { normalizeMultipartBody } from "src/services/normalizeMultipartBody";
import { ServerError } from "src/services/serverError";
import bcrypt from "bcrypt";
import { typeUploads } from "src/types/typeUploads";
import { photoStorageService } from "src/services/photoStorageService";
import { createUserPhotoMultipart } from "src/utils/photoMultipart";
import { verifyEmailOrPhoneExist } from "src/utils/verifyEmailOrPhoneExist";

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