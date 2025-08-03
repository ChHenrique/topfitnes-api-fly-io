import { Prisma, Role } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { studentSchemaDTO } from "../../schemas/studentSchema";
import { getStartAndEndOfCurrentMonth } from "../../utils/getStartAndEndOfCurrentMonth";
import { ServerError } from "../serverError";
import { validateRelationships } from "../../utils/validateRelationships";
import { includes } from "zod";

export async function createStudent(data: studentSchemaDTO, dateValidity: Date) {
    const { planoId, personalId, ...rest } = data;

    await validateRelationships(planoId, personalId);

    const usuario = await prisma.usuario.create({
        data: {
            email: data.email,
            telefone: data.telefone,
            senha: data.senha,
            role: Role.ALUNO,
        },
    });

    return await prisma.aluno.create({
        data: {
            usuario: { connect: { id: usuario.id } },
            email: data.email,
            telefone: data.telefone,
            role: Role.ALUNO,
            ...rest,
            plano: { connect: { id: planoId } },
            ...(personalId && { personal: { connect: { id: personalId } } }),
            data_validade_plano: dateValidity,
        },
    });
}

export async function updateStudent(id: string, data: Partial<studentSchemaDTO>) {
    const student = await prisma.aluno.findUnique({
        where: { id },
        include: { usuario: true }
    });

    if (!student || !student.usuario) throw new ServerError("Aluno não encontrado", 404);

    const { planoId, personalId, ...updateData } = data;
    const alunoUpdateData: Prisma.AlunoUpdateInput = {
        ...(data.email && { email: data.email }),
        ...(data.telefone && { telefone: data.telefone }),
        ...(data.senha && { senha: data.senha }),
        ...updateData
    };

    if (planoId) alunoUpdateData.plano = { connect: { id: planoId } };
    if (personalId) alunoUpdateData.personal = { connect: { id: personalId } };

    return await prisma.$transaction(async (prisma) => {
        await prisma.usuario.update({
            where: { id: student.usuario.id },
            data: {
                ...(data.email && { email: data.email }),
                ...(data.telefone && { telefone: data.telefone }),
                ...(data.senha && { senha: data.senha }),
            }
        });

        return await prisma.aluno.update({
            where: { id },
            data: alunoUpdateData
        });
    });
}


export async function getStudentById(id: string) {
    const student = await prisma.aluno.findUnique({
        where: { id },
        include: {
            treinos_aluno: true
        }
    });

    return student;
};

export async function deleteStudent(userId: string, id: string) {
    const student = await prisma.aluno.delete({
        where: { id },
    });

    await prisma.usuario.delete({
      where: { id: userId }
    })
    return student;
};

export async function getAllStudents() {
    const students = await prisma.aluno.findMany({
        include: {
            treinos_aluno: {
                include: {
                    treino: {
                        include: {
                            exercicios: true
                        }
                    }
                }
            },
            personal: true
        }
    }
    );

    return students;
};

export async function getStudentByEmail(email: string) {
    const student = await prisma.aluno.findUnique({
        where: { email },
    });

    return student;
};

export async function getStudentByPhone(telefone: string) {
    const student = await prisma.aluno.findUnique({
        where: { telefone },
    });

    return student;
};


export async function overdueStudentsByPersonal(idPersonal: string) {
    const students = await prisma.aluno.findMany({
        where: {
            personal_id: idPersonal,
            data_validade_plano: {
                lt: new Date()
            }
        },
        include: {
            plano: true
        }
    })

    return students
}

export async function overdueStudents() {
    const students = await prisma.aluno.findMany({
        where: {
            data_validade_plano: {
                lt: new Date()
            }
        },
        include: {
            plano: true
        }
    });

    return students;
};

export async function newStudentsOfTheMonth(personal_id: string) {
    const { start, end } = getStartAndEndOfCurrentMonth();

    const newStudents = await prisma.aluno.findMany({
        where: {
            personal_id,
            criado_em: {
                gte: start,
                lte: end
            }
        }, include: {
            plano: true
        }
    })

    return newStudents;
}

export async function updateValidity(id: string, date: Date) {
    const student = await prisma.aluno.update({
        where: { id },
        data: {
            data_validade_plano: date
        }
    });

    return student;
}

export async function notifyMonthlyFee(today: Date, threeDaysAgo: Date) {
    const students = await prisma.aluno.findMany({
        where: {
            data_validade_plano: {
                gte: threeDaysAgo,
                lte: today
            }
        }
    })

    return students;
}