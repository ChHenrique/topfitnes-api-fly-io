// src/lib/socket.ts
import { Server as IOServer } from 'socket.io';

let io: IOServer | null = null;

export function setIO(ioInstance: IOServer) {
  io = ioInstance;
}

export function getIO(): IOServer {
  if (!io) throw new Error('Socket.IO não inicializado');
  return io;
}

export function notifyAluno(alunoId: string, msg: string) {
  getIO().to(alunoId).emit('notificacao', { tipo: 'mensalidade', msg });
}
