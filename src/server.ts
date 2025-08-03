import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import { registerRoutes } from "./routes/registerRoutes";
import socketPlugin from "./config/socket.io"
import { staticFilesPlugin } from "./services/static";

const server = fastify();

// registrando plugins
server.register(cors, {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
})

server.register(socketPlugin,)
server.register(fastifyMultipart, {
    limits: {
        fileSize: 3000000, // 3 MB
    },
    attachFieldsToBody: true,
})

server.register(registerRoutes)

server.register(staticFilesPlugin)
server.register(fastifyCookie)

server.get("/", () => {
    return { message: "Bem vindo a API da Academia Top Fitness!" };
})

server.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
});