import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const geminiService = {
  sendMessage: async (message) => {
    try {
      const result = await model.generateContent(message);
      const response = result.response.text();
      return response;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Gemini request failed");
    }
  }
};

export default geminiService;
