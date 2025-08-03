import { FastifyInstance } from "fastify";
import { adminRoutes } from "./adminRoutes";
import { personalRoutes } from "./personalRoutes";
import { studentRoutes } from "./studentRoutes";
import { trainingRoutes } from "./trainingRoutes";
import { temporaryStudentRoutes } from "./temporaryStudentRoutes";
import { exerciseRoutes } from "./exerciseRoutes";
import { studentTrainingRoutes } from "./studentTrainingRoutes";
import { studentTrainingWeekDayRoutes } from "./studentTrainingWeekDayRoutes";
import { authRoutes } from "./authRoutes";
import { realizedTrainingRoutes } from "./realizedTrainingRoutes";

type ServerRoute = (fastify: FastifyInstance) => Promise<void>;

const routes: ServerRoute[] = [
    adminRoutes,
    personalRoutes,
    studentRoutes,
    trainingRoutes,
    temporaryStudentRoutes,
    authRoutes,
    exerciseRoutes,
    studentTrainingRoutes,
    studentTrainingWeekDayRoutes,
    realizedTrainingRoutes
]

export async function registerRoutes(fastify: FastifyInstance) {
    for (const route of routes){
        await route(fastify);
    }
}