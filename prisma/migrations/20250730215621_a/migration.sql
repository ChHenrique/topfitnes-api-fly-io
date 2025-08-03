-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AlunoTreino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "aluno_id" TEXT NOT NULL,
    "treino_id" TEXT NOT NULL,
    CONSTRAINT "AlunoTreino_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AlunoTreino_treino_id_fkey" FOREIGN KEY ("treino_id") REFERENCES "Treino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AlunoTreino" ("aluno_id", "id", "treino_id") SELECT "aluno_id", "id", "treino_id" FROM "AlunoTreino";
DROP TABLE "AlunoTreino";
ALTER TABLE "new_AlunoTreino" RENAME TO "AlunoTreino";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
