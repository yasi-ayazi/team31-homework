function highAndLow(numbers) {
  let numArray = numbers.split(" ").map(Number);
  let maxNum = Math.max(...numArray);
  let minNum = Math.min(...numArray);
  return `${maxNum} ${minNum}`;
}
