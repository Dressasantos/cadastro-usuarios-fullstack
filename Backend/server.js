import express, { request, response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'

const prisma = new PrismaClient();

const app = express();
app.use(cors())
app.use(express.json());

app.post("/users", async (request, response) => {
  await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });

  response.status(201).json(request.body);
});

app.get("/users", async (request, response) => {
  let users = [];

  if (request.query) {
    users = await prisma.user.findMany({
      where: {
        name: request.query.name,
        email: request.query.email,
        age: request.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  response.status(200).json(users);
});

app.put("/users/:id", async (request, response) => {
  console.log(request);

  await prisma.user.update({
    where: {
      id: request.params.id,
    },

    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });

  response.status(201).json(request.body);
});

app.delete("/users/:id", async (request, response) => {
  await prisma.user.delete({
    where: {
      id: request.params.id,
    },
  });

  response.status(200).json({ message: "Usuário deletado com Suceso!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
