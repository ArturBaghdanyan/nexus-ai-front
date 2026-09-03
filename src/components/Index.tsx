"use client";
import { useEffect, useState } from "react";
import { fetchHistory } from "../hooks/useFetch";
import HistoryAnalyze from "./SideBar/HistoryAnalyze";
import { Analyze } from "./Analyze/Analyze";
import ReviewResult from "./Result/ReviewResult";
import { HistoryItem } from "../types/historyType";
import Loading from "./Skeleton/Loading";
import { useAnalyzeRepository } from "../hooks/useAnalyzeRepository";

const Index = () => {
  const [list, setList] = useState<HistoryItem[]>([]);
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const {
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
  } = useAnalyzeRepository(setList);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory();
        setList(data);
        console.log(data, 'list dataaaaaa')
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };
    loadHistory();
  }, []);

  const handleOpen = (id: string) => {
    const selectedItem = list.find((item) => item._id === id);
    if (selectedItem && selectedItem.result) {
      setResult(selectedItem.result);
      setOpenItemId(id);
    } else {
      console.error("Item not found or result is empty");
    }
  };

  return (
    <>
      <HistoryAnalyze data={list} handleOpen={handleOpen} />
      {analyzing ? (
        <div className="flex justify-center items-center mt-6">
          <Loading />
        </div>
      ) : (
        <ReviewResult result={result} key={openItemId ?? "default"} />
      )}
      <Analyze
        url={url}
        language={language}
        setUrl={setUrl}
        handleAnalyze={handleAnalyze}
        code={code}
        setCode={setCode}
        mode={mode}
        setMode={setMode}
        loading={analyzing}
        error={error}
      />
      {error && (
        <p style={{ color: "#f87171", textAlign: "center", margin: "12px 0" }}>
          {error}
        </p>
      )}
    </>
  );
};

export default Index;
