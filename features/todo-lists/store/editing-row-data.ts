import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export type EditingRowData = {
  title: string;
  dueDate?: Date | undefined;
} | null;

const editingRowDataAtom = atom<EditingRowData>(null);
export const useEditingRowDataAtom = () => useAtom(editingRowDataAtom);
export const useEditingRowDataAtomValue = () =>
  useAtomValue(editingRowDataAtom);
export const useEditingRowDataSetAtom = () => useSetAtom(editingRowDataAtom);
