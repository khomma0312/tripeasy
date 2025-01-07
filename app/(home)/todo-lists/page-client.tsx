"use client";

import { HorizontallyCenteredContentLayout } from "@/components/layout/horizontally-centered-content-layout";
import { HandleError } from "@/components/shared/handle-error";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";

const TodoListsPageContainer = dynamic(
  () =>
    import("@/features/todo-lists/components/todo-lists-page-container").then(
      (mod) => mod.TodoListsPageContainer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full grid place-items-center">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    ),
  }
);

type Props = {
  currentPage: number;
  perPage: number | undefined;
};

export function PageClient({ currentPage, perPage }: Props) {
  return (
    <HorizontallyCenteredContentLayout>
      <HandleError onReset={() => window.location.reload()}>
        <TodoListsPageContainer currentPage={currentPage} perPage={perPage} />
      </HandleError>
    </HorizontallyCenteredContentLayout>
  );
}
