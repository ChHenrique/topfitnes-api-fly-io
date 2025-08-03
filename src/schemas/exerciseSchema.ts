import { z } from "zod";

export const exerciseSchema = z.object({
  nome: z.string(),
  foto: z.any(),
  descricao: z.string(),
  repeticoes: z.number().int(),
  execucoes: z.number().int(),
  intervalo_descanso: z.number().int(),
  treino_id: z.string()
});

export type exerciseDTO = z.infer<typeof exerciseSchema>;