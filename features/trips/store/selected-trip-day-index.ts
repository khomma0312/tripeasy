import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// 選択された日付のインデックスを保持するアトム
const selectedTripDayIndexAtom = atom<number | undefined>(undefined);
export const useSelectedTripDayIndexAtom = () =>
  useAtom(selectedTripDayIndexAtom);
export const useSelectedTripDayIndexAtomValue = () =>
  useAtomValue(selectedTripDayIndexAtom);
export const useSelectedTripDayIndexSetAtom = () =>
  useSetAtom(selectedTripDayIndexAtom);
