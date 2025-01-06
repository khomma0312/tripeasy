import Link from "next/link";
import { Plus } from "lucide-react";
import { TitleHeading } from "@/components/shared/title-heading";
import { Button } from "@/components/shadcn/button";
import { TodoListCard } from "../todo-list-card";
import { TodoListForCard } from "../../types";
import { PaginatedNavigation } from "@/components/shared/paginated-navigation";

type Props = {
  todoLists: TodoListForCard[];
  currentPage: number;
  totalPages: number;
};

export const TodoListsWithPagination = ({
  todoLists,
  currentPage,
  totalPages,
}: Props) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-8">
          <TitleHeading>TODOリスト一覧</TitleHeading>
          <Link href="/trips/new">
            <Button className="flex items-center gap-2">
              <Plus />
              旅行計画を作成
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {todoLists.map((todoList) => (
            <TodoListCard
              key={todoList.id}
              id={todoList.id}
              title={todoList.title}
              startDate={todoList.startDate}
              totalTasks={todoList.totalTasks}
              completedTasks={todoList.completedTasks}
            />
          ))}
        </div>
      </div>
      <div>
        <PaginatedNavigation
          basedUrl="/todo-lists"
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
