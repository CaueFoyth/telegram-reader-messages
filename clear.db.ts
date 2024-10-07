// Importar PrismaClient
import { PrismaClient } from '@prisma/client';

// Criar uma instância do PrismaClient
const prisma = new PrismaClient();

(async () => {
    try {
        // Remover todos os registros da tabela 'message'
        await prisma.message.deleteMany({});
        console.log('Todos os registros da tabela "message" foram removidos.');

        // Você pode adicionar mais operações de exclusão se precisar
        // await prisma.outraTabela.deleteMany({}); // Exemplo para outra tabela
    } catch (error) {
        console.error('Erro ao limpar os dados:', error);
    } finally {
        await prisma.$disconnect(); // Desconectar o Prisma
    }
})();
