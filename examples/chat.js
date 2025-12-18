import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

console.log("OpenAI API POC - Chat Example\n");

async function chatWithAI() {
    const conversationHistory = [];

    const initialMessage =
        "I want you to act as a JavaScript expert. Keep responses concise.";

    conversationHistory.push({
        role: "user",
        content: initialMessage,
    });

    console.log("User:", initialMessage);

    try {
        let response = await client.chat.completions.create({
            model: model,
            max_tokens: 1024,
            messages: conversationHistory,
        });

        let assistantMessage = response.choices[0].message.content;
        conversationHistory.push({
            role: "assistant",
            content: assistantMessage,
        });

        console.log("Assistant:", assistantMessage);
        console.log("\n---\n");

        const userMessage = "What are the main differences between var, let, and const?";
        conversationHistory.push({
            role: "user",
            content: userMessage,
        });

        console.log("User:", userMessage);

        response = await client.chat.completions.create({
            model: model,
            max_tokens: 1024,
            messages: conversationHistory,
        });

        assistantMessage = response.choices[0].message.content;
        conversationHistory.push({
            role: "assistant",
            content: assistantMessage,
        });

        console.log("Assistant:", assistantMessage);
        console.log("\nMulti-turn conversation completed!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

chatWithAI();
