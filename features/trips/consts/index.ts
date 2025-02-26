import colors from "tailwindcss/colors";
import { tv } from "tailwind-variants";

export const colorNames = [
  "primary",
  "amber",
  "yellow",
  "lime",
  "green",
  "cyan",
  "sky",
  "purple",
  "pink",
  "rose",
] as const;

const bgColorForTripDayVariants = tv({
  variants: {
    color: {
      primary: "bg-primary",
      amber: "bg-amber-500",
      yellow: "bg-yellow-500",
      lime: "bg-lime-500",
      green: "bg-green-500",
      cyan: "bg-cyan-500",
      sky: "bg-purple-500",
      purple: "bg-pink-500",
      pink: "bg-rose-500",
      rose: "bg-sky-500",
    },
  },
});

const colorsForTripDay = {
  primary: "hsl(var(--primary))",
  amber: colors.amber[500],
  yellow: colors.yellow[500],
  lime: colors.lime[500],
  green: colors.green[500],
  cyan: colors.cyan[500],
  sky: colors.sky[500],
  purple: colors.purple[500],
  pink: colors.pink[500],
  rose: colors.rose[500],
};

export const getColorForTripDay = (colorIndex: number) => {
  if (colorIndex < 0 || colorIndex >= colorNames.length)
    return colorsForTripDay.primary;

  const colorName = colorNames[colorIndex];
  return colorsForTripDay[colorName];
};

export const getBgColorForTripDay = (colorIndex: number) => {
  if (colorIndex < 0 || colorIndex >= colorNames.length)
    return bgColorForTripDayVariants({ color: "primary" });

  const colorName = colorNames[colorIndex];
  return bgColorForTripDayVariants({ color: colorName });
};
