import { prisma } from "../../config/prisma";
import { AdminSchemaDTO } from "../../schemas/adminSchema";
import { Role } from "@prisma/client";
import { ServerError } from "../serverError";

export async function createAdmin(Admin: AdminSchemaDTO) {
  const usuario = await prisma.usuario.create({
    data: {
      email: Admin.email,
      telefone: Admin.telefone,
      senha: Admin.senha,
      role: Role.ADMINISTRADOR,
    },
  });

  const admin = await prisma.administrador.create({
    data: {
      usuario_id: usuario.id,
      nome: Admin.nome,
      sobrenome: Admin.sobrenome,
      foto: Admin.foto,
      email: Admin.email,
      telefone: Admin.telefone,
      senha: Admin.senha,
      role: Role.ADMINISTRADOR,
    },
  });

  return admin;
}

export async function getAdminByEmail(email: string) {
    const admin = await prisma.administrador.findUnique({
        where: { email },
    });

    return admin;
};

export async function getAdminById(id: string) {
    const admin = await prisma.administrador.findUnique({
        where: { id },
    });

    return admin;
};

export async function getAllAdmins() {
    const admins = await prisma.administrador.findMany();

    return admins;
};

export async function updateAdmin(id: string, data: Partial<AdminSchemaDTO>) {
  const { senha, ...rest } = data;

  const admin = await prisma.administrador.findUnique({
    where: { id },
    select: { usuario_id: true },
  });

  if (!admin) throw new ServerError("Administrador não encontrado", 404);

  await prisma.usuario.update({
    where: { id: admin.usuario_id },
    data: {
      email: rest.email,
      telefone: rest.telefone,
      senha: senha || undefined,
    },
  });

  const updatedAdmin = await prisma.administrador.update({
    where: { id },
    data: {
      nome: rest.nome,
      sobrenome: rest.sobrenome,
      foto: rest.foto,
      email: rest.email,
      telefone: rest.telefone,
      senha: senha || undefined,
    },
  });

  return updatedAdmin;
}


export async function deleteAdmin(id: string) {
    const deletedAdmin = await prisma.administrador.delete({
        where: { id },
    });

    return deletedAdmin;
};

export async function getAdminByPhone(phone: string) {
    const admin = await prisma.administrador.findUnique({
        where: { telefone: phone },
    });

    return admin;
}

