import { Role } from "@prisma/client";
import { prisma } from "src/config/prisma";
import { PersonalSchemaDTO } from "src/schemas/personalSchema";
import { ServerError } from "../serverError";

export async function createPersonal(data: PersonalSchemaDTO){
      const usuario = await prisma.usuario.create({
        data: {
          email: data.email,
          telefone: data.telefone,
          senha: data.senha,
          role: Role.PERSONAL,
        },
      });
    
    const personal = await prisma.personal.create({
        data: { usuario_id: usuario.id, ...data},
    });

    return personal;
};

export async function getPersonalByEmail(email: string) {
    const personal = await prisma.personal.findUnique({
        where: { email },
        include: {
            alunos: true,
            treinos_criados: true
        }
    });

    return personal;
};

export async function getPersonalById(id: string) {
    const personal = await prisma.personal.findUnique({
        where: { id },
        include: {
            alunos: true
        }
    });

    return personal;
};

export async function getAllPersonals() {
    const personals = await prisma.personal.findMany({
        include: {
            alunos: true
        }
    });

    return personals;
};

export async function updatePersonal(id: string, data: Partial<PersonalSchemaDTO>) {
    const {senha, ...rest} = data;

    const personal = await prisma.personal.findUnique({
        where: { id },
        select: { usuario_id: true },
    });

    if (!personal) throw new ServerError("Personal não encontrado", 404);

    await prisma.usuario.update({
        where: { id: personal.usuario_id },
        data: {
            email: rest.email,
            telefone: rest.telefone,
            senha: senha ? senha : undefined,
        } })

    const updatedPersonal = await prisma.personal.update({
        where: { id },
        data: rest
    });

    return updatedPersonal;
};

export async function deletePersonal(id: string) {
        const deletedPersonal = await prisma.personal.delete({
        where: { id },
    });

    return deletedPersonal;
};

export async function getPersonalByPhone(phone: string) {
    const personal = await prisma.personal.findUnique({
        where: { telefone: phone },
    });

    return personal;
}