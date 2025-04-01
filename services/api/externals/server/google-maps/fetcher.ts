import {
  Client,
  GeocodeRequest,
  Language,
  PlaceDetailsRequest,
  PlaceType1,
  TextSearchRequest,
  PlacesNearbyRequest,
  ReverseGeocodeRequest,
} from "@googlemaps/google-maps-services-js";
import { TripRoutePointPlaceType } from "@/features/trips/types";

const SELECTED_FIELDS = [
  "formatted_address",
  "geometry",
  "name",
  "place_id",
  "icon",
  "photos",
];

const searchTypeToPlaceTypeMap: {
  [key in TripRoutePointPlaceType]: PlaceType1 | undefined;
} = {
  accommodation: PlaceType1.lodging,
  destination: undefined,
};

const client = new Client();

export const getLatLngFromAddress = async (address: string) => {
  const args: GeocodeRequest = {
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      address,
    },
  };
  const res = await client.geocode(args).then((res) => res.data);

  if (res.status.toLowerCase() !== "ok") {
    throw new Error(res.error_message);
  }

  const result = res.results[0];
  // typeにpremiseかsubpremiseが含まれていれば、正確な位置情報として扱う
  const isLocationReliable = result.address_components[0].types.some(
    (type) => type === "premise" || type === "subpremise"
  );

  return {
    lat: res.results[0].geometry.location.lat,
    lng: res.results[0].geometry.location.lng,
    isLocationReliable,
  };
};

export const getAddressFromLatLng = async (latLng: {
  lat: number;
  lng: number;
}) => {
  const args: ReverseGeocodeRequest = {
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      latlng: `${latLng.lat},${latLng.lng}`,
      language: Language.ja,
    },
  };
  const res = await client.reverseGeocode(args).then((res) => res.data);

  if (res.status.toLowerCase() !== "ok") {
    throw new Error(res.error_message);
  }

  const result = res.results[0];
  // typeにpremiseかsubpremiseが含まれていれば、正確な位置情報として扱う
  const isLocationReliable = result.address_components[0].types.some(
    (type) => type === "premise" || type === "subpremise"
  );

  return {
    address: result.formatted_address,
    isLocationReliable,
  };
};

export const getPlaceDetails = async (placeId: string) => {
  const args: PlaceDetailsRequest = {
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      place_id: placeId,
      fields: SELECTED_FIELDS,
      language: Language.ja,
    },
  };
  const res = await client.placeDetails(args).then((res) => res.data);

  if (res.status.toLowerCase() !== "ok") {
    throw new Error(res.error_message);
  }

  return {
    places: [res.result],
    nextPageToken: undefined,
  };
};

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

export const getPlaceSuggestionsByText = async (
  query: string,
  nextPageToken?: string,
  searchType?: TripRoutePointPlaceType
) => {
  const args: TextSearchRequest = {
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      query,
      language: Language.ja,
      pagetoken: nextPageToken,
      type: searchType ? searchTypeToPlaceTypeMap[searchType] : undefined,
    },
  };

  const res = await client.textSearch(args).then((res) => res.data);

  if (res.status.toLowerCase() !== "ok") {
    throw new Error(res.error_message);
  }

  return {
    places: res.results,
    nextPageToken: res.next_page_token,
    error: res.status.toLowerCase() !== "ok" ? res.error_message : undefined,
  };
};

export const getPlaceSuggestionsByLocation = async (
  searchLocation: { lat: number; lng: number },
  nextPageToken?: string,
  searchType?: TripRoutePointPlaceType
) => {
  const args: PlacesNearbyRequest = {
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      location: `${searchLocation.lat},${searchLocation.lng}`,
      radius: 5000,
      language: Language.ja,
      pagetoken: nextPageToken,
      type: searchType ? searchTypeToPlaceTypeMap[searchType] : undefined,
    },
  };

  const res = await client.placesNearby(args).then((res) => res.data);

  if (res.status.toLowerCase() !== "ok") {
    throw new Error(res.error_message);
  }

  return {
    places: res.results,
    nextPageToken: res.next_page_token,
    error: res.status.toLowerCase() !== "ok" ? res.error_message : undefined,
  };
};

export const getPlacePhoto = (photoReference: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  return url;
};
