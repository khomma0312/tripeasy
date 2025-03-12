import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// 選択された旅行日IDを管理するアトム
const selectedTripDayIdForRegisterAtom = atom<number>(0);
export const useSelectedTripDayIdForRegisterAtom = () =>
  useAtom(selectedTripDayIdForRegisterAtom);
export const useSelectedTripDayIdForRegisterAtomValue = () =>
  useAtomValue(selectedTripDayIdForRegisterAtom);
export const useSelectedTripDayIdForRegisterSetAtom = () =>
  useSetAtom(selectedTripDayIdForRegisterAtom);
