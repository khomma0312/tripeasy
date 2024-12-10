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
  PostVerifyEmail200
} from '../../model'

export const getPostVerifyEmailResponseMock = (overrideResponse: Partial< PostVerifyEmail200 > = {}): PostVerifyEmail200 => ({user: {email: faker.string.alpha(20)}, ...overrideResponse})


export const getPostVerifyEmailMockHandler = (overrideResponse?: PostVerifyEmail200 | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<PostVerifyEmail200> | PostVerifyEmail200)) => {
  return http.post('*/verify-email', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPostVerifyEmailResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}
export const getVerifyEmailMock = () => [
  getPostVerifyEmailMockHandler()
]