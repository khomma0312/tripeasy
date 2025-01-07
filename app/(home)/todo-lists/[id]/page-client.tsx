"use client";

import { CenteredContentLayout } from "@/components/layout/centered-content-layout";
import { HandleError } from "@/components/shared/handle-error";
import { TodoListTableLoadingSkeleton } from "@/features/todo-lists/components/todo-list-table-loading-skeleton";
import dynamic from "next/dynamic";

// SSR時にも以下コンポーネントでフェッチが走るが、その際に認証用のヘッダーがなくエラーになる。
// クライアントでのレンダリング時のみ実行されるよう遅延ローディングすることで、エラーを回避している。
const TodoListPageContainer = dynamic(
  () =>
    import("@/features/todo-lists/components/todo-list-page-container").then(
      (mod) => mod.TodoListPageContainer
    ),
  { ssr: false, loading: () => <TodoListTableLoadingSkeleton /> }
);

type Props = {
  id: number;
};

export function PageClient({ id }: Props) {
  return (
    <CenteredContentLayout>
      <HandleError onReset={() => window.location.reload()}>
        <TodoListPageContainer todoListId={id} />
      </HandleError>
    </CenteredContentLayout>
  );
}
