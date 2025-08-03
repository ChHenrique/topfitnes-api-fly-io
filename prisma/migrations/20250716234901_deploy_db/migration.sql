-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "plano_id" INTEGER,
    "personal_id" INTEGER,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Aluno_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "Plano" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aluno_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "Personal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Plano" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo_plano" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL DEFAULT 'ADMINISTRADOR',
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- CreateTable
CREATE TABLE "Treino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "foco_corpo" TEXT NOT NULL,
    "foto" TEXT,
    "criador_id" INTEGER NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Treino_criador_id_fkey" FOREIGN KEY ("criador_id") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "foto" TEXT,
    "descricao" TEXT NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "execucoes" INTEGER NOT NULL,
    "intervalo_descanso" INTEGER NOT NULL,
    "treino_id" TEXT NOT NULL,
    CONSTRAINT "Exercicio_treino_id_fkey" FOREIGN KEY ("treino_id") REFERENCES "Treino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AlunoTreino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aluno_id" INTEGER NOT NULL,
    "treino_id" TEXT NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AlunoTreino_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlunoTreino_treino_id_fkey" FOREIGN KEY ("treino_id") REFERENCES "Treino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AlunoTreinoDiaSemana" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoTreinoId" INTEGER NOT NULL,
    "diaSemana" TEXT NOT NULL,
    CONSTRAINT "AlunoTreinoDiaSemana_alunoTreinoId_fkey" FOREIGN KEY ("alunoTreinoId") REFERENCES "AlunoTreino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_telefone_key" ON "Aluno"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_email_key" ON "Personal"("email");
