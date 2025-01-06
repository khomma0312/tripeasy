"use client";

import { HorizontallyCenteredContentLayout } from "@/components/layout/horizontally-centered-content-layout";
import { HandleError } from "@/components/shared/handle-error";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";

const TodoListsContainer = dynamic(
  () =>
    import("@/features/todo-lists/components/todo-lists-container").then(
      (mod) => mod.TodoListsContainer
    ),
  {
    ssr: false,
    loading: () => <LoaderCircle className="size-10 animate-spin" />,
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
        <TodoListsContainer currentPage={currentPage} perPage={perPage} />
      </HandleError>
    </HorizontallyCenteredContentLayout>
  );
}
