"use client";

import { CenteredContentLayout } from "@/components/layout/centered-content-layout";
import { HandleError } from "@/components/shared/handle-error";
import { TodoItemsTableContainer } from "@/features/todo-lists/components/todo-items-table-container";
import { TodoItemsTableLoadingSkeleton } from "@/features/todo-lists/components/todo-items-table-loading-skeleton";
import { Suspense } from "react";

type Props = {
  id: number;
};

export function PageClient({ id }: Props) {
  return (
    <CenteredContentLayout>
      <HandleError onReset={() => window.location.reload()}>
        <Suspense fallback={<TodoItemsTableLoadingSkeleton />}>
          <TodoItemsTableContainer todoListId={id} />
        </Suspense>
      </HandleError>
    </CenteredContentLayout>
  );
}
