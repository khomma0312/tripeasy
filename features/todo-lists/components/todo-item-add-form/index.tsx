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
import { UseFormReturn } from "react-hook-form";
import { TypeOf } from "zod";
import { todoItemAddSchema } from "@/lib/zod/schema/todo-items";

type Props = {
  form: UseFormReturn<
    {
      title: string;
      dueDate?: Date | undefined;
    },
    any,
    undefined
  >;
  isPending: boolean;
  onSubmit: (data: TypeOf<typeof todoItemAddSchema>) => void;
};

export const TodoItemAddForm = ({ form, isPending, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 mb-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="やることを入力"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          <Plus />
          Todoを追加
        </Button>
      </form>
    </Form>
  );
};
