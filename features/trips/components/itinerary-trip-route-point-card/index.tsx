import { Card, CardContent } from "@/components/shadcn/card";
import { TripRoutePoint } from "@/features/trips/types";
import { differenceInMinutes, format } from "date-fns";
import { ArrowDownUp, Trash2 } from "lucide-react";
import Image from "next/image";
import { convertTimeToDate } from "../../utils";
import { Button } from "@/components/shadcn/button";
import { forwardRef } from "react";

type Props = {
  tripRoutePoint: TripRoutePoint;
  itineraryDayDate: Date;
  style: {
    transform: string | undefined;
    transition: string | undefined;
  };
};

export const ItineraryTripRoutePointCard = forwardRef<HTMLDivElement, Props>(
  ({ tripRoutePoint, itineraryDayDate, ...props }: Props, ref) => {
    const { name, address, arrivalTime, departureTime, visitOrder, imageUrl } =
      tripRoutePoint;

    const arrivalTimeDate = convertTimeToDate(itineraryDayDate, arrivalTime);
    const departureTimeDate = convertTimeToDate(
      itineraryDayDate,
      departureTime
    );

    const diffMinutes = differenceInMinutes(departureTimeDate, arrivalTimeDate);

    const stayingHours = Math.floor(diffMinutes / 60);
    const stayingMinutes = diffMinutes % 60;

    const stayingPeriod = stayingHours
      ? `${stayingHours}時間${stayingMinutes}分`
      : `${stayingMinutes}分`;

    return (
      <Card {...props} ref={ref} className="rounded-sm shadow-md relative">
        <CardContent className="grid grid-cols-[100px_1fr] p-4">
          <div>
            <div className="relative">
              <span className="absolute -top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {visitOrder}
              </span>
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl ?? "/no-image.png"}
                  alt={name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-primary text-sm font-bold">
              <span>滞在時間: {stayingPeriod}</span>
              {" | "}
              <span>
                {format(arrivalTimeDate, "HH:mm")}-
                {format(departureTimeDate, "HH:mm")}
              </span>
            </div>
            <div>
              <h5 className="font-semibold">{name}</h5>
              {address && <p className="text-sm text-gray-600">{address}</p>}
            </div>
            <div>
              <ul className="flex justify-end items-center gap-1 text-sm text-gray-600">
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowDownUp className="size-4" />
                    移動
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-600"
                  >
                    <Trash2 className="size-4" />
                    削除
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ItineraryTripRoutePointCard.displayName = "ItineraryTripRoutePointCard";
