import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const modelName = "mistralai/Mixtral-8x7B-Instruct-v0.1";
const url = `https://api-inference.huggingface.co/models/${modelName}/v1/chat/completions`;

function promptHandler({ firstMessage, role }) {
  const prompt = `
      You are role-playing as a ${role}. Your mission is to simulate a real-life conversation and help the user practice English. 
      Rules:
      1. Respond only as your role (${role}). Do not narrate the user's actions or the whole conversation.
      2. Wait for the user's response and reply accordingly. Do not assume or preempt what the user will say.
      3. Correct any grammar, vocabulary, or sentence structure mistakes in a friendly way, but allow the user to make their own responses.
      4. Offer more accurate or natural phrases where possible.
      5. Encourage the user if they hesitate or make mistakes.
      6. Each response should be in character, focusing on natural dialogue.
      
      Important: 
        - Only respond to the user's messages, do not generate both sides of the conversation.
        - Start by asking the user this question: ${firstMessage}. Then, listen carefully to their response and continue the conversation based on what they say.
    `;
  return prompt;
}

async function SendFirst({ setChatHistory, firstMessage, role }) {
  try {
    const hfKey = await AsyncStorage.getItem("hfToken");
    if (!hfKey) {
      Alert.alert("Error", "Please enter a valid API key");
      return;
    }
    const prompt = promptHandler({ firstMessage, role });
    setChatHistory((prev) => {
      const userMessage = { role: "user", content: prompt };
      return [...prev, userMessage];
    });
    const body = {
      model: modelName,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      stream: false,
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const responstext = await data.choices[0].message.content;
    return responstext;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function sendAIMessage({ chatHistory }) {
  try {
    const hfKey = await AsyncStorage.getItem("hfToken");
    if (!hfKey) {
      Alert.alert("Error", "Please enter a valid API key");
      return;
    }
    const body = {
      model: modelName,
      messages: chatHistory,
      max_tokens: 500,
      stream: false,
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const responstext = data.choices[0].message.content;
    return responstext;
  } catch (error) {
    console.error(error);
    return "error occurred";
  }
}

export { sendAIMessage, SendFirst };
