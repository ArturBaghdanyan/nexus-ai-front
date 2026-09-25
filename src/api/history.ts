import { api } from "../lib/axios";
import { HistoryItem } from "../types/historyType";

const getVisitorId = (): string => {
  if (typeof window === "undefined") return "";

  let visitorId = localStorage.getItem("nexus_visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("nexus_visitor_id", visitorId);
  }
  return visitorId;
};

export const HistoryApi = async () => {
  try {
    const visitorId = getVisitorId();
    const response = await api.get(`/history`, {
      headers: {
        "x-visitor-id": visitorId,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateHistory = async (historyData: HistoryItem) => {
  try {
    const visitorId = getVisitorId();
    const res = await api.post(
      "/history",
      { ...historyData, owner: visitorId },
      {
        headers: {
          "x-visitor-id": visitorId,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Error creating history:", error);
    throw error;
  }
};
