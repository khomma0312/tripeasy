import { TodoList } from "@/features/todo-lists/types";
import { useDeleteTodoItem } from "@/features/todo-lists/hooks/use-delete-todo-item";
import { useUpdateTodoItem } from "@/features/todo-lists/hooks/use-update-todo-item";
import { TodoListTable } from "../todo-list-table";

type Props = {
  todoList: TodoList;
};

export const TodoListTableContainer = ({ todoList }: Props) => {
  const { deleteTodo } = useDeleteTodoItem(todoList.id);
  const { updateTodoItemMutate, updateTodoStatusMutate } = useUpdateTodoItem(
    todoList.id
  );

  return (
    <TodoListTable
      todoList={todoList}
      deleteTodo={deleteTodo}
      updateTodoStatusMutate={updateTodoStatusMutate}
      updateTodoItemMutate={updateTodoItemMutate}
    />
  );
};
