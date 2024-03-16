export const useCalendar = () => {
  const born_date = "2023-1-1";

  const date = new Date();

  const time_string = date.toLocaleTimeString();

  const date_arr = date.toLocaleDateString().replaceAll("/", "-").split("-");

  const day = date_arr[1];
  const month = date_arr[0];
  const year = date_arr[2];

  const result = `${year}-${month}-${day}`;

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const gap_year =
    parseInt(result.split("-")[0]) - parseInt(born_date.split("-")[0]);
  const gap_month =
    parseInt(result.split("-")[1]) - parseInt(born_date.split("-")[1]);

  let available_month = [];
  let available_month_number = [];

  for (let n = 0; n <= 12 * gap_year + gap_month; n++) {
    available_month.push(
      `${2023 + Math.floor(n / 12)}-${
        months[(n + months.length) % months.length]
      }`
    );

    available_month_number.push(`${2023 + Math.floor(n / 12)}-${((n + months.length) % months.length) + 1}`)
  }

  return {
    available_month: available_month,
    available_month_number: available_month_number,
    compareDate: (date: Date) => {
      
    }
  }
};
