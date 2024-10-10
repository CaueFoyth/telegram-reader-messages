# Telegram Script para escutar mensagens

Este projeto é um script para o Telegram que escuta novas mensagens em chats específicos e as envia para uma API externa. A aplicação é desenvolvida em TypeScript e utiliza a biblioteca `telegram` para interagir com a API do Telegram.

## Funcionalidades

- Conexão ao Telegram usando API ID e API Hash.
- Escuta novas mensagens em chats específicos.
- Envia mensagens recebidas para uma API externa via HTTP POST.
- Armazena a sessão do usuário para reconexões automáticas.

## Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Bibliotecas:** 
  - `telegram`: Para interação com a API do Telegram.
  - `axios`: Para realizar chamadas HTTP.
  - `dotenv`: Para gerenciar variáveis de ambiente.
- **Gerenciador de Pacotes:** [Bun](https://bun.sh/)

## Pré-requisitos

Antes de começar, verifique se você possui os seguintes requisitos instalados:

- [Bun](https://bun.sh/)
- [Node.js](https://nodejs.org/) (recomendado: versão 14 ou superior)
- Um número de telefone associado a uma conta do Telegram

## Obtendo Credenciais da API do Telegram

Para obter seu API ID e API Hash, siga os passos abaixo:

1. Acesse o site do [Telegram](https://my.telegram.org).
2. Faça login com seu número de telefone.
3. Após o login, vá até a seção **API Development Tools**.
4. Clique em **Create Application**.
5. Preencha os campos necessários, como nome do aplicativo, descrição e URL (pode deixar em branco se não tiver).
6. Após criar o aplicativo, você verá seu **API ID** e **API Hash**. Anote essas informações, pois você precisará delas para configurar sua aplicação.

## Instalação

1. Clone o repositório:

   ```bash
   git clone [URL do repositório]

2. Navegue até o diretório do projeto:
    ```bash
   cd telegram-reader-messages

3. Instale as dependências usando o Bun:
    ```bash
   bun install

4. Crie um arquivo .env na raiz do projeto e adicione suas credenciais:
    ```bash
    API_ID=12345678
    API_HASH=xxxxxxxxxxxxx
    API_URL=http://localhost:3000/api/messages

5. Execute a aplicação:
    ```bash
    bun run src/index.ts

## Uso
    Após a execução da aplicação, você será solicitado a inserir seu número de telefone, senha e código de verificação do Telegram. Uma vez conectado, a aplicação começará a escutar novas mensagens nos chats especificados.

    As mensagens recebidas serão enviadas para a URL da API configurada.

## Contribuição
    Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

    - Fork o repositório
    - Crie uma nova branch (git checkout -b feature/nome-da-funcionalidade)
    - Faça suas alterações e commit (git commit -m 'Adicionando uma nova funcionalidade')
    - Faça push para a branch (git push origin feature/nome-da-funcionalidade)
    - Abra uma pull request

## Contato
    Cauê Marchi Foyth - foythcaue@gmail.com