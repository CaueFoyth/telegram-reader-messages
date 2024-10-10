import dotenv from 'dotenv';

dotenv.config();

export const apiId = parseInt(process.env.API_ID || '0');
export const apiHash = process.env.API_HASH || '';
export const apiUrl = process.env.API_URL || '';
export const targetChatId = [];