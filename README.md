# Whatsapp Flow Engine

Engine simples para criação de automações de atendimento utilizando a biblioteca **whatsapp-web.js**.

Este projeto tem como finalidade fornecer uma base simples para a personalização de diversos tipos de atendimento, por meio de menus e perguntas sequenciais, permitindo que qualquer pessoa o personalize de forma fácil por meio do arquivo "fluxos.js".

# Funcionalidades 
**Sistema de **menus e opções**
 **Perguntas sequenciais**
 **Redirecionamento de fluxos**
**Controle de estados do usuário**
**Base genérica para diferentes tipos de automação**

# Tecnologias utilizadas

 - Node.js
 - whatsapp-web.js
 - puppeteer
 - qrcode-terminal

 # Requisitos

Antes de executar o projeto, certifique-se de ter instalado:

 - Node.js 18+
 - NPM
 - Google Chrome ou Chromium

 # Instalação

Clone o repositório:

```bash
git clone https://github.com/danielhk-dev/whatsapp-flow-engine.git
```
Entre na pasta do projeto:

```bash
cd whatsapp-flow-engine
```
Instale as depêndencias:

```bash
npm install
```

# Como rodar:

Inicie o bot com:

```bash
npm start
```

Quando iniciar, um qr code aparecerá no terminal, para prosseguir, basta escanar pelo WhatsApp

# Manutenção Básica

Atualizar dependências

Para atualizar as bibliotecas do projeto:

```bash
npm update
```
# Problemas comuns
Erro: Execution destroyed

Esse erro pode ocorrer ocasionalmente por problemas na sessão do WhatsApp ou no Puppeteer.

Para resolver:

Pare o bot

Apague a pasta de autenticação local

Execute o bot novamente

# Observação

Essa estrutura é apenas uma base, para personalizar, você deve modificar o arquivo fluxos.js, principalmente o campo "acao; acao('mensagem')" 

 
