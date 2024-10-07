import { Api, TelegramClient } from 'telegram';
import { PrismaClient } from '@prisma/client';
import { StringSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events';
import readline from 'readline/promises';
import dotenv from 'dotenv';
import fs from 'fs';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const apiId = parseInt(process.env.API_ID || '0');
const apiHash = process.env.API_HASH || '';
const sessionFilePath = './session.txt';

const loadSession = () => {
    if (fs.existsSync(sessionFilePath)) {
        return fs.readFileSync(sessionFilePath, 'utf-8');
    }
    return '';
};

const saveSession = (session: string) => {
    fs.writeFileSync(sessionFilePath, session);
};

const stringSession = new StringSession(loadSession());

const prisma = new PrismaClient();
const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const prompt = async (question: string): Promise<string> => {
    return await rl.question(question);
};

(async () => {
    await client.start({
        phoneNumber: async () => await prompt('Digite seu número de telefone: '),
        password: async () => await prompt('Digite sua senha: '),
        phoneCode: async () => await prompt('Digite o código: '),
        onError: (err) => console.log(err),
    });

    saveSession(stringSession.save());

    console.log('Você está conectado!');

    client.addEventHandler(async (event) => {
        const message = event.message;

        if (message.chat) {
            const chatId = message.chat.id;

            await prisma.message.create({
                data: {
                    chatId: chatId.toString(),
                    content: message.message,
                },
            });

            console.log(`Nova mensagem recebida: ${message.message}`);
        } else {
            console.log('Mensagem recebida sem chat.');
        }
    }, new NewMessage());

    console.log('Escutando novas mensagens...');
})();
