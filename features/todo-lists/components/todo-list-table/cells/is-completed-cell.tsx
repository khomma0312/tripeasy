import { Checkbox } from "@/components/shadcn/checkbox";
import { TodoItem } from "@/features/todo-lists/types";
import { UpdateTodoStatusMutator } from "@/services/api/types/mutate";

type Props = {
  todo: TodoItem;
  updateMutate: UpdateTodoStatusMutator;
};

export const IsCompletedCell = ({ todo, updateMutate }: Props) => {
  return (
    <Checkbox
      checked={todo.isCompleted}
      onCheckedChange={(checked) => {
        if (checked === "indeterminate") return;
        updateMutate({ id: todo.id, data: { isCompleted: checked } });
      }}
    />
  );
};
