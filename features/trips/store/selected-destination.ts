import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Destination } from "../types";

const selectedDestinationAtom = atom<Destination | null>(null);

export const useSelectedDestinationAtom = () =>
  useAtom(selectedDestinationAtom);
export const useSelectedDestinationAtomValue = () =>
  useAtomValue(selectedDestinationAtom);
export const useSelectedDestinationSetAtom = () =>
  useSetAtom(selectedDestinationAtom);
