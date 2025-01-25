import { GetTrips200 } from "@/services/api/model";
import { Trip } from "../types";
import { parse } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";

export const convertDataTypesToMatchTrips = (data: GetTrips200): Trip[] => {
  const trips: Trip[] = data.trips.map((trip) => ({
    ...trip,
    startDate: trip.startDate
      ? parse(trip.startDate, dateFormatStrForParse, new Date())
      : undefined,
    endDate: trip.endDate
      ? parse(trip.endDate, dateFormatStrForParse, new Date())
      : undefined,
  }));
  return trips;
};
