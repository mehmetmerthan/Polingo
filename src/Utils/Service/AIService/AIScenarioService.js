import { HF_TOKEN } from "../../../../constants";
const apiKey = HF_TOKEN;
const modelName = "mistralai/Mixtral-8x7B-Instruct-v0.1";
const url = `https://api-inference.huggingface.co/models/${modelName}/v1/chat/completions`;

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
        Authorization: `Bearer ${apiKey}`,
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

async function sendAIMessage({ input, chatHistory, role }) {
  try {
    const body = {
      model: modelName,
      messages: chatHistory,
      max_tokens: 500,
      stream: false,
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
