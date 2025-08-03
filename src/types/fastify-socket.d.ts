import 'fastify';
import { Server as IOServer } from 'socket.io';

declare module 'fastify' {
  interface FastifyInstance {
    io: IOServer;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    io: IOServer;
  }
}
