import { PaginatedNavigation } from "@/components/shared/paginated-navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  baseUrl: string;
  currentPage: number;
  totalPages: number;
};

export const WithPaginationLayout = ({
  children,
  baseUrl,
  currentPage,
  totalPages,
}: Props) => {
  return (
    <div className="h-full flex flex-col justify-between gap-5">
      {children}
      <PaginatedNavigation
        baseUrl={baseUrl}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};
