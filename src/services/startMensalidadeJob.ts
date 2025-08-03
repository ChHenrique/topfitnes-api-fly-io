import { FastifyInstance } from "fastify";
import cron from 'node-cron'
import { notifyMonthlyFee } from "./database/IStudentRepository";
import { notifyAluno } from "./socketIOSigleton";

export function startMensalidadeJob(fastify: FastifyInstance) {
    cron.schedule('0 9 * * *', async () => {
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);

        const students = await notifyMonthlyFee(today, threeDaysAgo);
        
        for (const student of students){
            const todays = Math.ceil((+student.data_validade_plano - +today) / (1000 * 60 * 60 * 24))
            const msg = todays === 0 ? 'Sua mensalidade vence hoje!' : `Sua mensalidade vence em ${todays} dias`

            notifyAluno(student.id, msg)
        }
    })
}