import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

async function ensureVectorStore() {
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    if (!vectorStoreId) {
        throw new Error("Set OPENAI_VECTOR_STORE_ID to an existing vector store ID.");
    }
    console.log(`Using vector store: ${vectorStoreId}`);
    return vectorStoreId;
}

async function createAssistant(vectorStoreId) {
    const assistant = await client.beta.assistants.create({
        name: "CLI KB Chat",
        model,
        instructions: "Use the provided documents to answer. If unsure, say you do not know.",
        tools: [{ type: "file_search" }],
        tool_resources: {
            file_search: {
                vector_store_ids: [vectorStoreId],
            },
        },
    });
    console.log(`Assistant created: ${assistant.id}`);
    return assistant.id;
}

async function pollRun(threadId, runId) {
    while (true) {
        const run = await client.beta.threads.runs.retrieve(threadId, runId);
        if (run.status === "completed") return run;
        if (run.status === "failed") {
            throw new Error(`Run failed: ${run.last_error?.message || "unknown error"}`);
        }
        await new Promise((resolve) => setTimeout(resolve, 1200));
    }
}

async function fetchLastAssistantMessage(threadId) {
    const messages = await client.beta.threads.messages.list(threadId, {
        limit: 10,
        order: "desc",
    });

    for (const message of messages.data) {
        if (message.role === "assistant") {
            const textBlock = message.content.find((item) => item.type === "text");
            return textBlock?.text?.value || "(no text in response)";
        }
    }
    return "(assistant returned no message)";
}

async function chatLoop() {
    const vectorStoreId = await ensureVectorStore();
    const assistantId = await createAssistant(vectorStoreId);
    const thread = await client.beta.threads.create();

    console.log("\nChat ready. Type your question (or 'exit' to quit).\n");

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const ask = () => {
        rl.question("You> ", async (input) => {
            const question = input.trim();
            if (!question || question.toLowerCase() === "exit") {
                rl.close();
                return;
            }

            try {
                await client.beta.threads.messages.create(thread.id, {
                    role: "user",
                    content: question,
                });

                const run = await client.beta.threads.runs.create(thread.id, {
                    assistant_id: assistantId,
                });

                await pollRun(thread.id, run.id);
                const answer = await fetchLastAssistantMessage(thread.id);
                console.log(`Assistant> ${answer}\n`);
            } catch (error) {
                console.error(`Error: ${error.message}`);
            }

            ask();
        });
    };

    ask();
}

chatLoop().catch((err) => {
    console.error(`Startup error: ${err.message}`);
    process.exit(1);
});
