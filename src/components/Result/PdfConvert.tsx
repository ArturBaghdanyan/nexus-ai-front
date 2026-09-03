import { FaFilePdf } from "react-icons/fa";

const PdfConvert = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200"
      title="Download as PDF"
    >
      <FaFilePdf />
    </div>
  );
};

export default PdfConvert;
