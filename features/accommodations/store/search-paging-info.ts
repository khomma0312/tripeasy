import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export type SearchPagingInfo = {
  pageCount: number | undefined;
  currentPage: number | undefined;
};

const initialValue: SearchPagingInfo = {
  pageCount: undefined,
  currentPage: undefined,
};

const searchPagingInfoAtom = atom<SearchPagingInfo>(initialValue);
export const useSearchPagingInfoAtom = () => useAtom(searchPagingInfoAtom);
export const useSearchPagingInfoAtomValue = () =>
  useAtomValue(searchPagingInfoAtom);
export const useSearchPagingInfoSetAtom = () =>
  useSetAtom(searchPagingInfoAtom);
