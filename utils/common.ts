import { dateFormatStrForFormat } from "@/consts/common";
import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUUID = (uuid: string) => {
  // UUIDの正規表現パターン
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(uuid);
};

export const formatDateWithSlash = (date: string | Date) => {
  const targetDate = new Date(date);
  return format(new Date(targetDate), dateFormatStrForFormat);
};

export const formatDateRange = (
  startDate: string | Date,
  endDate: string | Date
) => {
  return `${formatDateWithSlash(startDate)} - ${formatDateWithSlash(endDate)}`;
};

export const generateRandomKey = () => {
  return Math.random().toString(36);
};
