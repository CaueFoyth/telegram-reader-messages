import TelegramModel from '../models/telegramModel';
import MessageController from '../controllers/messageController';
import { NewMessage } from 'telegram/events';
import readline from 'readline/promises';

class TelegramView {
    private model: TelegramModel;
    private controller: MessageController;

    constructor(model: TelegramModel, controller: MessageController) {
        this.model = model;
        this.controller = controller;
    }

    public async initialize(): Promise<void> {
        const client = this.model.getClient();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const prompt = async (question: string): Promise<string> => {
            return await rl.question(question);
        };

        await client.start({
            phoneNumber: async () => await prompt('Digite seu número de telefone: '),
            password: async () => await prompt('Digite sua senha: '),
            phoneCode: async () => await prompt('Digite o código: '),
            onError: (err) => console.log(err),
        });

        this.model.saveSession();
        console.log('Você está conectado!');

        client.addEventHandler(this.controller.handleNewMessage.bind(this.controller), new NewMessage());
        console.log('Escutando novas mensagens...');
    }
}

export default TelegramView;
