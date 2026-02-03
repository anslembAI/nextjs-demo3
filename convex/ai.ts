
"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getClothingRecommendations = action({
    args: {
        destination: v.string(),
        description: v.optional(v.string()),
        currentMonth: v.string(),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) {
            throw new Error("Google Generative AI API Key is not set in environment variables.");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
      You are a helpful travel assistant. A user is planning a trip to ${args.destination} in ${args.currentMonth}.
      ${args.description ? `Here is a description of the place: ${args.description}` : ""}
      
      Please provide a concise list of clothing recommendations suitable for the weather and culture of this destination during this time of year. 
      Focus on practical advice (e.g., layers, rain gear, specific cultural dress codes).
      Keep it to 3-5 bullet points.
    `;

        try {
            console.log(`Generating recommendations for ${args.destination} with key length: ${apiKey.length}`);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return text;
        } catch (error: any) {
            console.error("Error generating content with Gemini:", error);
            if (error.message) console.error("Error message:", error.message);
            if (error.stack) console.error("Error stack:", error.stack);
            throw new Error(`Failed to generate clothing recommendations: ${error.message || "Unknown error"}`);
        }
    },
});
