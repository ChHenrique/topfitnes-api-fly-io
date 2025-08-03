/*
  Warnings:

  - The primary key for the `Administrador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AlunoTreino` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AlunoTreinoDiaSemana` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Personal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Plano` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Administrador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'ADMINISTRADOR',
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Administrador" ("criado_em", "email", "foto", "id", "nome", "role", "senha", "sobrenome", "telefone") SELECT "criado_em", "email", "foto", "id", "nome", "role", "senha", "sobrenome", "telefone" FROM "Administrador";
DROP TABLE "Administrador";
ALTER TABLE "new_Administrador" RENAME TO "Administrador";
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");
CREATE TABLE "new_Aluno" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'ALUNO',
    "nome" TEXT,
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
    CONSTRAINT "Aluno_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "Plano" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aluno_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "Personal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("altura", "criado_em", "data_matricula", "email", "foco_corpo", "foco_treino", "foto", "id", "idade", "nome", "personal_id", "peso", "plano_id", "role", "senha", "sexo", "sobrenome", "telefone") SELECT "altura", "criado_em", "data_matricula", "email", "foco_corpo", "foco_treino", "foto", "id", "idade", "nome", "personal_id", "peso", "plano_id", "role", "senha", "sexo", "sobrenome", "telefone" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
CREATE UNIQUE INDEX "Aluno_telefone_key" ON "Aluno"("telefone");
CREATE TABLE "new_AlunoTreino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "aluno_id" TEXT NOT NULL,
    "treino_id" TEXT NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AlunoTreino_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlunoTreino_treino_id_fkey" FOREIGN KEY ("treino_id") REFERENCES "Treino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AlunoTreino" ("aluno_id", "concluido", "id", "treino_id") SELECT "aluno_id", "concluido", "id", "treino_id" FROM "AlunoTreino";
DROP TABLE "AlunoTreino";
ALTER TABLE "new_AlunoTreino" RENAME TO "AlunoTreino";
CREATE TABLE "new_AlunoTreinoDiaSemana" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alunoTreinoId" TEXT NOT NULL,
    "diaSemana" TEXT NOT NULL,
    CONSTRAINT "AlunoTreinoDiaSemana_alunoTreinoId_fkey" FOREIGN KEY ("alunoTreinoId") REFERENCES "AlunoTreino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AlunoTreinoDiaSemana" ("alunoTreinoId", "diaSemana", "id") SELECT "alunoTreinoId", "diaSemana", "id" FROM "AlunoTreinoDiaSemana";
DROP TABLE "AlunoTreinoDiaSemana";
ALTER TABLE "new_AlunoTreinoDiaSemana" RENAME TO "AlunoTreinoDiaSemana";
CREATE TABLE "new_Personal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'PERSONAL',
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL,
    "email" TEXT,
    "formacao" TEXT,
    "registro_profissional" TEXT,
    "especialidade" TEXT,
    "disponibilidade" TEXT,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Personal" ("criado_em", "disponibilidade", "email", "especialidade", "formacao", "foto", "id", "nome", "registro_profissional", "role", "senha", "sobrenome", "telefone") SELECT "criado_em", "disponibilidade", "email", "especialidade", "formacao", "foto", "id", "nome", "registro_profissional", "role", "senha", "sobrenome", "telefone" FROM "Personal";
DROP TABLE "Personal";
ALTER TABLE "new_Personal" RENAME TO "Personal";
CREATE UNIQUE INDEX "Personal_email_key" ON "Personal"("email");
CREATE TABLE "new_Plano" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo_plano" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL
);
INSERT INTO "new_Plano" ("id", "tipo_plano", "valor") SELECT "id", "tipo_plano", "valor" FROM "Plano";
DROP TABLE "Plano";
ALTER TABLE "new_Plano" RENAME TO "Plano";
CREATE TABLE "new_Treino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "foco_corpo" TEXT NOT NULL,
    "foto" TEXT,
    "criador_id" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Treino_criador_id_fkey" FOREIGN KEY ("criador_id") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Treino" ("criado_em", "criador_id", "descricao", "foco_corpo", "foto", "id", "nome") SELECT "criado_em", "criador_id", "descricao", "foco_corpo", "foto", "id", "nome" FROM "Treino";
DROP TABLE "Treino";
ALTER TABLE "new_Treino" RENAME TO "Treino";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
