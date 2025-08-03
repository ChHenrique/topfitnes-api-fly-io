import { ServerError } from "src/services/serverError";

export function timeValidityJWT(date: Date): number {
  const now = new Date();
  const validade = new Date(date);

  const diffMs = validade.getTime() - now.getTime(); 
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds <= 0) throw new ServerError("Plano expirado. Faça login novamente.", 401);

  return diffSeconds;
}
