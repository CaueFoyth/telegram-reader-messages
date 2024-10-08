import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import fs from 'fs';

const sessionFilePath = './session.txt';

class TelegramModel {
    private apiId: number;
    private apiHash: string;
    private client: TelegramClient;
    private stringSession: StringSession;

    constructor(apiId: number, apiHash: string) {
        this.apiId = apiId;
        this.apiHash = apiHash;
        this.stringSession = new StringSession(this.loadSession());
        this.client = new TelegramClient(this.stringSession, apiId, apiHash, { connectionRetries: 5 });
    }

    private loadSession(): string {
        return fs.existsSync(sessionFilePath) ? fs.readFileSync(sessionFilePath, 'utf-8') : '';
    }

    public saveSession(): void {
        fs.writeFileSync(sessionFilePath, this.stringSession.save());
    }

    public getClient(): TelegramClient {
        return this.client;
    }
}

export default TelegramModel;
