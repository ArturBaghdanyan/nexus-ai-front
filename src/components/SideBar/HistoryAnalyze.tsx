import { HistoryItem } from "@/src/types/historyType";

interface Props {
  data: HistoryItem[];
  handleOpen: (item: HistoryItem) => void;
}

const HistoryAnalyze = ({ data, handleOpen }: Props) => {
  return (
    <aside className="w-[25%] h-[100vh] border-r border-slate-800 bg-slate-900/90 backdrop-blur-md p-4 text-slate-100 flex flex-col">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold mb-4 tracking-wide text-sm uppercase">
        History Analysis
      </h2>

      <ul className="flex flex-col gap-3 overflow-y-auto pr-1">
        {data.length !== 0 &&
          data.map((item) => (
            <li
              key={item._id}
              className="cursor-pointer rounded-xl border border-slate-800 bg-slate-800/40 p-3.5 hover:bg-slate-800 hover:border-slate-700 transition-all shadow-sm"
              onClick={() => handleOpen(item)}
            >
              <h3 className="font-semibold text-slate-200 truncate text-sm">
                {item.name || item.prompt}
              </h3>
              {item.summary && (
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {item.summary}
                </p>
              )}

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800/60">
                <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {item.score ?? 0}/100
                </span>

                <span className="text-[11px] text-slate-500">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default HistoryAnalyze;
