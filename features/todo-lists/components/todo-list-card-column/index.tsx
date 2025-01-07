import { TodoListForCard } from "@/features/todo-lists/types";
import { TodoListCard } from "@/features/todo-lists/components/todo-list-card";

type Props = {
  todoLists: TodoListForCard[];
};

export const TodoListCardColumn = ({ todoLists }: Props) => {
  return (
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
  );
};
