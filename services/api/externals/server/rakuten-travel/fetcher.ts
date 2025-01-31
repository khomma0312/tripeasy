import axios from "axios";
import { rakutenApiUrl } from "./consts";
import { getSearchParams } from "./utils";
import { HotelSearchResponse } from "./models";

export const getAccommodationSuggestionsByQuery = async (query: {
  lat: number;
  lng: number;
  page: number;
}) => {
  const searchParams = getSearchParams(query);
  const res: HotelSearchResponse = await axios.get(
    `${rakutenApiUrl}&${searchParams.toString()}`
  );

  return res.data;
};
