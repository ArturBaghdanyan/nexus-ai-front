"use client";
import { useLocaleSwitcher } from "../../hooks/useLocalSwitcher";
import { useState, useRef } from "react";
import AiIcon from "../../assets/icons/ai-icon.png";
import Image from "next/image";

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "am", label: "Հայերեն" },
];

const Header = () => {
  const { currentLocale, changeLocale, isPending } = useLocaleSwitcher();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected =
    languages.find((l) => l.code === currentLocale) || languages[0];

  return (
    <header
      className="text-transparent shadow-md"
      style={{
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Image
            src={AiIcon}
            alt="ai-icon"
            className="w-8 h-8 cover filter-[150%]"
          />
          <h1 className="text-2xl font-bold text-zinc-100">Nexus AI</h1>
        </div>

        <div ref={dropdownRef} className="relative flex items-center gap-x-5">
          <button
            onClick={() => setOpen(!open)}
            disabled={isPending}
            className="flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-white dark:border-zinc-700 dark:text-zinc-200 disabled:opacity-60 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {selected.label}
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-black border border-gray-300 dark:border-gray-600 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    changeLocale(lang.code);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors cursor-pointer flex items-center justify-between ${
                    currentLocale === lang.code
                      ? "bg-blue-600/30 text-blue-300 font-semibold"
                      : "text-slate-200 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-black">{lang.label}</span>
                  {currentLocale === lang.code && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
