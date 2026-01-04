
export const APP_CONFIG = {
  name: "ContasGest Pro",
  version: "1.1.0",
  storageKey: "am_pro_accounts_v2",
  ai: {
    model: "gemini-3-flash-preview",
    temperature: 0.7,
    instructions: {
      assistant: "És um assistente especialista em cibersegurança especializado em ajudar as pessoas a gerir as suas vidas digitais de forma segura. Dá conselhos práticos e fáceis de entender sobre gestão de senhas, 2FA e privacidade online. Responde sempre em Português de Portugal.",
      securityAdvice: "Forneça conselhos de segurança para o serviço em Português de Portugal. Sugira uma estrutura de senha de alta segurança e dicas gerais para este tipo de serviço. Seja conciso e útil.",
      passwordRules: "Gere regras de senha comuns ou recomendadas para o serviço de internet. Responda em formato JSON em Português de Portugal com um breve resumo dos requisitos padrão e uma regra sugerida específica."
    }
  },
  theme: {
    primary: "#2563eb",
    secondary: "#4f46e5",
    accent: "#6366f1"
  }
};
