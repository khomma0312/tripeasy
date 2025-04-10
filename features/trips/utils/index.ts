import { dateFormatStrForParse, timeFormatStrForParse } from "@/consts/common";
import { differenceInMinutes, parse } from "date-fns";

export const convertTimeToDate = (baseDate: Date, time: string) => {
  // baseDateから年月日を取得
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth() + 1;
  const day = baseDate.getDate();

  // hh:mm:ssの形式になっていない場合はフォーマットする
  const timeArray = time.split(":");
  const hour = timeArray[0] ?? "00";
  const minute = timeArray[1] ?? "00";
  const second = timeArray[2] ?? "00";

  const formattedTime = `${hour}:${minute}:${second}`;

  return parse(
    `${year}-${month}-${day} ${formattedTime}`,
    `${dateFormatStrForParse} ${timeFormatStrForParse}`,
    baseDate
  );
};

// 前の時間と後の時間から差分の時間(分)を計算する関数
export const getDiffInMinutes = (
  earlierTime: string,
  laterTime: string
): number => {
  const earlier = convertTimeToDate(new Date(), earlierTime);
  const later = convertTimeToDate(new Date(), laterTime);

  // 分単位での差分を計算
  return differenceInMinutes(later, earlier);
};

export const getTripDayIndex = (dayOrder: number | undefined) => {
  return dayOrder ? dayOrder - 1 : undefined;
};
