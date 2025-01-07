import { ColumnDef } from "@tanstack/react-table";
import { TodoItem } from "@/features/todo-lists/types";
import { Button } from "@/components/shadcn/button";
import { ArrowUpDown } from "lucide-react";
import { RowActionMenu } from "./cells/row-action-menu";
import {
  UpdateTodoItemMutator,
  UpdateTodoStatusMutator,
} from "@/services/api/types/mutate";
import { DueDateCell } from "./cells/due-date-cell";
import { TitleCell } from "./cells/title-cell";
import { IsCompletedCell } from "./cells/is-completed-cell";

export const getColumns = (
  updateTodoStatusMutate: UpdateTodoStatusMutator,
  updateTodoItemMutate: UpdateTodoItemMutator,
  deleteTodo: (id: number) => void
): ColumnDef<TodoItem>[] => [
  {
    id: "isCompleted",
    header: "Done",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <IsCompletedCell todo={todo} updateMutate={updateTodoStatusMutate} />
      );
    },
  },
  {
    accessorKey: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          やること
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const todo = row.original;
      return <TitleCell todo={todo} />;
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          期限日
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const todo = row.original;
      return <DueDateCell todo={todo} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <RowActionMenu
          todo={todo}
          updateMutate={updateTodoItemMutate}
          deleteTodo={deleteTodo}
        />
      );
    },
  },
];
