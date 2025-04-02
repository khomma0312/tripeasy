import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { TripRoutePointPlaceType } from "@/features/trips/types";

const searchPlaceTypeAtom = atom<TripRoutePointPlaceType | undefined>(
  undefined
);

export const useSearchPlaceTypeAtom = () => useAtom(searchPlaceTypeAtom);
export const useSearchPlaceTypeAtomValue = () =>
  useAtomValue(searchPlaceTypeAtom);
export const useSearchPlaceTypeSetAtom = () => useSetAtom(searchPlaceTypeAtom);
