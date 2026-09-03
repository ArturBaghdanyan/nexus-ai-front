import { api } from "../lib/axios";
import { HistoryItem } from "../types/historyType";

export const HistoryApi = async () => {
  try {
    const response = await api.get(`/history`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateHistory = async (historyData: HistoryItem) => {
  try {
    const res = await api.post("/history", historyData);
    return res.data;
  } catch (error) {
    console.error("Error creating history:", error);
    throw error;
  }
};
