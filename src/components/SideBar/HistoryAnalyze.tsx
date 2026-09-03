import { HistoryItem } from "@/src/types/historyType";

interface Props {
  data: HistoryItem[];
  handleOpen: (id: string) => void;
}

const HistoryAnalyze = ({ data, handleOpen }: Props) => {
  return (
    <aside className="w-[25%] h-[100vh] border-r-1 transition-shadow transition duration-300 shadow-md p-4 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <h2 className="text-green-600 font-bold mb-4">History Analysis</h2>

      <ul className="list-style-type-none flex flex-col gap-3 text-start">
        {data.length !== 0 && data.map((item) => (
          <li
            key={item._id}
            className="cursor-pointer rounded-lg border p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            onClick={() => handleOpen(item._id)}
          >
            <h3 className="font-semibold truncate">
              {item.name || item.prompt}
            </h3>
            {item.summary && (
              <p className="text-xs text-zinc-500 mt-1">{item.summary}</p>
            )}

            <div className="flex justify-between items-center mt-3">
              <span className="text-green-600 font-bold text-sm">
                {item.score ?? 0}/100
              </span>

              <span className="text-xs text-zinc-400">
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
