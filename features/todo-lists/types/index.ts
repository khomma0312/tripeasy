export type TodoList = {
  id: number;
  title: string;
  tripId: number;
  tripTitle: string;
  tripDate?: Date | undefined;
  items: TodoItem[];
};

export type TodoItem = {
  id: number | null;
  title: string;
  dueDate?: Date | undefined;
  isCompleted: boolean;
  order: number;
};
