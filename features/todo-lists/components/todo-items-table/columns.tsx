import { ColumnDef } from "@tanstack/react-table";
import { TodoItem } from "@/features/todo-lists/types";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Button } from "@/components/shadcn/button";
import { ArrowUpDown } from "lucide-react";
import { RowActionMenu } from "./cells/row-action-menu";
import { UpdateTodoItemMutator } from "@/services/api/types/mutate";
import { DueDateCell } from "./cells/due-date-cell";
import { TitleCell } from "./cells/title-cell";

export const getColumns = (
  toggleTodoStatus: (id: number, isCompleted: boolean) => void,
  deleteTodo: (id: number) => void,
  updateMutate: UpdateTodoItemMutator
): ColumnDef<TodoItem>[] => [
  {
    id: "isCompleted",
    header: "Done",
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.isCompleted}
        onCheckedChange={(checked) =>
          toggleTodoStatus(row.original.id, checked as boolean)
        }
      />
    ),
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
          updateMutate={updateMutate}
          deleteTodo={deleteTodo}
        />
      );
    },
  },
];
