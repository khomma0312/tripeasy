"use client";

import { TodoItem, TodoList } from "@/features/todo-lists/types";
import { getColumns } from "./columns";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { DatePicker } from "@/components/shared/date-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { format } from "date-fns";
import { dateFormatStrForFormat } from "@/consts/common";
import { useAddTodoItem } from "../../hooks/use-add-todo-item";
import { useDeleteTodoItem } from "../../hooks/use-delete-todo-item";
import { useUpdateTodoItem } from "../../hooks/use-update-todo-item";
import { useUpdateTodoList } from "../../hooks/use-update-todo-list";
import { EditableTitle } from "../editable-title";
import { TodoListDeleteButton } from "../todo-list-delete-button";
import { useDeleteTodoList } from "../../hooks/use-delete-todo-list";

type Props = {
  todoList: TodoList;
};

export const TodoItemsTable = ({ todoList }: Props) => {
  const {
    form: formToAddTodo,
    isPending: isAddingTodo,
    onSubmit,
  } = useAddTodoItem(todoList.id, todoList.items);

  const { deleteTodo } = useDeleteTodoItem(todoList.id);
  const { updateTodoItemMutate, updateTodoStatusMutate } = useUpdateTodoItem(
    todoList.id
  );
  const { updateTodoListMutate } = useUpdateTodoList(todoList.id);
  const { deleteTodoListMutate } = useDeleteTodoList();

  const columns = getColumns(
    updateTodoStatusMutate,
    updateTodoItemMutate,
    deleteTodo
  );

  const table = useReactTable<TodoItem>({
    data: todoList.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  TODOがまだ登録されていません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
