import { TodoList } from "@/features/todo-lists/types";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { DatePicker } from "@/components/shared/date-picker";
import { useAddTodoItem } from "@/features/todo-lists/hooks/use-add-todo-item";

type Props = {
  todoList: TodoList;
};

export const TodoItemAddForm = ({ todoList }: Props) => {
  const {
    form: formToAddTodo,
    isPending: isAddingTodo,
    onSubmit,
  } = useAddTodoItem(todoList.id, todoList.items);

  return (
    <Form {...formToAddTodo}>
      <form
        onSubmit={formToAddTodo.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 mb-6"
      >
        <FormField
          control={formToAddTodo.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  disabled={isAddingTodo}
                  placeholder="やることを入力"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formToAddTodo.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="w-full sm:w-auto">
              <FormControl>
                <DatePicker
                  date={field.value}
                  setDate={(date) => field.onChange(date)}
                  className="w-full sm:w-auto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isAddingTodo}
          className="w-full sm:w-auto"
        >
          <Plus />
          Todoを追加
        </Button>
      </form>
    </Form>
  );
};
