import { z } from "zod";
import { DiaSemana } from "@prisma/client";

export const studentTrainingDayWeekSchema = z.object({
  alunoTreinoId: z.string(),
  diasSemana: z.array(z.nativeEnum(DiaSemana))
});

export type studentTrainingWeekDayDTO = z.infer<typeof studentTrainingDayWeekSchema>;


