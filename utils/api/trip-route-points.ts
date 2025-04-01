import { db } from "@/lib/drizzle/db";
import { eq, inArray, sql } from "drizzle-orm";
import {
  tripRoutePoints as tripRoutePointsTable,
  destinations as destinationsTable,
  accommodations as accommodationsTable,
  tripDaySegments as tripDaySegmentsTable,
} from "@/schema";
import { convertTimeToDate } from "@/features/trips/utils";
import { TripRoutePointAccommodationInputValues } from "@/features/trips/types";
import {
  getAddressFromLatLng,
  getLatLngFromAddress,
} from "@/services/api/externals/server/google-maps/fetcher";

type DestinationInputValues = {
  name: string;
  address: string;
  latLng?:
    | {
        x: number;
        y: number;
      }
    | undefined;
  imageUrl?: string | undefined;
};

type TripRoutePointInputValues = {
  arrivalTime: string;
  departureTime: string;
  userId: string;
  destinationId?: number;
  accommodationId?: number;
  tripDaySegmentId: number;
  visitOrder: number;
};

type TripRoutePointVisitOrder = {
  id: number | null;
  arrivalTime: Date;
  visitOrder: number;
};

export const calculateNewRoutePointVisitOrder = async (
  tripDayId: number,
  arrivalTime: string
) => {
  const savedTripRoutePoints = await db
    .select()
    .from(tripRoutePointsTable)
    .where(eq(tripRoutePointsTable.tripDaySegmentId, tripDayId));

  const tripRoutePointVisitOrders = savedTripRoutePoints.map(
    (tripRoutePoint) => ({
      id: tripRoutePoint.id,
      arrivalTime: convertTimeToDate(new Date(), tripRoutePoint.arrivalTime),
      visitOrder: tripRoutePoint.visitOrder,
    })
  );

  const newTripRoutePoint: TripRoutePointVisitOrder = {
    id: null,
    arrivalTime: convertTimeToDate(new Date(), `${arrivalTime}:00`),
    visitOrder: 0,
  };

  // 新規tripRoutePointを追加して、arrivalTimeの早い順にvisitOrderを振り直す
  const sortedTripRoutePointVisitOrders = [
    newTripRoutePoint,
    ...tripRoutePointVisitOrders,
  ]
    .sort((a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime())
    .map((tripRoutePoint, index) => ({
      ...tripRoutePoint,
      visitOrder: index + 1,
    }));

  const newVisitOrder = sortedTripRoutePointVisitOrders.find(
    (tripRoutePoint) => tripRoutePoint.id === null
  )?.visitOrder;

  if (!newVisitOrder) {
    throw new Error("visitOrderが取得できませんでした");
  }

  return { newVisitOrder, sortedTripRoutePointVisitOrders };
};

export const addNewDestination = async (
  destination: DestinationInputValues,
  userId: string
) => {
  // name, address, latLngからdestinationを作成
  const [addedDestination] = await db
    .insert(destinationsTable)
    .values({
      ...destination,
      userId,
    })
    .returning({ id: destinationsTable.id });

  return addedDestination;
};

export const addNewAccommodation = async (
  accommodation: TripRoutePointAccommodationInputValues,
  userId: string
) => {
  let latLng: { x: number; y: number } | undefined = undefined;
  let address: string | undefined = undefined;

  const {
    name,
    latLng: latLngInput,
    address: addressInput,
    imageUrl,
    arrivalTime,
    departureTime,
    tripDayId,
  } = accommodation;

  // tripDayIdからtripDayを取得
  const [tripDay] = await db
    .select({
      dayDate: tripDaySegmentsTable.dayDate,
    })
    .from(tripDaySegmentsTable)
    .where(eq(tripDaySegmentsTable.id, tripDayId));

  const checkIn = `${tripDay.dayDate} ${arrivalTime}:00`;
  const checkOut = `${tripDay.dayDate} ${departureTime}:00`;

  // latLngから住所を取得
  if (addressInput) {
    address = addressInput;
  } else if (latLngInput) {
    const result = await getAddressFromLatLng(latLngInput);
    if (result.isLocationReliable) {
      address = result.address;
    }
  }

  if (latLngInput) {
    latLng = { x: latLngInput.lng, y: latLngInput.lat };
  } else if (address) {
    const result = await getLatLngFromAddress(address);
    if (result.isLocationReliable) {
      latLng = { x: result.lng, y: result.lat };
    }
  }

  const [addedAccommodation] = await db
    .insert(accommodationsTable)
    .values({
      name: name ?? "",
      address: address ?? "",
      latLng,
      image: imageUrl ?? "",
      userId,
      checkIn,
      checkOut,
    })
    .returning({ id: accommodationsTable.id });

  return addedAccommodation;
};

export const addNewTripRoutePoint = async (
  tripRoutePoint: TripRoutePointInputValues
) => {
  const [addedTripRoutePoint] = await db
    .insert(tripRoutePointsTable)
    .values({
      ...tripRoutePoint,
    })
    .returning({ id: tripRoutePointsTable.id });

  return addedTripRoutePoint;
};

export const updateTripRoutePointVisitOrder = async (
  tripRoutePointVisitOrders: TripRoutePointVisitOrder[]
) => {
  const updatedVisitOrders = tripRoutePointVisitOrders.filter(
    (point) => point.id !== null
  );

  if (updatedVisitOrders.length > 0) {
    const ids = tripRoutePointVisitOrders
      .map((item) => item.id)
      .filter((id) => id !== null);

    // 既存のvisitOrderを更新する
    let caseExpression = sql`CASE `;
    updatedVisitOrders.forEach((item) => {
      caseExpression = sql`${caseExpression} WHEN ${tripRoutePointsTable.id} = ${item.id} THEN ${item.visitOrder}`;
    });
    caseExpression = sql`${caseExpression} ELSE ${tripRoutePointsTable.visitOrder} END`;
    await db
      .update(tripRoutePointsTable)
      .set({
        visitOrder: caseExpression,
      })
      .where(inArray(tripRoutePointsTable.id, ids));
  }
};
