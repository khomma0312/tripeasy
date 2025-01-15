import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/card";
import { AccommodationForCard } from "@/features/accommodations/types";
import { format } from "date-fns";
import { dateFormatStrForFormat } from "@/consts/common";

type Props = {
  accommodation: AccommodationForCard;
};

export const AccommodationCard = ({ accommodation }: Props) => {
  return (
    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-100">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        <Image
          src={accommodation.image}
          alt={accommodation.name}
          width={400}
          height={200}
          className="w-full h-32 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{accommodation.name}</h3>
        <div className="space-y-2 mb-4">
          <p className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {accommodation.address}
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            {format(
              new Date(accommodation.checkIn),
              dateFormatStrForFormat
            )} -{" "}
            {format(new Date(accommodation.checkOut), dateFormatStrForFormat)}
          </p>
          <p className="flex items-center text-sm font-semibold">
            <ExternalLink className="w-4 h-4 mr-2 text-gray-400" />
            <a
              href={accommodation.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              予約サイトで確認
            </a>
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-dashed border-gray-300 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            予約番号: {accommodation.bookingId ?? "登録なし"}
          </div>
          <Link
            href={`/accommodations/${accommodation.id}`}
            className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            詳細を見る
          </Link>
        </div>
      </CardContent>
      <div className="absolute top-1/2 -left-2 w-4 h-8 bg-background rounded-r-full"></div>
      <div className="absolute top-1/2 -right-2 w-4 h-8 bg-background rounded-l-full"></div>
    </Card>
  );
};
