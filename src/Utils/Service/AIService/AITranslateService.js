import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const model_name = "gemini-1.5-flash";
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
const generationConfig = {
  maxOutputTokens: 300,
  temperature: 1.8,
  topP: 0.95,
  topK: 64,
};
const systemInstruction = `Sen çok iyi bir ingilizce öğretmenisin.`;
function promptAITranslate({ mainText, trainingText, change }) {
  let prompt = "";
  if (change) {
    if (trainingText === "") {
      prompt = `Verilen bu Türkçe cümleyi (${mainText})  ingilizcede yaygın kullanımıyla ingilizceye çevir.`;
    } else {
      prompt = `Verilen bu Türkçe cümleyi (${mainText}) ve bu İngilizce çevirisini (${trainingText}) karşılaştır. 
      Hataları düzelt, daha yaygın veya doğru kullanımı varsa belirt.
      Hata yoksa sadece 'Hata yok' yaz.`;
    }
  } else {
    if (trainingText === "") {
      prompt = `Bu cümleyi (${mainText}) Türkçede en yaygın kullanımıyla çevir. 
      Tam çevrilemiyorsa, benzer anlama gelen bir cümleye çevir.`;
    } else {
      prompt = `Bu İngilizce cümle (${mainText}) ve bu Türkçe çevirisini (${trainingText}) karşılaştır. 
      Hataları düzelt, daha yaygın veya doğru kullanımı varsa belirt. Hata yoksa sadece 'Hata yok' yaz.`;
    }
  }
  return prompt;
}
async function SendAITranslate({
  mainText,
  trainingText,
  change,
  setChatHistory,
}) {
  const geminiKey = await AsyncStorage.getItem("geminiApiKey");
  if (!geminiKey) {
    Alert.alert("Error", "Enter a valid Gemini API key");
    return;
  }
  const genAI = new GoogleGenerativeAI(geminiKey);
  const model = genAI.getGenerativeModel({
    model: model_name,
    generationConfig: generationConfig,
    safetySettings: safetySettings,
    systemInstruction: systemInstruction,
  });
  try {
    const prompt = promptAITranslate({ mainText, trainingText, change });
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

async function sendAIMessage({ input, chatHistory }) {
  const geminiKey = await AsyncStorage.getItem("geminiApiKey");
  if (!geminiKey) {
    Alert.alert("Error", "Enter a valid Gemini API key");
    return;
  }
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: model_name,
    generationConfig: generationConfig,
    safetySettings: safetySettings,
    systemInstruction: systemInstruction,
  });
  try {
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

export { SendAITranslate, sendAIMessage };
