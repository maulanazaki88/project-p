type CalendarType = ("y" | "m" | "d")[];

export function useCalendar(date: string, type: CalendarType) {
  const array = date.split("-");
  const year = parseInt(array[0]);
  const month = parseInt(array[1]);
  const day = parseInt(array[2]);

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
    return `${year}-${month}-${day}`;
  } else {
    return `${day} ${months[month - 1]}`;
  }
}
