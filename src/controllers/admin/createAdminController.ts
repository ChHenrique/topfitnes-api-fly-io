import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { adminSchema, AdminSchemaDTO } from "src/schemas/adminSchema";
import { createAdmin, getAdminByEmail, getAdminByPhone } from "src/services/database/IAdminRepository";
import { ServerError } from "src/services/serverError";
import bcrypt from "bcrypt";

import { typeUploads } from "src/types/typeUploads";
import { normalizeMultipartBody } from "src/services/normalizeMultipartBody";
import { createUserPhotoMultipart } from "src/utils/photoMultipart";
import { verifyEmailOrPhoneExist } from "src/utils/verifyEmailOrPhoneExist";

export async function createAdminController(fastify: fastifyContextDTO) {

    const rawData = fastify.req.body as AdminSchemaDTO;
    const data = normalizeMultipartBody(rawData);

    const parsedData = adminSchema.safeParse(data);
    if (!parsedData.success) throw new ServerError("Dados inválidos");

    await verifyEmailOrPhoneExist(parsedData)

    const hashedPassword = await bcrypt.hash(parsedData.data.senha, 10);
    parsedData.data.senha = hashedPassword;

    await createUserPhotoMultipart(rawData, parsedData, typeUploads.ADMINISTRADOR);

    await createAdmin(parsedData.data);
    fastify.res.status(201).send({message: "Administrador criado com sucesso"});
};
