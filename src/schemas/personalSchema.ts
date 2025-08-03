import z from "zod"

export const personalSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    sobrenome: z.string().min(1, "O sobrenome é obrigatório"),
    foto: z.any(),
    telefone: z.string().min(15, "O telefone é obrigatório").max(15).optional(),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    email: z.email("O email deve ser válido").min(1, "O email é obrigatório").optional(),
    formacao: z.string().optional(),
    registro_profissional: z.string().optional(),
    especialidade: z.string().optional(),
    disponibilidade: z.string().optional()
});


export const loginPersonalSchema = z.object({
    email: z.email().min(1, "O email é obrigatório").optional(),
    telefone: z.string().min(15, "O telefone é obrigatório").max(15).optional(),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    rememberMe: z.boolean().default(false),
});

export type LoginPersonalSchemaDTO = z.infer<typeof loginPersonalSchema>
export type PersonalSchemaDTO = z.infer<typeof personalSchema>