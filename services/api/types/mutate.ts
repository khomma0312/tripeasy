import { UseMutateFunction } from "@tanstack/react-query";
import {
  PatchTodoItemsId200,
  PatchTodoItemsId500,
  PatchTodoItemsIdBody,
  PatchTodoItemsIsCompletedId200,
  PatchTodoItemsIsCompletedId500,
  PatchTodoItemsIsCompletedIdBody,
} from "@/services/api/model";
import { BodyType, ErrorType } from "@/services/api/mutator/custom-instance";

export type UpdateTodoItemMutator = UseMutateFunction<
  PatchTodoItemsId200,
  ErrorType<PatchTodoItemsId500>,
  {
    id: number;
    data: BodyType<PatchTodoItemsIdBody>;
  },
  unknown
>;

export type UpdateTodoStatusMutator = UseMutateFunction<
  PatchTodoItemsIsCompletedId200,
  ErrorType<PatchTodoItemsIsCompletedId500>,
  {
    id: number;
    data: BodyType<PatchTodoItemsIsCompletedIdBody>;
  },
  unknown
>;
