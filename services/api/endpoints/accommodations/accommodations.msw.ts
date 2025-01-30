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
  GetAccommodations200,
  GetAccommodationsId200,
  GetAccommodationsSearch200
} from '../../model'

export const getGetAccommodationsResponseMock = (overrideResponse: Partial< GetAccommodations200 > = {}): GetAccommodations200 => ({accommodations: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({address: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), bookingId: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), bookingUrl: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), checkIn: faker.string.alpha(20), checkOut: faker.string.alpha(20), id: faker.number.int({min: undefined, max: undefined}), image: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), name: faker.string.alpha(20)})), totalPages: faker.number.int({min: undefined, max: undefined}), ...overrideResponse})

export const getGetAccommodationsIdResponseMock = (overrideResponse: Partial< GetAccommodationsId200 > = {}): GetAccommodationsId200 => ({accommodation: {address: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), bookingId: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), bookingUrl: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), checkIn: faker.string.alpha(20), checkOut: faker.string.alpha(20), id: faker.number.int({min: undefined, max: undefined}), image: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), name: faker.string.alpha(20), notes: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), phoneNumber: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), reservationPrice: faker.helpers.arrayElement([faker.number.int({min: undefined, max: undefined}), undefined]), tripAdvisorUrl: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), tripId: faker.helpers.arrayElement([faker.number.int({min: undefined, max: undefined}), undefined])}, ...overrideResponse})

export const getGetAccommodationsSearchResponseMock = (overrideResponse: Partial< GetAccommodationsSearch200 > = {}): GetAccommodationsSearch200 => ({accommodations: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({address: faker.string.alpha(20), id: faker.number.int({min: undefined, max: undefined}), image: faker.string.alpha(20), informationUrl: faker.string.alpha(20), name: faker.string.alpha(20), reviewAverage: faker.number.int({min: undefined, max: undefined}), reviewCount: faker.number.int({min: undefined, max: undefined}), telephoneNo: faker.string.alpha(20)})), currentPage: faker.number.int({min: undefined, max: undefined}), pageCount: faker.number.int({min: undefined, max: undefined}), ...overrideResponse})


export const getGetAccommodationsMockHandler = (overrideResponse?: GetAccommodations200 | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<GetAccommodations200> | GetAccommodations200)) => {
  return http.get('*/accommodations', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getGetAccommodationsResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getGetAccommodationsIdMockHandler = (overrideResponse?: GetAccommodationsId200 | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<GetAccommodationsId200> | GetAccommodationsId200)) => {
  return http.get('*/accommodations/:id', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getGetAccommodationsIdResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getGetAccommodationsSearchMockHandler = (overrideResponse?: GetAccommodationsSearch200 | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<GetAccommodationsSearch200> | GetAccommodationsSearch200)) => {
  return http.get('*/accommodations/search', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getGetAccommodationsSearchResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}
export const getAccommodationsMock = () => [
  getGetAccommodationsMockHandler(),
  getGetAccommodationsIdMockHandler(),
  getGetAccommodationsSearchMockHandler()
]
