import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

console.log("OpenAI API POC - Embeddings Example\n");

async function getEmbeddings() {
    try {
        const texts = [
            "The quick brown fox jumps over the lazy dog",
            "A fast orange fox leaps across a sleepy dog",
            "The sun is shining in the sky",
        ];

        console.log("Computing embeddings for texts:\n");
        texts.forEach((text, i) => console.log(`${i + 1}. "${text}"`));
        console.log("\n");

        const response = await client.embeddings.create({
            model: "text-embedding-3-small",
            input: texts,
        });

        response.data.forEach((embedding, index) => {
            console.log(`Text ${index + 1} embedding vector (first 5 values):`);
            console.log(embedding.embedding.slice(0, 5));
            console.log(`Total dimensions: ${embedding.embedding.length}\n`);
        });

        console.log("Embeddings retrieved successfully!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

getEmbeddings();
