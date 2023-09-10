# Open AI Messenger Bot

This project connects OpenAI's GPT API with popular messenger applications, specifically Telegram and Line, to enable dynamic chatbot functionalities.

## Overview
Upon receiving a message in Telegram or Line, our bot forwards the message to a backend system. This system then consults the GPT-3.5 model to generate an appropriate response, which is subsequently relayed back to the user via the messaging app. The bot has the capability to send automated responses based on certain conditions or use the GPT chat completion feature.

All chat histories, including messages received and generated, are stored in Google Cloud's Firebase Database to maintain conversation context and enhance user experience. The database also captures and updates user-specific events and information.

## Features
- **Dynamic Chatbot**: Utilizes GPT-3.5 chat completion for generating user-specific responses.
- **Contextual Awareness**: Stores chat histories in Firebase Database to keep track of conversation context.
- **User Profiles**: Maintains a record of user information and their interactions, updating them based on new events.
- **Automated & GPT Responses**: Differentiates between conditions when an automatic response is required and when GPT chat completion is triggered.

## How it Works
### 1. Bot Account Creation
- Telegram: Created using BotFather.
- Line: Set up through Line developer tools.
### 2. Message Forwarding
Messages received by these bots are sent to the backend system using webhooks.
### 3. Response Generation
The backend system communicates with the GPT-3.5 model to get a response. This can be:
- An automatic reply based on predefined conditions.
- A reply generated through GPT chat completion.
### 4. Sending Response
The generated reply is sent back to the user via the respective messaging app.
### 5. Data Storage
All chats, as well as user-specific events and data, are stored and updated in the Firebase Database.

## Future Enhancements
- Improve the differentiation logic between automated and GPT-based responses.
- Experiment with various contexts to refine GPT model behavior.

## 📚 Version 1.0

**Description:**

- ChatGPT with Telegram

**Used / Dependencies:**

- `JavaScript`
- `Node.js`
- `Google Firebase`
- `Telegram Messaging API & Telegram Bot`
- `ngrok`

## 💬 Version 1.1 (Currently Not Available)

**Description:**

- ~~Line support~~

**Used:**

- ~~`Line Messaging API`~~

