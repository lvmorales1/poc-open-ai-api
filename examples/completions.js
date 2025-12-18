import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

console.log("OpenAI API POC - Text Completions Example\n");

async function getCompletion() {
    try {
        const response = await client.chat.completions.create({
            model: model,
            max_tokens: 256,
            messages: [
                {
                    role: "user",
                    content:
                        "Complete this: The fastest way to learn programming is to",
                },
            ],
        });

        const completion = response.choices[0].message.content;

        console.log("Prompt: The fastest way to learn programming is to");
        console.log("Completion:", completion);
        console.log("\nCompletion retrieved successfully!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

getCompletion();
