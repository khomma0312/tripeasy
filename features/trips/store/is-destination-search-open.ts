import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const isDestinationSearchOpenAtom = atom<boolean>(false);

export const useIsDestinationSearchOpenAtom = () =>
  useAtom(isDestinationSearchOpenAtom);
export const useIsDestinationSearchOpenAtomValue = () =>
  useAtomValue(isDestinationSearchOpenAtom);
export const useIsDestinationSearchOpenSetAtom = () =>
  useSetAtom(isDestinationSearchOpenAtom);
