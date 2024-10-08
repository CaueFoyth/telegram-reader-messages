import { TelegramClient } from 'telegram';
import { NewMessageEvent } from 'telegram/events';
import axios from 'axios';

class MessageController {
    private client: TelegramClient;
    private targetChatIds: number[];
    private apiUrl: string;
    private groupChatId: number;

    constructor(client: TelegramClient, targetChatIds: number[], apiUrl: string, groupChatId: number) {
        this.client = client;
        this.targetChatIds = targetChatIds;
        this.apiUrl = apiUrl;
        this.groupChatId = groupChatId;
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

                console.log('Mensagem enviada para a API com sucesso.');

                const { analyzedMessage, tradeResult } = response.data;

                const targets = Array.isArray(analyzedMessage.targetPrices) && analyzedMessage.targetPrices.length > 0
                    ? analyzedMessage.targetPrices.map((price: number) => `➡️ ${price.toFixed(2)}`).join('\n\t\t\t\t')
                    : 'Nenhum alvo definido';

                const emoji = analyzedMessage.operationType.toUpperCase() === 'LONG' ? '🟢' : '⭕';

                const replyMessage = this.composeReplyMessage(analyzedMessage, targets, emoji);

                await this.sendReplyMessage(this.groupChatId, replyMessage);

                console.log('Resultado da operação:', tradeResult);

            } catch (error) {
                console.error('Erro ao enviar a mensagem para a API:', error);
            }
        }
    }

    private composeReplyMessage(analyzedMessage: any, targets: string, emoji: string): string {
        return `
- ${emoji} ${analyzedMessage.operationType}

- ${analyzedMessage.currencyPair}
- ${analyzedMessage.leverage}

- 🔰 Preço de entrada: ${analyzedMessage.entryPrice}

- 🎯 Alvo(s):

    ${targets}

- 🩸 Stop: ${analyzedMessage.stopLoss}
        `.trim();
    }

    private async sendReplyMessage(groupChatId: number, message: string): Promise<void> {
        await this.client.sendMessage(groupChatId, {
            message,
        });
        console.log('Resposta enviada para o grupo com sucesso.');
    }
}

export default MessageController;
