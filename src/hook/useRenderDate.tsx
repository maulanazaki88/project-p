import { DateFormater } from "@/utils/DateFormater";

type CalendarType = ("y" | "m" | "d")[];

export function useRenderDate() {
  const calendar = (date: Date, type: CalendarType) => {
    const currentDate = new Date(Date.now());
    const array = DateFormater(date).split("-");
    const year = parseInt(array[0]);
    const month = parseInt(array[1]);
    const day = parseInt(array[2]);

    const showYear = currentDate.getFullYear() !== year;

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (type.some((c) => c === "y")) {
      return `${months[month - 1]} ${day}${showYear ? ", " + year : ""}`;
    } else {
      return `${day} ${months[month - 1]}`;
    }
  };

  return {
    calendar: (date: Date, type: CalendarType) => calendar(date, type),
  };
}
