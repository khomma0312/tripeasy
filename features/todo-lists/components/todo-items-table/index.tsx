"use client";

import { TodoItem, TodoList } from "@/features/todo-lists/types";
import { useTodoItemsTable } from "@/features/todo-lists/hooks/use-todo-items-table";
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
import { useEffect } from "react";
import { dateFormatStr } from "@/consts/common";

type Props = {
  todoList: TodoList;
};

export const TodoItemsTable = ({ todoList }: Props) => {
  const {
    form,
    todos,
    editingRow,
    setEditingRow,
    onSubmit,
    toggleTodoStatus,
    updateEditingTodo,
    cancelEdit,
    deleteTodo,
  } = useTodoItemsTable(todoList.items);

  const columns = getColumns(
    editingRow,
    setEditingRow,
    toggleTodoStatus,
    updateEditingTodo,
    cancelEdit,
    deleteTodo
  );

  const table = useReactTable({
    data: todos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{todoList.title}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          {format(todoList.date, dateFormatStr)}
        </div>
      </div>
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
                  <Input placeholder="やることを入力" {...field} />
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
          <Button type="submit" className="w-full sm:w-auto">
            <Plus />
            TODOを追加
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
