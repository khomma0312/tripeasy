import { TripRoutePointPlaceType } from "@/features/trips/types";
import {
  getPlaceSuggestionsByLocation,
  getPlaceSuggestionsByText,
} from "../google-maps/fetcher";

export const getPlaceSuggestions = async (params: {
  query: string;
  nextPageToken?: string;
  searchLocation?: { lat: number; lng: number };
  searchType?: TripRoutePointPlaceType;
}) => {
  const { query, nextPageToken, searchType, searchLocation } = params;

  if (!query) {
    if (searchLocation) {
      return getPlaceSuggestionsByLocation(
        searchLocation,
        nextPageToken,
        searchType
      );
    }

    return {
      places: [],
      nextPageToken: undefined,
      error: undefined,
    };
  }

  return getPlaceSuggestionsByText(query, nextPageToken, searchType);
};
