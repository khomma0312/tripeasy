/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * tripeasy
 * TripeasyのAPI仕様書
 * OpenAPI spec version: 1.0.0
 */
import {
  faker
} from '@faker-js/faker'
import {
  HttpResponse,
  delay,
  http
} from 'msw'
import type {
  GetTodoLists200,
  GetTodoListsId200,
  PatchTodoListsId200
} from '../../model'

export const getGetTodoListsResponseMock = (overrideResponse: Partial< GetTodoLists200 > = {}): GetTodoLists200 => ({todoLists: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({completedTasks: faker.number.int({min: undefined, max: undefined}), id: faker.number.int({min: undefined, max: undefined}), startDate: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), title: faker.string.alpha(20), totalTasks: faker.number.int({min: undefined, max: undefined})})), totalPages: faker.number.int({min: undefined, max: undefined}), ...overrideResponse})

export const getGetTodoListsIdResponseMock = (overrideResponse: Partial< GetTodoListsId200 > = {}): GetTodoListsId200 => ({id: faker.number.int({min: undefined, max: undefined}), items: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({dueDate: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), id: faker.number.int({min: undefined, max: undefined}), isCompleted: faker.datatype.boolean(), order: faker.number.int({min: undefined, max: undefined}), title: faker.string.alpha(20)})), title: faker.string.alpha(20), tripDate: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), tripId: faker.number.int({min: undefined, max: undefined}), tripTitle: faker.string.alpha(20), ...overrideResponse})

export const getPatchTodoListsIdResponseMock = (overrideResponse: Partial< PatchTodoListsId200 > = {}): PatchTodoListsId200 => ({id: faker.number.int({min: undefined, max: undefined}), ...overrideResponse})


export const getGetTodoListsMockHandler = (overrideResponse?: GetTodoLists200 | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<GetTodoLists200> | GetTodoLists200)) => {
  return http.get('*/todo-lists', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getGetTodoListsResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getGetTodoListsIdMockHandler = (overrideResponse?: GetTodoListsId200 | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<GetTodoListsId200> | GetTodoListsId200)) => {
  return http.get('*/todo-lists/:id', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getGetTodoListsIdResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getPatchTodoListsIdMockHandler = (overrideResponse?: PatchTodoListsId200 | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<PatchTodoListsId200> | PatchTodoListsId200)) => {
  return http.patch('*/todo-lists/:id', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPatchTodoListsIdResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}
export const getTodoListsMock = () => [
  getGetTodoListsMockHandler(),
  getGetTodoListsIdMockHandler(),
  getPatchTodoListsIdMockHandler()
]
