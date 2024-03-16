function padWithZero(num: number): string {
  return num > 10 ? `${num}` : `0${num}`;
}

export function DateFormater(date: Date): string {
  const year = date.getFullYear();
  const month = padWithZero(date.getMonth() + 1);
  const day = padWithZero(date.getDate());
  const hours = padWithZero(date.getHours());
  const minutes = padWithZero(date.getMinutes());
  const seconds = padWithZero(date.getSeconds());

  return `${year}-${month}-${day}`;
}
