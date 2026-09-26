"use client";

import { Pagination } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaginationComponent({ totalPages, currentPage, genre, type }: { totalPages: number } & { currentPage: number } & { genre?: string } & { type: number }) {
  const [page, setPage] = useState(currentPage ? currentPage : 1);
  const router = useRouter();

  const buildHref = (page: number, genre: number) => {
    setPage(page);
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("genre", String(genre || ""));
    if (type === 1) router.push(`/movies?${params.toString()}`);
  };


  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="w-full max-w-2xs overflow-x-auto sm:max-w-full">
      <Pagination className="justify-center">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous isDisabled={page === 1} onPress={() => buildHref(page - 1, genre ? Number(genre) : 0)}>
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>
          {getPageNumbers().map((p, i) =>
            p === "ellipsis" ? (
              <Pagination.Item key={`ellipsis-${i}`}>
                <Pagination.Ellipsis />
              </Pagination.Item>
            ) : (
              <Pagination.Item key={p}>
                <Pagination.Link isActive={p === page} onPress={() => buildHref(p, genre ? Number(genre) : 0)}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ),
          )}
          <Pagination.Item>
            <Pagination.Next isDisabled={page === totalPages} onPress={() => buildHref(page + 1, genre ? Number(genre) : 0)}>
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}