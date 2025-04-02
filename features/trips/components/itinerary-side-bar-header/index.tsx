import { Trip } from "@/features/trips/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/button";
import { ArrowLeft } from "lucide-react";
import { Edit2 } from "lucide-react";
import { format } from "date-fns";

type Props = {
  trip: Trip;
};

export const ItinerarySideBarHeader = ({ trip }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-gray-900 text-white px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-black"
            onClick={() => router.push("/trips")}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">{trip.title}</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-black"
        >
          <Edit2 className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex justify-between items-center py-2">
        <p className="text-sm font-semibold">
          {format(new Date(trip.startDate), "yyyy/MM/dd")} -{" "}
          {format(new Date(trip.endDate), "yyyy/MM/dd")}
        </p>
      </div>
    </div>
  );
};
