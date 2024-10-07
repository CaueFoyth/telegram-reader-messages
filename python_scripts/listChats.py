from telethon import TelegramClient

# Substitua com as suas credenciais
api_id = '26172448'
api_hash = 'c255c3f60f0f7bfdb8fc82afebe4e86b'
phone_number = '+5547997566605'

# Inicializa o cliente
client = TelegramClient('session_name', api_id, api_hash)

async def main():
    # Conecta ao Telegram
    await client.start(phone_number)

    print("Listando todos os chats disponíveis:")
    async for dialog in client.iter_dialogs():
        print(f"Nome: {dialog.name}, ID: {dialog.id}")

with client:
    client.loop.run_until_complete(main())
