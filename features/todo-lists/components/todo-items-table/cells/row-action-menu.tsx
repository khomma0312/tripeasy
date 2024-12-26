import { useEditingRowAtomValue } from "@/features/todo-lists/store/editing-row";
import { TodoItem } from "@/features/todo-lists/types";
import { SaveCancelButtonGroup } from "./save-cancel-button-group";
import { EditDeleteMenuButton } from "./edit-delete-menu-button";
import { UpdateTodoItemMutator } from "@/services/api/types/mutate";

type Props = {
  todo: TodoItem;
  updateMutate: UpdateTodoItemMutator;
  deleteTodo: (id: number) => void;
};

export const RowActionMenu = ({ todo, updateMutate, deleteTodo }: Props) => {
  const editingRow = useEditingRowAtomValue();

  return (
    <div className="relative flex justify-end">
      {editingRow && editingRow === todo.order ? (
        <SaveCancelButtonGroup todo={todo} mutate={updateMutate} />
      ) : (
        <EditDeleteMenuButton todo={todo} deleteTodo={deleteTodo} />
      )}
    </div>
  );
};
