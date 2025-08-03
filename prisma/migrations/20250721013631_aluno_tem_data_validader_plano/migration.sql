/*
  Warnings:

  - Added the required column `data_validade_plano` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'ALUNO',
    "nome" TEXT,
    "treino_dias_por_semana" INTEGER,
    "sobrenome" TEXT,
    "foto" TEXT NOT NULL,
    "sexo" TEXT NOT NULL DEFAULT 'PREFIRO_NAO_DIZER',
    "foco_treino" TEXT,
    "peso" REAL,
    "altura" REAL,
    "idade" INTEGER,
    "data_matricula" DATETIME,
    "email" TEXT,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "foco_corpo" TEXT,
    "plano_id" TEXT,
    "personal_id" TEXT,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacao" TEXT,
    "data_validade_plano" DATETIME NOT NULL,
    CONSTRAINT "Aluno_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "Plano" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aluno_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "Personal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("altura", "criado_em", "data_matricula", "email", "foco_corpo", "foco_treino", "foto", "id", "idade", "nome", "observacao", "personal_id", "peso", "plano_id", "role", "senha", "sexo", "sobrenome", "telefone", "treino_dias_por_semana") SELECT "altura", "criado_em", "data_matricula", "email", "foco_corpo", "foco_treino", "foto", "id", "idade", "nome", "observacao", "personal_id", "peso", "plano_id", "role", "senha", "sexo", "sobrenome", "telefone", "treino_dias_por_semana" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
CREATE UNIQUE INDEX "Aluno_telefone_key" ON "Aluno"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
