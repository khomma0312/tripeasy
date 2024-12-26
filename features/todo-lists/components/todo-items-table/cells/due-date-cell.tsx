import { format } from "date-fns";
import { DatePicker } from "@/components/shared/date-picker";
import { dateFormatStrForFormat } from "@/consts/common";
import { useEditingRowAtomValue } from "@/features/todo-lists/store/editing-row";
import {
  useEditingRowDataAtom,
  useEditingRowDataSetAtom,
} from "@/features/todo-lists/store/editing-row-data";
import { TodoItem } from "@/features/todo-lists/types";

type Props = {
  todo: TodoItem;
};

export const DueDateCell = ({ todo }: Props) => {
  const editingRow = useEditingRowAtomValue();
  const [editingRowData, setEditingRowData] = useEditingRowDataAtom();

  return editingRow && editingRow === todo.order ? (
    <DatePicker
      date={editingRowData?.dueDate ? editingRowData.dueDate : undefined}
      setDate={(date) =>
        setEditingRowData((prev) => ({
          ...prev,
          title: prev?.title ? prev.title : "",
          dueDate: date,
        }))
      }
    />
  ) : (
    todo.dueDate && format(todo.dueDate, dateFormatStrForFormat)
  );
};
