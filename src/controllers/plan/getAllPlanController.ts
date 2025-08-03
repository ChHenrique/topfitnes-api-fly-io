import { fastifyContextDTO } from "../../interfaces/fastifyContextDTO";
import { getAllPlan } from "../../services/database/IPlanRepository";

export async function getAllPlanController(fastify: fastifyContextDTO){
    const plan = getAllPlan();
    fastify.res.send(plan);
}