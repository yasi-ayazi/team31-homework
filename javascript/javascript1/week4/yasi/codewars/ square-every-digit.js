function squareDigits(num) {
  return Number(
    num
      .toString()
      .split("")
      .map((digit) => digit ** 2)
      .join("")
  );
}
