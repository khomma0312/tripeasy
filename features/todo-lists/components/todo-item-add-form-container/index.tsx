import { TodoList } from "@/features/todo-lists/types";
import { useAddTodoItem } from "@/features/todo-lists/hooks/use-add-todo-item";
import { TodoItemAddForm } from "../todo-item-add-form";

type Props = {
  todoList: TodoList;
};

export const TodoItemAddFormContainer = ({ todoList }: Props) => {
  const { form, isPending, onSubmit } = useAddTodoItem(
    todoList.id,
    todoList.items
  );

  return (
    <TodoItemAddForm form={form} isPending={isPending} onSubmit={onSubmit} />
  );
};
