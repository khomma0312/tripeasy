import { TodoList } from "@/features/todo-lists/types";
import { dateFormatStrForFormat } from "@/consts/common";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { EditableTitle } from "@/features/todo-lists/components/editable-title";
import { TodoListDeleteButton } from "@/features/todo-lists/components/todo-list-delete-button";
import { UseMutateFunction } from "@tanstack/react-query";
import {
  DeleteTodoListsId200,
  DeleteTodoListsId403,
  DeleteTodoListsId500,
  PatchTodoListsId200,
  PatchTodoListsId403,
  PatchTodoListsId500,
  PatchTodoListsIdBody,
} from "@/services/api/model";
import { ErrorType } from "@/services/api/mutator/custom-instance";

type Props = {
  todoList: TodoList;
  updateTodoListMutate: UseMutateFunction<
    PatchTodoListsId200,
    ErrorType<PatchTodoListsId403 | PatchTodoListsId500>,
    { id: number; data: PatchTodoListsIdBody },
    unknown
  >;
  deleteTodoListMutate: UseMutateFunction<
    DeleteTodoListsId200,
    ErrorType<DeleteTodoListsId403 | DeleteTodoListsId500>,
    { id: number },
    unknown
  >;
};

export const TodoListHeader = ({
  todoList,
  updateTodoListMutate,
  deleteTodoListMutate,
}: Props) => {
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
