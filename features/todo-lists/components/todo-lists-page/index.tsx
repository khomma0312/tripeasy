import { TodoListForCard } from "@/features/todo-lists/types";
import { ListPageHeader } from "@/components/shared/list-page-header";
import { TodoListCardColumn } from "@/features/todo-lists/components/todo-list-card-column";
import { PaginatedNavigation } from "@/components/shared/paginated-navigation";

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
    <div className="h-full flex flex-col justify-between">
      <div>
        <ListPageHeader
          title="TODOリスト一覧"
          labelForButton="旅行計画を作成"
          linkForButton="/trips/new"
        />
        <TodoListCardColumn todoLists={todoLists} />
      </div>
      <PaginatedNavigation
        basedUrl="/todo-lists"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};
