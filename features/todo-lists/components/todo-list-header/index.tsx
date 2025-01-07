import { TodoList } from "@/features/todo-lists/types";
import { dateFormatStrForFormat } from "@/consts/common";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { useUpdateTodoList } from "@/features/todo-lists/hooks/use-update-todo-list";
import { useDeleteTodoList } from "@/features/todo-lists/hooks/use-delete-todo-list";
import { EditableTitle } from "@/features/todo-lists/components/editable-title";
import { TodoListDeleteButton } from "@/features/todo-lists/components/todo-list-delete-button";

type Props = {
  todoList: TodoList;
};

export const TodoListHeader = ({ todoList }: Props) => {
  const { updateTodoListMutate } = useUpdateTodoList(todoList.id);
  const { deleteTodoListMutate } = useDeleteTodoList();

  return (
    <div className="flex justify-between">
      <div className="mb-8">
        <EditableTitle
          defaultTitle={todoList.title}
          onSave={(title) =>
            updateTodoListMutate({ id: todoList.id, data: { title } })
          }
        />
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          {todoList.tripDate &&
            format(todoList.tripDate, dateFormatStrForFormat)}
        </div>
      </div>
      <TodoListDeleteButton
        onDelete={() => deleteTodoListMutate({ id: todoList.id })}
      />
    </div>
  );
};
