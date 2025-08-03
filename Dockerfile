FROM node:20

WORKDIR /app

COPY . .

# Ativa o corepack e pnpm
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Instala dependências
RUN pnpm install

# Gera o client do Prisma
RUN pnpm exec prisma generate

# Aplica as migrações no banco (SQLite, já embutido na imagem)
RUN pnpm exec prisma migrate deploy

# Inicia a aplicação
CMD ["pnpm", "exec", "tsx", "src/server.ts"]
