import { TodoListForCard } from "@/features/todo-lists/types";
import { ListPageHeader } from "@/components/shared/list-page-header";
import { TodoListCardColumn } from "@/features/todo-lists/components/todo-list-card-column";
import { PaginatedNavigation } from "@/components/shared/paginated-navigation";
import { WithPaginationLayout } from "@/components/layout/with-pagination-layout";

type Props = {
  todoLists: TodoListForCard[];
  currentPage: number;
  totalPages: number;
};

export const TodoListsPage = ({
  todoLists,
  currentPage,
  totalPages,
}: Props) => {
  return (
    <WithPaginationLayout
      baseUrl="/todo-lists"
      currentPage={currentPage}
      totalPages={totalPages}
    >
      <div>
        <ListPageHeader
          title="TODOリスト一覧"
          labelForButton="旅行計画を作成"
          linkForButton="/trips/new"
        />
        <TodoListCardColumn todoLists={todoLists} />
      </div>
    </WithPaginationLayout>
  );
};
