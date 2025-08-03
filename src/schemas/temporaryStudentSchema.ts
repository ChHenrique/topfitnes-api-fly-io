import z from "zod";

export const temporaryStudentSchema = z.object({
    nome: z.string().min(1, "Nome é obrigátorio"),
    email: z.email("Email é obrigatório"),
    telefone: z.string().length(15),
    status: z.boolean().default(false).optional()
});

export type temporaryStudentSchemaDTO = z.infer<typeof temporaryStudentSchema>;