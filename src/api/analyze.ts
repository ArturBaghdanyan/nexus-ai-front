import { api } from "../lib/axios";

export const analyzeRepository = async (
  mode: "url" | "code",
  prompt: string,
  language: string,
) => {
  try {
    const response = await api.post("/generate", {
      mode,
      prompt,
      language,
    });
    console.log("API response:", response.data.data.result);
    return response.data.data.result;
  } catch (error: any) {
    console.error("Backend error response:", error.response?.data);
    throw error;
  }
};
