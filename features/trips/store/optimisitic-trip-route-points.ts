import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { TripRoutePoint } from "@/features/trips/types";

const optimisticTripRoutePointsAtom = atom<TripRoutePoint[] | undefined>(
  undefined
);

export const useOptimisticTripRoutePointsAtom = (
  defaultValues?: TripRoutePoint[]
) => {
  const [value, setValue] = useAtom(optimisticTripRoutePointsAtom);
  if (defaultValues !== undefined && value === undefined) {
    setValue(defaultValues);
  }
  return [value, setValue] as const;
};

export const useOptimisticTripRoutePointsAtomValue = () =>
  useAtomValue(optimisticTripRoutePointsAtom);
export const useOptimisticTripRoutePointsSetAtom = () =>
  useSetAtom(optimisticTripRoutePointsAtom);
