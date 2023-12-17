export const useDateNow = (option?: { withTime: boolean }) => {
  const date = new Date();

  const time_string = date.toLocaleTimeString();

  const date_arr = date.toLocaleDateString().replaceAll("/", "-").split("-");

  const day = date_arr[1];
  const month = date_arr[0];
  const year = date_arr[2];

  const result = option?.withTime
    ? `${year}-${month}-${day}-${time_string}`
    : `${year}-${month}-${day}`;

  return result;
};
