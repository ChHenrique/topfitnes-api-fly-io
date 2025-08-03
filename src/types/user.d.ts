export interface userDTO {
    role: "ALUNO" | "PERSONAL" | "ADMINISTRADOR";
    id: string;
    email: string;
    telefone: string;
    rememberMe: boolean = false;
}

declare module "fastify" {
    interface FastifyRequest {
        user?: userDTO;
    }
}