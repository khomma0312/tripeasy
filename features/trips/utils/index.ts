import { dateFormatStrForParse, timeFormatStrForParse } from "@/consts/common";
import { parse } from "date-fns";

export const convertTimeToDate = (baseDate: Date, time: string) => {
  // baseDateから年月日を取得
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth() + 1;
  const day = baseDate.getDate();

  return parse(
    `${year}-${month}-${day} ${time}`,
    `${dateFormatStrForParse} ${timeFormatStrForParse}`,
    baseDate
  );
};
