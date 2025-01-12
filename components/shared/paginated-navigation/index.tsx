"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination";
import { useSearchParams } from "next/navigation";

type Props = {
  basedUrl: string;
  currentPage: number;
  totalPages: number;
};

export const PaginatedNavigation = ({
  basedUrl,
  currentPage,
  totalPages,
}: Props) => {
  const searchParams = useSearchParams();

  const generateParams = (page: number) => {
    const allParams = Object.fromEntries(searchParams.entries());
    return new URLSearchParams({
      ...allParams,
      page: String(page),
    }).toString();
  };

  const generateArray = (center: number, range: number) => {
    return Array.from({ length: range * 2 + 1 }, (_, i) => center - range + i);
  };

  const generatePageNumbers = () => {
    if (totalPages > 5) {
      // totalPagesが5より大きいかつ、currentPageがtotalPages - 3 〜 totalPagesの場合は、totalPages - 4 〜 totalPagesをそのまま出力する
      if (currentPage > totalPages - 3) {
        return Array.from({ length: 5 }, (_, i) => totalPages - i).toReversed();
      }

      // totalPagesが5より大きいかつ、currentPageが5以上の場合、currentPage-1〜currentPage+1のページを出力する
      if (currentPage >= 5) {
        return generateArray(currentPage, 1);
      }

      // それ以外の場合は5ページまでを表示
      return Array.from({ length: 5 }, (_, i) => i + 1);
    }

    // totalPagesが5以下の場合はtotalPagesの分そのまま出力する。
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${basedUrl}?${generateParams(currentPage - 1)}`}
            />
          </PaginationItem>
        )}

        {/* pageNumbersに1が含まれていない場合は、省略記号のアイコンを出力 */}
        {!pageNumbers.includes(1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 動的にナビゲーションを生成 */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`${basedUrl}?${generateParams(page)}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* pageNumbersにtotalPagesが含まれていない場合は、省略記号のアイコンを出力 */}
        {!pageNumbers.includes(totalPages) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext
              href={`${basedUrl}?${generateParams(currentPage + 1)}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
