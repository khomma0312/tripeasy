import { TripRoutePointPlaceType } from "@/features/trips/types";

export type GetDestinationsSearchParams = {
  searchTerm: string;
  searchByPlaceId: boolean;
  searchLocationLat?: number;
  searchLocationLng?: number;
  searchType?: TripRoutePointPlaceType;
  nextPageToken?: string;
};
