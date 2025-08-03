/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Personal_telefone_key" ON "Personal"("telefone");
