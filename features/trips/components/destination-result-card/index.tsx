import { Destination } from "@/features/trips/types";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { useSelectedDestinationSetAtom } from "@/features/trips/store/selected-destination";
import { ButtonWithTripRoutePointRegisterFormDialog } from "../button-with-trip-route-point-register-form-dialog";

type Props = {
  destination: Destination;
};

export const DestinationResultCard = ({ destination }: Props) => {
  const setSelectedDestination = useSelectedDestinationSetAtom();

  return (
    <Card className="rounded-sm shadow-md">
      <CardContent className="p-3">
        <div className="grid grid-cols-[100px_1fr] p-2">
          <div>
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={destination.imageUrl || "/no-image.png"}
                alt={destination.name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">{destination.name}</h3>
            <p className="text-sm text-gray-600">{destination.address}</p>
          </div>
        </div>
        <div>
          <ul className="flex justify-between items-center gap-1 text-sm text-gray-600">
            <li>
              <Link
                href={`https://www.google.com/maps/place/?q=place_id:${destination.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="size-4" />
                  Google Mapで見る
                </Button>
              </Link>
            </li>
            <li>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  setSelectedDestination(destination);
                }}
              >
                <MapPin className="size-4" />
                マップで位置を確認
              </Button>
            </li>
            <li>
              <ButtonWithTripRoutePointRegisterFormDialog
                name={destination.name}
                address={destination.address}
                latLng={destination.latLng}
                imageUrl={destination.imageUrl}
                buttonSize="sm"
                className="flex items-center gap-1"
              />
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
