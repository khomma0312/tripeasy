import { TodoList } from "@/features/todo-lists/types";
import { useUpdateTodoList } from "@/features/todo-lists/hooks/use-update-todo-list";
import { useDeleteTodoList } from "@/features/todo-lists/hooks/use-delete-todo-list";
import { TodoListHeader } from "../todo-list-header";

type Props = {
  todoList: TodoList;
};

export const TodoListHeaderContainer = ({ todoList }: Props) => {
  const { updateTodoListMutate } = useUpdateTodoList(todoList.id);
  const { deleteTodoListMutate } = useDeleteTodoList();

  return (
    <TodoListHeader
      todoList={todoList}
      updateTodoListMutate={updateTodoListMutate}
      deleteTodoListMutate={deleteTodoListMutate}
    />
  );
};
