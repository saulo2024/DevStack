import 'dotenv/config'; // Garante a leitura do seu .env na raiz
import { PrismaClient } from "@prisma/client";

/**
 * Na Versão 5, o PrismaClient lê a DATABASE_URL do .env automaticamente.
 * Como você moveu o .env para a raiz da pasta 'Tijolo', 
 * basta deixar o construtor vazio.
 */
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando tentativa de conexão com o MongoDB (Prisma v5)...");
  
  try {
    // Criando um usuário de teste
    // Importante: Verifique se o seu modelo no schema.prisma tem os campos 'name', 'email' e 'age'
    const user = await prisma.user.create({
      data: {
        name: 'Saulo Dev',
        email: `saulo.${Date.now()}@tijolo.com.br`,
      },
    });

    console.log('✅ CONEXÃO ESTABELECIDA!');
    console.log('✅ Usuário criado com sucesso:', user);

  } catch (error: any) {
    console.error('❌ Erro durante a execução:');
    // Mostra o erro detalhado (se for erro de IP, senha ou campo faltando no schema)
    console.error(error.message || error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
