import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage + 1 <= 2) {
        endPage = 3;
      } else if (currentPage + 1 >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center gap-2 mt-8 ${className}`}>
      <button
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`flex items-center justify-center size-10 rounded-lg border-2 ${
          currentPage === 0
            ? "border-gray-300 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-white hover:border-pink-100 hover:text-pink-100"
        } transition-colors`}
      >
        <HiOutlineChevronLeft className="size-5" />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page - 1)}
          disabled={page === "..." || page === currentPage + 1}
          className={`flex items-center justify-center min-w-10 h-10 px-3 rounded-lg border-2 transition-colors ${
            page === currentPage + 1
              ? "bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold border-transparent"
              : page === "..."
                ? "border-transparent text-gray-300"
                : "border-gray-200 text-white hover:border-pink-100 hover:text-pink-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() =>
          currentPage < totalPages - 1 && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages - 1}
        className={`flex items-center justify-center size-10 rounded-lg border-2 ${
          currentPage === totalPages - 1
            ? "border-gray-300 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-white hover:border-pink-100 hover:text-pink-100"
        } transition-colors`}
      >
        <HiOutlineChevronRight className="size-5" />
      </button>
    </div>
  );
};

export default Pagination;
