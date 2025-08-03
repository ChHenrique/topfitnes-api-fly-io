/*
  Warnings:

  - Added the required column `duracaoMeses` to the `Plano` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plano" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo_plano" TEXT NOT NULL,
    "duracaoMeses" INTEGER NOT NULL,
    "valor" DECIMAL NOT NULL
);
INSERT INTO "new_Plano" ("id", "tipo_plano", "valor") SELECT "id", "tipo_plano", "valor" FROM "Plano";
DROP TABLE "Plano";
ALTER TABLE "new_Plano" RENAME TO "Plano";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
