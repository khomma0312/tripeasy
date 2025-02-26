import { Fragment, useEffect } from "react";
import { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoaderCircle } from "lucide-react";
import { GetDestinationsSearch200 } from "@/services/api/custom/model";
import { DestinationResultCard } from "@/features/trips/components/destination-result-card";

type Props = {
  pages: InfiniteData<GetDestinationsSearch200>["pages"];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const DestinationSearchResults = ({
  pages,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="flex flex-col gap-3 overflow-y-scroll h-[calc(100vh-100px)]">
      {pages[0].destinations.length === 0 && (
        <div className="text-center mt-5">ヒットした結果がありません</div>
      )}
      {pages.map((group, i) => (
        <Fragment key={i}>
          {group.destinations.map((destination) => (
            <DestinationResultCard
              key={destination.placeId}
              destination={destination}
            />
          ))}
        </Fragment>
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center items-center">
          <LoaderCircle className="size-10 animate-spin" />
        </div>
      )}

      <div style={{ visibility: "hidden", height: 0 }} ref={ref} />
    </div>
  );
};
