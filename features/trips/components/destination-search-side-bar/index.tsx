import { DestinationSearchFormFieldValues } from "@/features/trips/types";
import { destinationSearchFormSchema } from "@/lib/zod/schema/destinations";
import { Suspense, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/shadcn/button";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { useIsDestinationSearchOpenSetAtom } from "@/features/trips/store/is-destination-search-open";
import { DestinationSearchResultsContainer } from "@/features/trips/components/destination-search-results-container";
import {
  CustomInputEvent,
  PlaceAutocompleteInput,
} from "@/features/trips/components/place-autocomplete-input";
import { CenteredLoaderCircle } from "@/components/shared/centered-loader-circle";
import { HandleError } from "@/components/shared/handle-error";
import { useMapCenterPositionAtomValue } from "@/features/trips/store/map-center-position";
import { useSearchPlaceTypeAtom } from "../../store/search-place-type";

export const DestinationSearchSideBar = () => {
  const isPlaceIdSelected = useRef(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const mapCenterPosition = useMapCenterPositionAtomValue();

  const setIsDestinationSearchOpen = useIsDestinationSearchOpenSetAtom();
  const [searchType, setSearchPlaceType] = useSearchPlaceTypeAtom();

  const form = useForm<DestinationSearchFormFieldValues>({
    resolver: zodResolver(destinationSearchFormSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const isDestinationSearchValid = Boolean(
    searchType === "destination" && searchTerm
  );
  const isAccommodationSearchValid = Boolean(
    searchType === "accommodation" && (searchTerm || mapCenterPosition)
  );

  const handleInputChange = useCallback(
    (event: CustomInputEvent, onChange: (...event: any[]) => void) => {
      isPlaceIdSelected.current = event.target.isPlaceIdSelected;
      onChange(event);
    },
    []
  );

  const onSubmit = (data: DestinationSearchFormFieldValues) => {
    // searchTermにはplaceIdか、ユーザーが入力した文字列が入る
    setSearchTerm(data.searchTerm);
  };

  return (
    <div className="flex flex-col gap-3 min-h-screen p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setIsDestinationSearchOpen(false);
                setSearchPlaceType(undefined);
              }}
              className="p-2"
            >
              <ArrowLeftIcon className="size-4" />
            </Button>
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field: { value, onChange, ...rest } }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      <PlaceAutocompleteInput
                        {...rest}
                        onChange={(event: CustomInputEvent) =>
                          handleInputChange(event, onChange)
                        }
                        id="searchTerm"
                        type="text"
                        placeholder="目的地を検索"
                      />
                      <Button
                        variant="ghost"
                        type="submit"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:bg-transparent"
                      >
                        <SearchIcon />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      {/* 検索結果 */}
      {(isDestinationSearchValid || isAccommodationSearchValid) && (
        <HandleError>
          <Suspense fallback={<CenteredLoaderCircle />}>
            <DestinationSearchResultsContainer
              searchTerm={searchTerm}
              searchByPlaceId={isPlaceIdSelected.current}
              searchLocation={mapCenterPosition}
            />
          </Suspense>
        </HandleError>
      )}
    </div>
  );
};
