import { FastifyInstance } from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import fastifyStatic from "@fastify/static";

// Corrige o caminho baseado no local real do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function staticFilesPlugin(fastify: FastifyInstance) {
  const pathToUploads = path.resolve(__dirname, "..", "..", "..", "topfitness-api", "uploads");

  fastify.register(fastifyStatic, {
    root: pathToUploads,
    prefix: "/uploads/",
  });
}

