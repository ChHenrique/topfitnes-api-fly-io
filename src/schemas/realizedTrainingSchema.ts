import z from "zod";

export const realizedTrainingSchema = z.object({
    alunoTreinoId: z.string().uuid(),
    data: z.string().datetime(),
})

export type realizedTrainingSchemaDTO = z.infer<typeof realizedTrainingSchema>;