/*
  Warnings:

  - Added the required column `usuario_id` to the `Administrador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `Personal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "senha" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Administrador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMINISTRADOR',
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Administrador_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Administrador" ("criado_em", "email", "foto", "id", "nome", "role", "senha", "sobrenome", "telefone") SELECT "criado_em", "email", "foto", "id", "nome", "role", "senha", "sobrenome", "telefone" FROM "Administrador";
DROP TABLE "Administrador";
ALTER TABLE "new_Administrador" RENAME TO "Administrador";
CREATE UNIQUE INDEX "Administrador_usuario_id_key" ON "Administrador"("usuario_id");
CREATE UNIQUE INDEX "Administrador_telefone_key" ON "Administrador"("telefone");
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");
CREATE TABLE "new_Aluno" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario_id" TEXT NOT NULL,
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
    CONSTRAINT "Aluno_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Aluno_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "Plano" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aluno_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "Personal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("altura", "criado_em", "data_matricula", "data_validade_plano", "email", "foco_corpo", "foco_treino", "foto", "id", "idade", "nome", "observacao", "personal_id", "peso", "plano_id", "role", "senha", "sexo", "sobrenome", "telefone", "treino_dias_por_semana") SELECT "altura", "criado_em", "data_matricula", "data_validade_plano", "email", "foco_corpo", "foco_treino", "foto", "id", "idade", "nome", "observacao", "personal_id", "peso", "plano_id", "role", "senha", "sexo", "sobrenome", "telefone", "treino_dias_por_semana" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_usuario_id_key" ON "Aluno"("usuario_id");
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
CREATE UNIQUE INDEX "Aluno_telefone_key" ON "Aluno"("telefone");
CREATE TABLE "new_Personal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario_id" TEXT NOT NULL,
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
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Personal_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Personal" ("criado_em", "disponibilidade", "email", "especialidade", "formacao", "foto", "id", "nome", "registro_profissional", "role", "senha", "sobrenome", "telefone") SELECT "criado_em", "disponibilidade", "email", "especialidade", "formacao", "foto", "id", "nome", "registro_profissional", "role", "senha", "sobrenome", "telefone" FROM "Personal";
DROP TABLE "Personal";
ALTER TABLE "new_Personal" RENAME TO "Personal";
CREATE UNIQUE INDEX "Personal_usuario_id_key" ON "Personal"("usuario_id");
CREATE UNIQUE INDEX "Personal_telefone_key" ON "Personal"("telefone");
CREATE UNIQUE INDEX "Personal_email_key" ON "Personal"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");
