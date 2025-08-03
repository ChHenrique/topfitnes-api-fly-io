import { prisma } from "src/config/prisma";
import { userSchemaDTO } from "src/schemas/userSchema";

export async function createUsers(data: userSchemaDTO){
    const user = prisma.usuario.create({
        data: {...data,}
    });

    return user;
}

export async function updateUser(id: string, data: Partial<userSchemaDTO>){
    const user = prisma.usuario.update({
        where: {id},
        data: {...data}
    })

    return user;
}

export async function getAllUsers() {
    return await prisma.usuario.findMany({
        include: { administrador: true, aluno: true, personal: true },
    });
}

export async function getUserById(id: string) {
  return await prisma.usuario.findUnique({
    where: { id },
    include: {
      administrador: true,
      personal: true,
      aluno: {
        include: {
          treinos_aluno: {
            include: {
              treino: {
                include: {
                    exercicios: true
                }
              },
              dias_semana: true,
            },
          },
        },
      },
    },
  });
}


export async function getUserByEmail(email: string) {
    return await prisma.usuario.findUnique({
        where: { email },
        include: { administrador: true, aluno: true, personal: true },
    });
}

export async function getUserByPhone(phone: string) {
    return await prisma.usuario.findUnique({
        where: { telefone: phone },
        include: { administrador: true, aluno: true, personal: true },
    });
}

export async  function deleteUser(id: string) {
    return await prisma.usuario.delete({
        where: { id }
    });
}
