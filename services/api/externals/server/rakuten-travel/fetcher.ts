import axios from "axios";
import { rakutenApiUrl } from "./consts";
import { getSearchParams } from "./utils";
import { HotelSearchResponse } from "./models";

export const getAccommodationSuggestionsByLatLng = async (
  lat: number,
  lng: number
) => {
  const searchParams = getSearchParams(lat, lng);
  const res: HotelSearchResponse = await axios.get(
    `${rakutenApiUrl}&${searchParams.toString()}`
  );

  return res.data;
};
