// src/plugins/socket.ts
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import fastifyIO from 'fastify-socket.io';
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken'
import { setIO } from 'src/services/socketIOSigleton';

export default fp(async (fastify: FastifyInstance) => {
    fastify.register(fastifyIO, {
        cors: { origin: '*' }
    });

    fastify.ready().then(() => {
        setIO(fastify.io)
        fastify.io.on('connection', async (socket: Socket) => {
            try {
                const token = socket.handshake.auth.token;
                const payload = jwt.verify(token, process.env.JWT_SECRET as string);
                if (typeof payload !== 'object' || payload === null || (payload as any).role !== 'ALUNO') {
                    socket.disconnect(true);
                    return;
                }
                socket.data.user = payload;
                console.log('Aluno conectado:', socket.id);

                socket.on('join', () => {
                    const alunoId = (socket.data.user as any).id;
                    socket.join(alunoId);
                    console.log(`Aluno ${alunoId} entrou na sala`);
                    socket.emit('joined', { message: 'Você entrou na sala do aluno' });
                });

                socket.on('disconnect', () => {
                    console.log(`Aluno desconectado: ${socket.id}`);
                });

            } catch (err) {
                socket.emit('error', 'Autenticação falhou');
                socket.disconnect(true);
            }
        });
    });
});
