import { Hono } from "hono";
import { getLogger } from "@/lib/logger";
import {
  getPlaceDetails,
  getPlacePhoto,
} from "@/services/api/externals/server/google-maps/fetcher";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import {
  apiSearchGetInputSchema,
  ApiSearchGetOutputType,
} from "@/lib/zod/schema/destinations";
import { zValidator } from "@hono/zod-validator";
import { getPlaceSuggestions } from "@/services/api/externals/server/common/fetcher";

const logger = getLogger("api/destinations");

const app = new Hono().get(
  "/search",
  zValidator("query", apiSearchGetInputSchema),
  async (c) => {
    const {
      searchTerm,
      nextPageToken: pageTokenForRequest,
      searchByPlaceId: searchByPlaceIdStr,
      searchLocationLat,
      searchLocationLng,
      searchType,
    } = c.req.valid("query");
    const searchByPlaceId = searchByPlaceIdStr === "true";
    let result: Partial<PlaceData>[] | null = null;
    let nextPageToken: string | undefined = undefined;
    const searchLocation =
      searchLocationLat && searchLocationLng
        ? {
            lat: Number(searchLocationLat),
            lng: Number(searchLocationLng),
          }
        : undefined;

    try {
      if (searchByPlaceId) {
        const { places, nextPageToken: pageToken } = await getPlaceDetails(
          searchTerm
        );
        result = places;
        nextPageToken = pageToken;
      } else {
        const { places, nextPageToken: pageToken } = await getPlaceSuggestions({
          query: searchTerm,
          nextPageToken: pageTokenForRequest,
          searchType,
          searchLocation,
        });
        result = places;
        nextPageToken = pageToken;
      }
    } catch (e) {
      logger.error(e);
      // エラーが発生した場合は空の配列を返す
      return c.json<ApiSearchGetOutputType>(
        { destinations: [], nextPageToken: undefined },
        200
      );
    }

    const destinations = result.map((place) => ({
      name: place.name || "",
      address: place.formatted_address || "",
      imageUrl: place.photos?.[0]?.photo_reference
        ? getPlacePhoto(place.photos[0].photo_reference)
        : "",
      placeId: place.place_id || "",
      latLng: {
        lat: place.geometry?.location.lat || 0,
        lng: place.geometry?.location.lng || 0,
      },
    }));

    return c.json<ApiSearchGetOutputType>({
      destinations,
      nextPageToken,
    });
  }
);

export default app;
