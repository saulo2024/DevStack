import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import "dotenv/config";

const server = fastify();
const prisma = new PrismaClient();

server.register(cors, {
  origin: "*", // Permite que qualquer site (Vercel ou localhost) acesse
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ADICIONE ISSO AQUI
});

// Rota de Teste ()
server.get("/ping", async () => {
  return { message: "pong" };
});

// Rota para Criar usuário (POST)
server.post("/users", async (request, reply) => {
  // Pegando os dados que vêm do "corpo" da requisição
  const { name, email } = request.body as {
    name: string;
    email: string;
  };

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    // Retornando status 201 (Criado com sucesso)
    return reply.status(201).send(user);
  } catch (error) {
    console.error(error);
    return reply
      .status(400)
      .send({
        error: "Erro ao criar usuário. Verifique se o e-mail já existe",
      });
  }
});

// Rota para listar todos os usuários (GET)
server.get("/users", async (request, reply) => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
});

// Rota para ATUALIAR um usuário (PUT)
server.put("/users/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const { name, email } = request.body as { name: string; email: string };

  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    return updateUser;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
});

// Rota para EXCLUIR um usuário (DELETE)
server.delete("/users/:id", async (request, reply) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.user.delete({
      where: { id },
    });
    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
});

const start = async () => {
  try {
    await server.listen({
      port: 3333,
      host: "0.0.0.0",
    });
    console.log("Server is running!");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
