/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * tripeasy
 * TripeasyのAPI仕様書
 * OpenAPI spec version: 1.0.0
 */
import type { PatchTripRoutePointsReorderBodyTripRoutePointsItemLatLng } from './patchTripRoutePointsReorderBodyTripRoutePointsItemLatLng';

export type PatchTripRoutePointsReorderBodyTripRoutePointsItem = {
  accommodationId?: number;
  address?: string;
  arrivalTime: string;
  departureTime: string;
  id: number;
  imageUrl?: string;
  latLng?: PatchTripRoutePointsReorderBodyTripRoutePointsItemLatLng;
  name: string;
  visitOrder: number;
};
