import { api } from "../lib/axios";

const getVisitorId = (): string => {
  if (typeof window === "undefined") return "";
  let visitorId = localStorage.getItem("nexus_visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("nexus_visitor_id", visitorId);
  }
  return visitorId;
};

export const analyzeRepository = async (
  mode: "url" | "code",
  prompt: string,
  language: string,
) => {
  try {
    const visitorId = getVisitorId();

    const response = await api.post(
      "/generate",
      {
        mode,
        prompt,
        language,
      },
      {
        headers: {
          "x-visitor-id": visitorId,
        },
      },
    );

    console.log("API response:", response.data.data.result);
    return response.data.data.result;
  } catch (error: any) {
    console.error("Backend error response:", error.response?.data);
    throw error;
  }
};
