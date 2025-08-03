import { prisma } from "../../config/prisma";
import { temporaryStudentSchemaDTO } from "../../schemas/temporaryStudentSchema";

export async function createTemporaryStudent(data: temporaryStudentSchemaDTO){
    const temporaryStudent = await prisma.alunosTemporarios.create({
        data: {...data, status: data.status = false}
    });

    return temporaryStudent;
}

export async function updateTemporaryStudent(status: boolean, id: string){
    const temporaryStudent = await prisma.alunosTemporarios.update({
        where: {id},
        data: { status }
    });

    return temporaryStudent;
}

export async function deleteTemporaryStudent(id: string){
    await prisma.alunosTemporarios.delete({ where: {id}});
}

export async function getTemporaryStudent(id: string){
    const temporaryStudent = await prisma.alunosTemporarios.findUnique({
        where: {id}
    });

    return temporaryStudent;
}

export async function getAllTemporaryStudents(){
    const temporaryStudents = prisma.alunosTemporarios.findMany();
    return temporaryStudents
}

export async function getAllTemporaryStudentsAccepts(){
    const temporaryStudents = prisma.alunosTemporarios.findMany({
        where: { status: true }
    });

    return temporaryStudents
}