import { Hono } from "hono";
import { getLogger } from "@/lib/logger";
import { ApiErrorType } from "@/lib/zod/schema/common";
import {
  getPlaceDetails,
  getPlacePhoto,
  getPlaceSuggestions,
} from "@/services/api/externals/server/google-maps/fetcher";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { ApiSearchGetOutputType } from "@/lib/zod/schema/destinations";

const logger = getLogger("api/destinations");

const app = new Hono().get("/search", async (c) => {
  const searchTerm = c.req.query("searchTerm");
  const pageTokenForRequest = c.req.query("nextPageToken");
  const searchByPlaceIdStr = c.req.query("searchByPlaceId");
  const searchByPlaceId = searchByPlaceIdStr === "true";
  let result: Partial<PlaceData>[] | null = null;
  let nextPageToken: string | undefined = undefined;

  if (!searchTerm) {
    return c.json<ApiErrorType>(
      {
        message: "検索クエリに正しい値を入力してください",
      },
      400
    );
  }

  try {
    if (searchByPlaceId) {
      const { places, nextPageToken: pageToken } = await getPlaceDetails(
        searchTerm
      );
      result = places;
      nextPageToken = pageToken;
    } else {
      const { places, nextPageToken: pageToken } = await getPlaceSuggestions(
        searchTerm,
        pageTokenForRequest
      );
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
});

export default app;
