import "./style.css";

const Loading = () => {
  return (
    <div className="w-full max-w-2xl mt-8 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-auto p-4">
      <div className="flex flex-col gap-16">
        <div className="card__description loading"></div>
        <div className="card__description loading"></div>
        <div className="card__description loading"></div>
      </div>
    </div>
  );
};

export default Loading;
