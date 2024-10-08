import TelegramModel from './models/telegramModel';
import MessageController from './controllers/messageController';
import TelegramView from './views/telegramView';
import { apiId, apiHash, apiUrl, targetChatId, groupChatId } from './config/dotenvConfig';

const model = new TelegramModel(apiId, apiHash);
const controller = new MessageController(model.getClient(), targetChatId, apiUrl, groupChatId);
const view = new TelegramView(model, controller);

view.initialize().catch((error) => console.error('Erro na inicialização:', error));
