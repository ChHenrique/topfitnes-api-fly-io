import { prisma } from "../../config/prisma";

export async function getPlan(id: string){
    const plan = await prisma.plano.findUnique({
        where: {id}
    });

    return plan;
};

export async function getAllPlan(){
    const plan = await prisma.plano.findMany();
    return plan;
}