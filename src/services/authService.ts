import { userLoginSchema, UserLoginSchemaDTO } from "src/schemas/userSchema";
import { getUserByEmail, getUserByPhone } from "src/services/database/IUserRepository";
import { ServerError } from "src/services/serverError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { payloadJWT } from "src/utils/payloadJWT";
import { FastifyReply, FastifyRequest } from "fastify";

export const validateLoginInput = (data: unknown): UserLoginSchemaDTO => {
  const result = userLoginSchema.safeParse(data);
  if (!result.success) {
    throw new ServerError("Dados de login inválidos", 400);
  }
  return result.data;
};

export const findUserByCredentials = async (credentials: UserLoginSchemaDTO) => {
  const { email, telefone } = credentials;

  const user = email? await getUserByEmail(email)
    : telefone
      ? await getUserByPhone(telefone)
      : null;

  if (!user) throw new ServerError("Credenciais inválidas", 401);

  return user;
};

export const verifyUserPassword = async (user: any, password: string) => {
  const isPasswordValid = await bcrypt.compare(password, user.senha);
  if (!isPasswordValid) throw new ServerError("Credenciais inválidas", 401);
};

export const generateAuthToken = (user: any, rememberMe: boolean) => {
  if (!process.env.JWT_SECRET) throw new ServerError("Configuração de segurança inválida", 500);

  const payload = payloadJWT(user, user.role);
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? "60d" : "1h",
  });
};

export const setAuthCookie = (res: FastifyReply, token: string, rememberMe: boolean) => {
  res.setCookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: rememberMe ? 60 * 60 * 24 * 60 : 60 * 60,
    signed: true
  });
};

export const deleteAuthCookie = (req: FastifyRequest, res: FastifyReply) => {
  try {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      signed: true
    });
  } catch (error) {
    return res.status(500).send({ message: "Erro durante o processo de logout" });
  }
}