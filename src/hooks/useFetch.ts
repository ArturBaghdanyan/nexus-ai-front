import { HistoryApi } from "../api/history";

export const fetchHistory = async () => {
  try {
    const response = await HistoryApi();

    if (response && Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response)) {
      return response;
    }
    return [];
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};
