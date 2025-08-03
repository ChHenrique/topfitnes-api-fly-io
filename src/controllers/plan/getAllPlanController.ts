import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { getAllPlan } from "src/services/database/IPlanRepository";

export async function getAllPlanController(fastify: fastifyContextDTO){
    const plan = getAllPlan();
    fastify.res.send(plan);
}