import Image from "next/image";
import { Accommodation } from "@/features/accommodations/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Calendar,
  DollarSign,
  ExternalLink,
  Phone,
  FileText,
} from "lucide-react";
import { formatDateWithSlash } from "@/utils/common";
import noImage from "#/no-image.png";

type Props = {
  accommodation: Accommodation;
};

export const AccommodationDetailCard = ({ accommodation }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative h-64">
        <Image
          src={accommodation.image ? accommodation.image : noImage}
          alt={accommodation.name}
          layout="fill"
          objectFit="cover"
        />
        <CardTitle className="absolute bottom-4 left-4 text-3xl font-bold text-white bg-black bg-opacity-50 p-2 rounded">
          {accommodation.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-gray-500" />
              {formatDateWithSlash(accommodation.checkIn)} -{" "}
              {formatDateWithSlash(accommodation.checkOut)}
            </p>
            {accommodation.reservationPrice && (
              <p className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                {accommodation.reservationPrice.toLocaleString()}円
              </p>
            )}
          </div>
          <div className="space-y-4">
            <p>
              <strong>住所:</strong> {accommodation.address}
            </p>
            {accommodation.phoneNumber && (
              <p className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-500" />
                <a
                  href={`tel:${accommodation.phoneNumber}`}
                  className="text-blue-500 hover:underline"
                >
                  {accommodation.phoneNumber}
                </a>
              </p>
            )}
            <p>
              <strong>備考:</strong> {accommodation.notes}
            </p>
            <p>
              <strong>予約番号:</strong> {accommodation.bookingId}
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {accommodation.bookingUrl && (
            <a
              href={accommodation.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileText className="mr-2 h-5 w-5" />
              予約内容を確認する
            </a>
          )}
          {accommodation.tripAdvisorUrl && (
            <a
              href={accommodation.tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              TripAdvisorで詳細を見る
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
