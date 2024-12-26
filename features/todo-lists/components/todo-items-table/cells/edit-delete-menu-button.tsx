import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { useEditingRowSetAtom } from "../../../store/editing-row";
import { useEditingRowDataSetAtom } from "../../../store/editing-row-data";
import { TodoItem } from "../../../types";

type Props = {
  todo: TodoItem;
  deleteTodo: (id: number) => void;
};

export const EditDeleteMenuButton = ({ todo, deleteTodo }: Props) => {
  const setEditingRow = useEditingRowSetAtom();
  const setEditingRowData = useEditingRowDataSetAtom();

  const initForEditingMode = (todo: TodoItem) => {
    setEditingRow(todo.order);
    setEditingRowData({ title: todo.title, dueDate: todo.dueDate });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => initForEditingMode(todo)}>
          <Pencil className="mr-2 h-4 w-4" />
          編集
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => todo.id && deleteTodo(todo.id)}>
          <Trash className="mr-2 h-4 w-4" />
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
