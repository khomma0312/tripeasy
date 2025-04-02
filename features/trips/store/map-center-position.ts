import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const mapCenterPositionAtom = atom<{ lat: number; lng: number } | undefined>(
  undefined
);

export const useMapCenterPositionAtom = () => useAtom(mapCenterPositionAtom);
export const useMapCenterPositionAtomValue = () =>
  useAtomValue(mapCenterPositionAtom);
export const useMapCenterPositionSetAtom = () =>
  useSetAtom(mapCenterPositionAtom);
