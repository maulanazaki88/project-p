const deadlines = ["2023-12-1",  "2023-12-5", "2023-12-12", "2023-12-8", "2023-12-2",]

deadlines.sort((a, b) => {
  let dateA = new Date(a);
  let dateB = new Date(b);

  return dateA - dateB;
})

console.log(deadlines)