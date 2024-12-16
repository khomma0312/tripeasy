export type TodoList = {
  id: number;
  title: string;
  date: Date;
  items: TodoItem[];
};

export type TodoItem = {
  id: number | null;
  title: string;
  dueDate?: Date | undefined;
  isCompleted: boolean;
  order: number;
};
