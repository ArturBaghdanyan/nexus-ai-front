"use client";

import { useTranslations } from "next-intl";

interface AnalyzeProps {
  mode: "url" | "code";
  setMode: (mode: "url" | "code") => void;
  url: string;
  setUrl: (url: string) => void;
  code: string;
  setCode: (code: string) => void;
  language: string;
  loading?: boolean;
  error?: string | null;
  handleAnalyze: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Analyze = ({
  mode,
  setMode,
  url,
  setUrl,
  code,
  setCode,
  loading,
  error,
  handleAnalyze,
}: AnalyzeProps) => {
  const t = useTranslations("Home");

  const isDisabled = loading || (mode === "url" ? !url.trim() : !code.trim());

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-100">
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
        {t("title")}
      </h1>
      <p className="text-lg text-slate-400 mb-8 max-w-xl">
        {t("description")}
      </p>

      {/* Mode toggle */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 bg-slate-800/60 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            mode === "url"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          {t("modeUrl")}
        </button>
        <button
          type="button"
          onClick={() => setMode("code")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            mode === "code"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          {t("modeCode")}
        </button>
      </div>

      <div className="w-full max-w-lg flex flex-col sm:flex-row sm:items-stretch gap-3 items-center">
        {mode === "url" ? (
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="flex-1 w-full px-4 py-3.5 rounded-xl border border-slate-700/80 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-sm shadow-inner"
          />
        ) : (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t("codePlaceholder")}
            rows={6}
            className="flex-1 w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-slate-800/50 text-slate-100 placeholder-slate-500 font-mono text-sm text-left focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-y shadow-inner"
          />
        )}
        <button
          onClick={(e) => handleAnalyze(e)}
          disabled={isDisabled}
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-blue-600/25 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none self-stretch sm:self-auto flex items-center justify-center"
        >
          {loading ? t("loading") : t("button")}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
};