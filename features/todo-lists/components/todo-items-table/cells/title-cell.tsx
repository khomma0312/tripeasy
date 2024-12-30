import { ChangeEventHandler, useRef } from "react";
import { Input } from "@/components/shadcn/input";
import { useEditingRowDataSetAtom } from "@/features/todo-lists/store/editing-row-data";
import { useEditingRowAtomValue } from "@/features/todo-lists/store/editing-row";
import { TodoItem } from "@/features/todo-lists/types";

type Props = {
  todo: TodoItem;
};

export const TitleCell = ({ todo }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setEditingRowData = useEditingRowDataSetAtom();
  const editingRow = useEditingRowAtomValue();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }
    setEditingRowData((prev) => ({ ...prev, title: e.target.value }));
  };

  return editingRow && editingRow === todo.id ? (
    <Input
      ref={inputRef}
      value={inputRef.current?.value}
      defaultValue={todo.title}
      onChange={onChange}
      className="text-sm"
    />
  ) : (
    <span
      className={todo.isCompleted ? "line-through text-muted-foreground" : ""}
    >
      {todo.title}
    </span>
  );
};
