import 'dotenv/config' // Isso força a leitura do .env na raiz
import { PrismaClient } from '@prisma/client'

// O Prisma agora vai "enxergar" a DATABASE_URL que está no seu .env
const prisma = new PrismaClient()

async function main() {
  console.log("Conectando ao MongoDB...")
  const user = await prisma.user.create({
    data: {
      name: "Saulo",
      email: `teste-${Date.now()}@email.com`
    }
  })
  console.log("Sucesso! Usuário criado:", user)
}

main()
  .catch((e) => console.error("Erro de conexão:", e.message))
  .finally(async () => await prisma.$disconnect())
