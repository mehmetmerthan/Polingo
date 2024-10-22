import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const modelName = "mistralai/Mixtral-8x7B-Instruct-v0.1";
const url = `https://api-inference.huggingface.co/models/${modelName}/v1/chat/completions`;

function promptHandler({ input, trainingWords }) {
  const wordsArray = trainingWords.map((wordObj) => wordObj.word);
  const updatedWords = wordsArray.join(", ");
  const prompt = `You are an advanced English teacher. Your task is to evaluate the sentence created using the given words and provide detailed feedback. Follow these steps:

1. Review the sentence to check if it is grammatically correct and makes sense.
2. If there are any errors, identify and explain them clearly.
3. Correct the sentence and provide the correct version.
4. If the sentence is correct, simply respond with "Correct".

Additionally, if there are any advanced grammar points or vocabulary that the user might not be familiar with, provide a brief explanation to help them learn.

Word List: "${updatedWords}"
Constructed Sentence: "${input}"

If you find any errors in the sentence, follow these steps:
- Explain what the error is.
- Detail how you corrected the sentence.
- Provide any relevant grammar or vocabulary tips to enhance the user's understanding.
`;
  return prompt;
}

async function SendFirst({ input, trainingWords, setChatHistory }) {
  try {
    const hfKey = await AsyncStorage.getItem("hfToken");
    if (!hfKey) {
      Alert.alert("Error", "Please enter a valid API key");
      return;
    }
    const prompt = promptHandler({ input, trainingWords });
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
