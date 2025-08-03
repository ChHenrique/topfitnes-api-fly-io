/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Administrador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Administrador_telefone_key" ON "Administrador"("telefone");
