/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * tripeasy
 * TripeasyのAPI仕様書
 * OpenAPI spec version: 1.0.0
 */
import type { GetTripsId200TripTripDaysItemTripRoutePointsItem } from './getTripsId200TripTripDaysItemTripRoutePointsItem';

export type GetTripsId200TripTripDaysItem = {
  dayDate: string;
  dayDescription?: string;
  dayOrder: number;
  tripRoutePoints: GetTripsId200TripTripDaysItemTripRoutePointsItem[];
};
