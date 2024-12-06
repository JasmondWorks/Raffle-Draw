"use client";

import Link from "next/link";

interface PaginationProps {
  pagesCount: number;
  url: string;
  page: string;
  className?: string;
}

export default function Pagination({
  pagesCount = 5,
  url = "/user",
  page: currentPage = "1",
  className = "",
}: PaginationProps) {
  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  console.log("here", currentPage);

  if (pagesCount > 1)
    return (
      <div className={`flex gap-2 justify-end pt-3 ${className}`}>
        {pages.map((page, index) => (
          <Link
            key={page}
            href={`${url}?page=${page}`}
            className={`px-3 py-1 border border-neutral-300 rounded hover:bg-indigo-600 hover:text-white ${
              Number(currentPage) === index + 1
                ? "text-white bg-indigo-600 hover:text-white border-indigo-600 hover:bg-indigo-700"
                : ""
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
    );
}
