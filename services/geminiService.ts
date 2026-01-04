
import { GoogleGenAI, Type } from "@google/genai";
import { APP_CONFIG } from "../config";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSecurityAdvice = async (serviceName: string, currentRules: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: APP_CONFIG.ai.model,
      contents: `${APP_CONFIG.ai.instructions.securityAdvice}
      Serviço: "${serviceName}". 
      Regras atuais: "${currentRules}".`,
      config: {
        temperature: APP_CONFIG.ai.temperature,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível obter conselhos de segurança de momento. Por favor, tente mais tarde.";
  }
};

export const generatePasswordRules = async (serviceName: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: APP_CONFIG.ai.model,
      contents: `${APP_CONFIG.ai.instructions.passwordRules} Serviço: "${serviceName}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rules: { type: Type.STRING, description: "Requisitos padrão de senha" },
            suggestion: { type: Type.STRING, description: "Uma regra criativa para lembrar uma senha complexa" }
          },
          required: ["rules", "suggestion"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { rules: "12+ caracteres, maiúsculas/minúsculas, números, símbolos.", suggestion: "Use uma frase que goste e substitua as vogais por símbolos." };
  }
};
