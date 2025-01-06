export type TodoListForCard = {
  id: number;
  title: string;
  startDate?: string;
  totalTasks: number;
  completedTasks: number;
};

export type TodoList = {
  id: number;
  title: string;
  tripId: number;
  tripTitle: string;
  tripDate?: Date | undefined;
  items: TodoItem[];
};

export type TodoItem = {
  id: number;
  title: string;
  dueDate?: Date | undefined;
  isCompleted: boolean;
  order: number;
};
