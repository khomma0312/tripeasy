"use client";

import { CenteredContentLayout } from "@/components/layout/centered-content-layout";
import { HandleError } from "@/components/shared/handle-error";
import { TodoItemsTableLoadingSkeleton } from "@/features/todo-lists/components/todo-items-table-loading-skeleton";
import dynamic from "next/dynamic";

// SSR時にも以下コンポーネントでフェッチが走るが、その際に認証用のヘッダーがなくエラーになる。
// クライアントでのレンダリング時のみ実行されるよう遅延ローディングすることで、エラーを回避している。
const TodoItemsTableContainer = dynamic(
  () =>
    import("@/features/todo-lists/components/todo-items-table-container").then(
      (mod) => mod.TodoItemsTableContainer
    ),
  { ssr: false, loading: () => <TodoItemsTableLoadingSkeleton /> }
);

type Props = {
  id: number;
};

export function PageClient({ id }: Props) {
  return (
    <CenteredContentLayout>
      <HandleError onReset={() => window.location.reload()}>
        <TodoItemsTableContainer todoListId={id} />
      </HandleError>
    </CenteredContentLayout>
  );
}
