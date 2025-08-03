/*
  Warnings:

  - You are about to drop the column `concluido` on the `AlunoTreino` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TreinoRealizado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alunoTreinoId" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    CONSTRAINT "TreinoRealizado_alunoTreinoId_fkey" FOREIGN KEY ("alunoTreinoId") REFERENCES "AlunoTreino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AlunoTreino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "aluno_id" TEXT NOT NULL,
    "treino_id" TEXT NOT NULL,
    CONSTRAINT "AlunoTreino_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlunoTreino_treino_id_fkey" FOREIGN KEY ("treino_id") REFERENCES "Treino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AlunoTreino" ("aluno_id", "id", "treino_id") SELECT "aluno_id", "id", "treino_id" FROM "AlunoTreino";
DROP TABLE "AlunoTreino";
ALTER TABLE "new_AlunoTreino" RENAME TO "AlunoTreino";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "TreinoRealizado_alunoTreinoId_data_key" ON "TreinoRealizado"("alunoTreinoId", "data");
