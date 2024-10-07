from telethon import TelegramClient, events

# Substitua com as suas credenciais
api_id = '26172448'
api_hash = 'c255c3f60f0f7bfdb8fc82afebe4e86b'
phone_number = '+5547997566605'

# Inicializa o cliente
client = TelegramClient('session_name', api_id, api_hash)

# Função principal
async def main():
    # Conecta ao Telegram
    await client.start(phone_number)
    
    # Escolhe o chat que deseja monitorar
    chat_id = -1001502228530  # ID do chat ou username

    # Define o evento de escuta para novas mensagens no chat específico
    @client.on(events.NewMessage(chats=chat_id))
    async def handler(event):
        message = event.message.message  # Conteúdo da mensagem
        print(f'Nova mensagem recebida: {message}')

    # Mantém o cliente ativo para escutar novos eventos
    print("Escutando novas mensagens...")
    await client.run_until_disconnected()

# Executa o cliente
with client:
    client.loop.run_until_complete(main())
