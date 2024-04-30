function padWithZero(num: number): string {
  return num >= 10 ? `${num}` : `0${num}`;
}

export function DateFormater(date: Date): string {
  const date_ = new Date(date);
  const year = date_.getFullYear();
  const month = padWithZero(date_.getMonth() + 1);
  const day = padWithZero(date_.getDate());
  const hours = padWithZero(date_.getHours());
  const minutes = padWithZero(date_.getMinutes());
  const seconds = padWithZero(date_.getSeconds());

  return `${year}-${month}-${day}`;
}
