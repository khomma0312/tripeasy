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
  PostRegister200
} from '../../model'

export const getPostRegisterResponseMock = (overrideResponse: Partial< PostRegister200 > = {}): PostRegister200 => ({id: faker.number.int({min: undefined, max: undefined}), name: faker.string.alpha(20), ...overrideResponse})


export const getPostRegisterMockHandler = (overrideResponse?: PostRegister200 | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<PostRegister200> | PostRegister200)) => {
  return http.post('*/register', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPostRegisterResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}
export const getRegisterMock = () => [
  getPostRegisterMockHandler()
]