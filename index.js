import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

console.log("OpenAI API POC - Simple Chat Example\n");
console.log(`Using model: ${model}\n`);

async function main() {
    try {
        const message = await client.chat.completions.create({
            model: model,
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: "Hello! What can you tell me about yourself?",
                },
            ],
        });

        console.log("Response from OpenAI:\n");
        console.log(message.choices[0].message.content);
        console.log("\nAPI call successful!");
    } catch (error) {
        console.error("Error calling OpenAI API:");
        if (error instanceof OpenAI.APIError) {
            console.error(`Status: ${error.status}`);
            console.error(`Message: ${error.message}`);
        } else {
            console.error(error);
        }
    }
}

main();
