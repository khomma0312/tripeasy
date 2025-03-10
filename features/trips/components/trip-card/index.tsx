import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/card";
import { TripForList } from "@/features/trips/types";
import { format } from "date-fns";
import { dateFormatStrForFormat } from "@/consts/common";
import { cn } from "@/utils/common";
import { useDeleteTrip } from "@/features/trips/hooks/use-delete-trip";
import { TripDeleteButton } from "@/features/trips/components/trip-delete-button";

type Props = {
  trip: TripForList;
};

export const TripCard = ({ trip }: Props) => {
  const { onSubmit } = useDeleteTrip(trip.id);

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-100 border-t-8 border-t-primary",
        !trip.image && "pt-5" // 余白の調整
      )}
    >
      <div className="relative">
        {trip.image && (
          <div>
            <Image
              src={trip.image}
              alt={trip.title}
              width={400}
              height={200}
              className="w-full h-32 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
        <div className="space-y-2 mb-4">
          <p className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {trip.destination}
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            {format(new Date(trip.startDate), dateFormatStrForFormat)} -{" "}
            {format(new Date(trip.endDate), dateFormatStrForFormat)}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-dashed border-gray-300 flex justify-end gap-2 items-center">
          <Link
            href={`/trips/${trip.id}`}
            className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            詳細を見る
          </Link>
          <TripDeleteButton
            onDelete={() => onSubmit(trip.id)}
            className="rounded-full"
          />
        </div>
      </CardContent>
      <div className="absolute top-1/2 -left-2 w-4 h-8 bg-background rounded-r-full"></div>
      <div className="absolute top-1/2 -right-2 w-4 h-8 bg-background rounded-l-full"></div>
    </Card>
  );
};
