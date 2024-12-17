import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY="AIzaSyAon7CfKs0sGnLZ72XEegL9mHvZpX9ZnaA";
const API_KEY_PRO="AIzaSyBwA5UrzDTUQRu5o8WYrHAhmHXGuLS0upc";

const genAI = new GoogleGenerativeAI(API_KEY_PRO);
export async function sendMsgToGemini(message){
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = message;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
}
