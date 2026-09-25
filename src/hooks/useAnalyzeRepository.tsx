import { useState } from "react";
import { fetchHistory } from "./useFetch";
import { analyzeRepository } from "../api/analyze";
import { HistoryItem } from "../types/historyType";

export const useAnalyzeRepository = (
  setList: React.Dispatch<React.SetStateAction<HistoryItem[]>>,
) => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"url" | "code">("url");
  const [language] = useState("English");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (analyzing) return;

    setAnalyzing(true);
    setError("");
    setResult("");

    try {
      const res = await analyzeRepository(
        mode,
        mode === "url" ? url : code,
        language,
      );
      setResult(res);
      const updatedData = await fetchHistory();
      if (Array.isArray(updatedData)) {
        setList(updatedData); 
      }
      setList(updatedData);
    } catch {
      setError("Something went wrong while analyzing. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return {
    url,
    setUrl,
    code,
    setCode,
    result,
    setResult,
    mode,
    setMode,
    language,
    analyzing,
    error,
    handleAnalyze,
  };
};
