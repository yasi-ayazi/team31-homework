// avg.js

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Please enter some numbers.");
  process.exit(1);
}

const numbers = args.map(Number);

if (numbers.some(isNaN)) {
  console.log("Just enter numbers.");
  process.exit(1);
}

const average = numbers.reduce((a, b) => a + b, 0) / numbers.length;
console.log(average);
