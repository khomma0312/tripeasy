import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Star, MessageSquare, Plane } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { AccommodationForSearchResult } from "../../types";
import noImage from "#/no-image.png";
import { useCallback } from "react";

type Props = {
  accommodation: AccommodationForSearchResult;
};

export const SearchResultCard = ({ accommodation }: Props) => {
  const router = useRouter();

  const handleRegister = useCallback(
    (accommodation: AccommodationForSearchResult) => {
      // 選択された宿泊施設の情報を新規登録ページに渡します
      router.push(
        `/accommodations/new?data=${encodeURIComponent(
          JSON.stringify(accommodation)
        )}`
      );
    },
    [accommodation]
  );

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-48 relative overflow-hidden">
        <Image
          src={accommodation.hotelImageUrl || noImage}
          alt={accommodation.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{accommodation.name}</h3>
        <p className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {accommodation.address}
        </p>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="font-semibold mr-2">
            {accommodation.reviewAverage}
          </span>
          <MessageSquare className="w-4 h-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-600">
            {accommodation.reviewCount} レビュー
          </span>
        </div>
        <a
          href={accommodation.informationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-600 hover:underline mb-4"
        >
          <Plane className="w-4 h-4 mr-1" />
          楽天トラベルで見る
        </a>
        <div className="mt-auto pt-4">
          <Button
            onClick={() => handleRegister(accommodation)}
            className="w-full"
          >
            宿泊施設の予約情報として登録する
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
