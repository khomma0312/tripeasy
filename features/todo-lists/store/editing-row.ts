import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export type EditingRow = number | null;

const editingRowAtom = atom<EditingRow>(null);
export const useEditingRowAtom = () => useAtom(editingRowAtom);
export const useEditingRowAtomValue = () => useAtomValue(editingRowAtom);
export const useEditingRowSetAtom = () => useSetAtom(editingRowAtom);
