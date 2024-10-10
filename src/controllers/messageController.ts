import { TelegramClient } from 'telegram';
import { NewMessageEvent } from 'telegram/events';
import axios from 'axios';

export default class MessageController {
    private client: TelegramClient;
    private targetChatIds: number[];
    private apiUrl: string;

    constructor(client: TelegramClient, targetChatIds: number[], apiUrl: string) {
        this.client = client;
        this.targetChatIds = targetChatIds;
        this.apiUrl = apiUrl;
    }

    public async handleNewMessage(event: NewMessageEvent): Promise<void> {
        const message = event.message;

        if (message.chatId && this.targetChatIds.includes(message.chatId.toJSNumber())) {
            console.log(`Nova mensagem recebida em um dos chats: ${message.message}`);

            try {
                const response = await axios.post(this.apiUrl, {
                    chatId: message.chatId,
                    content: message.message,
                });

                console.log('Mensagem enviada para a API com sucesso. Resposta:', response.data);

            } catch (error) {
                console.error('Erro ao enviar a mensagem para a API:', error);
            }
        }
    }
}