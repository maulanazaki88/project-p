import { DateFormater } from "@/utils/DateFormater";

type CalendarType = ("y" | "m" | "d")[];

export function useRenderDate() {
  const calendar = (date: Date, type: CalendarType) => {
    const array = DateFormater(date).split("-");
    const year = parseInt(array[0]);
    const month = parseInt(array[1]);
    const day = parseInt(array[2]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    if (type.some((c) => c === "y")) {
      return `${year}-${month}-${day}`;
    } else {
      return `${day} ${months[month - 1]}`;
    }
  };

  return {
    calendar: (date: Date, type: CalendarType) => calendar(date, type),
  };
}
