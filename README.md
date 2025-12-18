# OpenAI API POC - JavaScript

A proof-of-concept project for testing the OpenAI API using Node.js and JavaScript.

## Setup

### Prerequisites

- Node.js 18+
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=sk-...
   OPENAI_MODEL=gpt-4o-mini
   ```

## Usage

### Run the basic example:
```bash
npm start
```

### Run specific examples:

**Chat Example** - Multi-turn conversation:
```bash
npm run chat
```

**Completions Example** - Text completion:
```bash
npm run completions
```

**Embeddings Example** - Generate text embeddings:
```bash
npm run embeddings
```

**Chat with Document** - Ask questions grounded in a vector store you already have:
```bash
npm run chat-doc
```

### Watch mode (auto-reload on changes):
```bash
npm run dev
```

## Project Structure

```
.
├── index.js              # Main entry point - simple chat example
├── examples/
│   ├── chat.js          # Multi-turn conversation example
│   ├── completions.js   # Text completion example
│   ├── embeddings.js    # Text embedding example
│   └── chat-doc.js      # Chat grounded in a local document
├── package.json
├── .env.example
└── .gitignore
```

## Examples Overview

### 1. **Simple Chat** (index.js)
Basic single-message conversation with Claude/GPT model.

### 2. **Multi-turn Chat** (examples/chat.js)
Demonstrates conversation history and context maintenance across multiple turns.

### 3. **Text Completions** (examples/completions.js)
Shows how to generate text completions for prompts.

### 4. **Embeddings** (examples/embeddings.js)
Generate vector embeddings for text (useful for semantic search, similarity, etc.).

### 5. **Chat with Document** (examples/chat-doc.js)
Interactive terminal chat that uses the Assistants API with `file_search`. It requires `OPENAI_VECTOR_STORE_ID` to point to an existing vector store that already contains your files.

## API Features Being Tested

- Authentication with API key
- Single-turn messages
- Multi-turn conversations
- Text completions
- Embeddings generation
- Error handling
- Environment configuration
