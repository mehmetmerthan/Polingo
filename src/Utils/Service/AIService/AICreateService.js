import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { API_KEY } from "../../../../constants";

const model_name = "gemini-1.5-pro";
const genAI = new GoogleGenerativeAI(API_KEY);
const generationConfig = {
  maxOutputTokens: 2000,
  temperature: 0.5,
  topP: 0.9,
  topK: 50,
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

const systemInstruction = `Sen çok iyi bir ingilizce öğretmenisin.`;
function promptHandler({ input, trainingWords }) {
  const updatedWords = trainingWords.join(", ");
  const prompt = `Aşağıdaki listede verilen kelimeleri kullanarak İngilizce bir cümle kurdum.
Görevin: 
1. Cümleyi inceleyip doğru olup olmadığını kontrol etmek.
2. Cümlede hata varsa, hatayı düzeltmek ve doğru halini vermek.
3. Cümle doğruysa, sadece "Doğru" diye geri bildirim vermek.

Kelime Listesi: "${updatedWords}" 
Kurulan Cümle: "${input}"

Eğer cümlede bir hata tespit edersen, şu adımları izle:
- Hatanın ne olduğunu açıkla.
- Cümleyi nasıl düzelttiğini detaylandır.

Bu şekilde doğru geri bildirim verebilir misin?`;
  return prompt;
}

async function SendFirst({ input, trainingWords, setChatHistory }) {
  try {
    const prompt = promptHandler({ input, trainingWords });
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

export { sendAIMessage, SendFirst };
