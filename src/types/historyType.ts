export type HistoryItem = {
  _id?: string;
  mode: "url" | "code";
  prompt: string;
  language?: string;
  owner?: string;
  name?: string;
  result?: string;
  summary?: string;
  score?: number; 
  createdAt?: string; 
};
