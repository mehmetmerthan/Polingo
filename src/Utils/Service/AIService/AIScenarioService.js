import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { API_KEY } from "../../../../constants";

const model_name = "gemini-1.5-flash";
const genAI = new GoogleGenerativeAI(API_KEY);
const generationConfig = {
  maxOutputTokens: 300,
  temperature: 1.8,
  topP: 0.95,
  topK: 64,
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];
const model = genAI.getGenerativeModel({
  model: model_name,
  generationConfig: generationConfig,
  safetySettings: safetySettings,
  systemInstruction: systemInstruction,
});

function systemInstruction(role) {
  const instruction = `
    You are role-playing as a ${role}. Your primary goal is to help the user improve their English through conversation in this role. 
    You must:
    - Actively engage the user by asking questions related to your role.
    - Correct the user's grammar, vocabulary, and sentence structure mistakes in a constructive and polite manner.
    - Offer alternative, more natural ways to say things when relevant..
  `;
  return instruction;
}
function promptHandler({ firstMessage, role }) {
  const prompt = `
    You are role-playing as a ${role}. Your mission is to simulate a real-life conversation and help the user practice English. 
    Focus on:
    - Engaging the user based on your role.
    - Correcting any grammar, vocabulary, or sentence structure errors in a friendly way.
    - Offering more accurate or natural phrases where possible.
    - Encouraging the user if they hesitate or make mistakes.
    Important: 
    - Offering more accurate or natural phrases where possible
    Start by asking the user this question: ${firstMessage}
  `;
  return prompt;
}

async function SendFirst({ setChatHistory, firstMessage, role }) {
  try {
    systemInstruction(role);
    const prompt = promptHandler({ firstMessage, role });
    setChatHistory((prev) => {
      const userMessage = { role: "user", parts: [{ text: prompt }] };
      return [...prev, userMessage];
    });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function sendAIMessage({ input, chatHistory, role }) {
  try {
    systemInstruction(role);
    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(input);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error(error);
    return "error occurred";
  }
}

export { sendAIMessage, SendFirst };
