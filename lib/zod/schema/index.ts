import {
  accommodationsAllGetApiSchema,
  accommodationsDeleteApiSchema,
  accommodationsGetApiSchema,
  accommodationsPatchApiSchema,
  accommodationsPostApiSchema,
  accommodationsSearchGetApiSchema,
} from "./accommodations";
import { destinationsSearchGetApiSchema } from "./destinations";
import { registerPostApiSchema } from "./register";
import { requestTokenPostApiSchema } from "./request-token";
import {
  todoItemsPostApiSchema,
  todoItemsPatchApiSchema,
  todoItemsDeleteApiSchema,
  todoItemsPatchIsCompletedApiSchema,
} from "./todo-items";
import {
  todoListsAllGetApiSchema,
  todoListsDeleteApiSchema,
  todoListsGetApiSchema,
  todoListsPatchApiSchema,
} from "./todo-lists";
import {
  tripRoutePointsPatchApiSchema,
  tripRoutePointsPostApiSchema,
} from "./trip-route-points";
import {
  tripsAllGetApiSchema,
  tripsDeleteApiSchema,
  tripsGetApiSchema,
  tripsPostApiSchema,
} from "./trips";
import { verifyEmailPostApiSchema } from "./verify-email";

// NOTE: APIパスを追加するごとに、この変数にzodスキーマを追加する
export const pathSchemas = [
  registerPostApiSchema,
  verifyEmailPostApiSchema,
  requestTokenPostApiSchema,
  // Todoアイテム用API
  todoItemsPostApiSchema,
  todoItemsPatchApiSchema,
  todoItemsPatchIsCompletedApiSchema,
  todoItemsDeleteApiSchema,
  // Todoリスト用API
  todoListsAllGetApiSchema,
  todoListsGetApiSchema,
  todoListsPatchApiSchema,
  todoListsDeleteApiSchema,
  // 宿泊施設予約情報用API
  accommodationsPostApiSchema,
  accommodationsAllGetApiSchema,
  accommodationsGetApiSchema,
  accommodationsSearchGetApiSchema,
  accommodationsPatchApiSchema,
  accommodationsDeleteApiSchema,
  // 旅行情報用API
  tripsAllGetApiSchema,
  tripsGetApiSchema,
  tripsPostApiSchema,
  tripsDeleteApiSchema,
  // 旅行情報の目的地用API
  tripRoutePointsPostApiSchema,
  tripRoutePointsPatchApiSchema,
  // 目的地用API
  destinationsSearchGetApiSchema,
];
