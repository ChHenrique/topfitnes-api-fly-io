FROM node:20

WORKDIR /app

COPY . .

# Ativa pnpm
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Instala dependências
RUN pnpm install

# Gera o client do Prisma
RUN pnpm exec prisma generate

# Aplica as migrações no banco
RUN pnpm exec prisma migrate deploy

# Compila o TypeScript
RUN pnpm run build

# Roda o servidor compilado
CMD ["pnpm", "start"]
