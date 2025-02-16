import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export type DirectionsLeg = google.maps.DirectionsLeg;
export type DirectionsLegs = DirectionsLeg[] | undefined;

// DirectionsLegsを保持するアトム
const directionsLegsAtom = atom<DirectionsLegs>(undefined);
export const useDirectionsLegsAtom = () => useAtom(directionsLegsAtom);
export const useDirectionsLegsAtomValue = () =>
  useAtomValue(directionsLegsAtom);
export const useDirectionsLegsSetAtom = () => useSetAtom(directionsLegsAtom);
