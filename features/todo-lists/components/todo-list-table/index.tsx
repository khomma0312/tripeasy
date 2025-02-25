"use client";

import { TodoItem, TodoList } from "@/features/todo-lists/types";
import {
  UpdateTodoItemMutator,
  UpdateTodoStatusMutator,
} from "@/services/api/types/mutate";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { getColumns } from "./columns";

type Props = {
  todoList: TodoList;
  deleteTodo: (todoId: number) => void;
  updateTodoStatusMutate: UpdateTodoStatusMutator;
  updateTodoItemMutate: UpdateTodoItemMutator;
};

export const TodoListTable = ({
  todoList,
  deleteTodo,
  updateTodoStatusMutate,
  updateTodoItemMutate,
}: Props) => {
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                TODOがまだ登録されていません
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
