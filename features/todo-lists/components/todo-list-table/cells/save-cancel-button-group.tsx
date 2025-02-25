import { Check, X } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { TodoItem } from "@/features/todo-lists/types";
import { format } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";
import { useEditingRowSetAtom } from "@/features/todo-lists/store/editing-row";
import { useEditingRowDataAtom } from "@/features/todo-lists/store/editing-row-data";
import { UpdateTodoItemMutator } from "@/services/api/types/mutate";
import { PatchTodoItemsIdBody } from "@/services/api/model";

type Props = {
  todo: TodoItem;
  mutate: UpdateTodoItemMutator;
};

export const SaveCancelButtonGroup = ({ todo, mutate }: Props) => {
  const setEditingRow = useEditingRowSetAtom();
  const [editingRowData, setEditingRowData] = useEditingRowDataAtom();

  const closeEditMode = () => {
    setEditingRow(null);
    setEditingRowData(null);
  };

  const updateTodo = (todoId: number) => {
    if (editingRowData) {
      const data: PatchTodoItemsIdBody = {
        ...editingRowData,
        dueDate:
          editingRowData.dueDate &&
          format(editingRowData.dueDate, dateFormatStrForParse),
      };

      mutate({ id: todoId, data });
    }
  };

  return (
    <div className="flex space-x-1">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => {
          updateTodo(todo.id);
          closeEditMode();
        }}
        aria-label="Todoアイテムを保存"
      >
        <Check className="size-4 text-emerald-500" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => closeEditMode()}
        aria-label="Todoアイテムの保存をキャンセル"
      >
        <X className="size-4 text-rose-500" />
      </Button>
    </div>
  );
};
