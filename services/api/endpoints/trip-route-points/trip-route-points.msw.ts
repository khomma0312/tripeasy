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
  PostTripRoutePoints200
} from '../../model'

export const getPostTripRoutePointsResponseMock = (overrideResponse: Partial< PostTripRoutePoints200 > = {}): PostTripRoutePoints200 => ({id: faker.number.int({min: undefined, max: undefined}), ...overrideResponse})


export const getPostTripRoutePointsMockHandler = (overrideResponse?: PostTripRoutePoints200 | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<PostTripRoutePoints200> | PostTripRoutePoints200)) => {
  return http.post('*/trip-route-points', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPostTripRoutePointsResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}
export const getTripRoutePointsMock = () => [
  getPostTripRoutePointsMockHandler()
]
