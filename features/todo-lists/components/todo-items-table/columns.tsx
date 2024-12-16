import { ColumnDef } from "@tanstack/react-table";
import { TodoItem } from "@/features/todo-lists/types";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Button } from "@/components/shadcn/button";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash,
  Check,
  X,
} from "lucide-react";
import { Input } from "@/components/shadcn/input";
import { DatePicker } from "@/components/shared/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { format } from "date-fns";
import { dateFormatStr } from "@/consts/common";

export const getColumns = (
  editingRow: number | null,
  setEditingRow: (id: number | null) => void,
  toggleTodo: (id: number | null, isCompleted: boolean) => void,
  updateEditingTodo: (id: number | null, updates: Partial<TodoItem>) => void,
  cancelEdit: () => void,
  deleteTodo: (id: number | null) => void
): ColumnDef<TodoItem>[] => [
  {
    id: "isCompleted",
    header: "Done",
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.isCompleted}
        onCheckedChange={(checked) =>
          toggleTodo(row.original.id, checked as boolean)
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
      return editingRow && editingRow === todo.order ? (
        <Input
          value={todo.title}
          onChange={(e) =>
            updateEditingTodo(todo.id, { title: e.target.value })
          }
          className="text-sm"
        />
      ) : (
        <span
          className={
            todo.isCompleted ? "line-through text-muted-foreground" : ""
          }
        >
          {todo.title}
        </span>
      );
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
      return editingRow && editingRow === todo.order ? (
        <DatePicker
          date={todo.dueDate ? todo.dueDate : undefined}
          setDate={(date) =>
            updateEditingTodo(todo.id, {
              dueDate: date,
            })
          }
        />
      ) : (
        todo.dueDate && format(todo.dueDate, dateFormatStr)
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <div className="relative flex justify-end">
          {editingRow && editingRow === todo.order ? (
            <div className="flex space-x-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setEditingRow(null)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => cancelEdit()}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditingRow(todo.order)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteTodo(todo.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];
