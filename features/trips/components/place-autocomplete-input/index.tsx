import {
  useEffect,
  useRef,
  useState,
  ComponentPropsWithoutRef,
  forwardRef,
  memo,
} from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/shadcn/input";

type PlaceAutocompleteInputProps = ComponentPropsWithoutRef<typeof Input> & {
  onChange: (event: CustomInputEvent) => void;
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTypes?: string[];
};

// カスタムイベントの型を定義
export interface CustomInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    displayValue?: string;
    isPlaceIdSelected: boolean;
  };
}

const DEFAULT_TYPES = ["tourist_attraction", "point_of_interest"];

export const PlaceAutocompleteInput = memo(
  forwardRef<HTMLInputElement, PlaceAutocompleteInputProps>(
    ({ className, onChange, onBlur, searchTypes, ...props }, ref) => {
      const placesLibrary = useMapsLibrary("places");
      const inputRef = useRef<HTMLInputElement>(null);
      const [autocomplete, setAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);

      useEffect(() => {
        if (!placesLibrary || !inputRef.current) return;

        const autocompleteInstance = new placesLibrary.Autocomplete(
          inputRef.current,
          {
            fields: ["place_id", "geometry", "name", "formatted_address"],
            types: searchTypes || DEFAULT_TYPES,
          }
        );

        autocompleteInstance.addListener("place_changed", () => {
          const place = autocompleteInstance.getPlace();

          if (onChange) {
            const event = {
              target: {
                value: place.place_id || "",
                displayValue: place.formatted_address || "",
                isPlaceIdSelected: true,
              },
            } as CustomInputEvent;
            onChange(event);
          }
        });

        setAutocomplete(autocompleteInstance);

        return () => {
          if (autocomplete) {
            google.maps.event.clearInstanceListeners(autocomplete);
          }
        };
      }, [placesLibrary]);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          const event = {
            target: {
              value: e.target.value,
              isPlaceIdSelected: false, // 手動入力フラグ
            },
          } as CustomInputEvent;
          onChange(event);
        }
      };

      const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onBlur) {
          onBlur(e);
        }
      };

      return (
        <Input
          ref={inputRef}
          className={className}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          {...props}
        />
      );
    }
  )
);
