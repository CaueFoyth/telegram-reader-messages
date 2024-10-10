import TelegramModel from './models/telegramModel';
import MessageController from './controllers/messageController';
import TelegramView from './views/telegramView';
import { apiId, apiHash, apiUrl, targetChatId } from './config/dotenvConfig';

const model = new TelegramModel(apiId, apiHash);
const controller = new MessageController(model.getClient(), targetChatId, apiUrl);
const view = new TelegramView(model, controller);

view.initialize().catch((error) => console.error('Erro na inicialização:', error));
