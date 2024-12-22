import { GetTodoListsId200 } from "@/services/api/model";
import { TodoList } from "../types";
import { parse } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";

export const convertDataTypesToMatchTodoList = (
  data: GetTodoListsId200
): TodoList => {
  const todoList: TodoList = {
    ...data,
    tripDate: data.tripDate
      ? parse(data.tripDate, dateFormatStrForParse, new Date())
      : undefined,
    items: data.items
      ? data.items.map((item) => ({
          ...item,
          dueDate: item.dueDate
            ? parse(item.dueDate, dateFormatStrForParse, new Date())
            : undefined,
        }))
      : [],
  };
  return todoList;
};
