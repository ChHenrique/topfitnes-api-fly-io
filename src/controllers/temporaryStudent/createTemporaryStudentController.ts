import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { temporaryStudentSchema, temporaryStudentSchemaDTO } from "../../schemas/temporaryStudentSchema";
import { createTemporaryStudent } from "../../services/database/ITemporaryStudentRepository";
import { ServerError } from "../../services/serverError";

export async function createTemporaryStudentController(fastify: fastifyContextDTO){
    const data = fastify.req.body as temporaryStudentSchemaDTO;

    const parsedData = temporaryStudentSchema.safeParse(data);
    if (!parsedData.success) throw new ServerError("Dados inválidos");

    await createTemporaryStudent(parsedData.data);
    fastify.res.status(201).send({message: "Aluno temporário criado com sucesso!"});
};

