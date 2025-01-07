import { TodoListForCard } from "@/features/todo-lists/types";
import { TodoListsHeader } from "@/features/todo-lists/components/todo-lists-header";
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
        <TodoListsHeader />
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
