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
  PatchTripRoutePointsReorder200,
  PostTripRoutePoints200
} from '../../model'

export const getPostTripRoutePointsResponseMock = (overrideResponse: Partial< PostTripRoutePoints200 > = {}): PostTripRoutePoints200 => ({id: faker.number.int({min: undefined, max: undefined}), ...overrideResponse})

export const getPatchTripRoutePointsReorderResponseMock = (overrideResponse: Partial< PatchTripRoutePointsReorder200 > = {}): PatchTripRoutePointsReorder200 => ({ids: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.number.int({min: undefined, max: undefined}))), ...overrideResponse})


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

export const getPatchTripRoutePointsReorderMockHandler = (overrideResponse?: PatchTripRoutePointsReorder200 | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<PatchTripRoutePointsReorder200> | PatchTripRoutePointsReorder200)) => {
  return http.patch('*/trip-route-points/reorder', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPatchTripRoutePointsReorderResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}
export const getTripRoutePointsMock = () => [
  getPostTripRoutePointsMockHandler(),
  getPatchTripRoutePointsReorderMockHandler()
]
