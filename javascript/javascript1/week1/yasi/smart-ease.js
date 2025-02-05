console.log("Age-ify:");
//A future age calculator
const yearOfBirth = 1987;
const yearFuture = 2035;
const age = yearFuture - yearOfBirth;
console.log("You will be " + age + " years old in " + yearFuture);
//new section
console.log("Goodboy-Oldboy:");
//A dog age calculator
const dogYearOfBirth = 2017;
const dogYearFuture = 2045;
const dogYear = dogYearFuture - dogYearOfBirth;
const shouldShowResultInDogYears = true;
if (shouldShowResultInDogYears) {
  console.log(
    "Your dog will be " +
      dogYear * 7 +
      " dog years old in " +
      dogYearFuture +
      "."
  );
} else {
  console.log(
    "Your dog will be " + dogYear + " human years old in " + dogYearFuture + "."
  );
}
//third section
console.log("Housey Pricey:");
//A house price estimator
let volumeInMeters = 8 * 10 * 10;
let gardenSizeInM2 = 100;
const peterHousePrice = 2500000;
let estimatedHousePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;

if (estimatedHousePrice < peterHousePrice) {
  console.log("Peter's house price is too high");
} else if (estimatedHousePrice === peterHousePrice) {
  console.log("Peter's house price is perfect");
} else {
  console.log("Peter's house price is too low");
}

volumeInMeters = 5 * 11 * 8;
gardenSizeInM2 = 70;
estimatedHousePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
const juliaHousePrice = 1000000;

if (estimatedHousePrice < juliaHousePrice) {
  console.log("Julia's house price is too high");
} else if (estimatedHousePrice === juliaHousePrice) {
  console.log("Julia's house price is perfect");
} else {
  console.log("Julia's house price is too low");
}
//fourth section
console.log("Ez Namey:");
//Startup name generator
const firstWords = [
  "Easy",
  "Awesome",
  "Neural",
  "Meta",
  "Dynamic",
  "Tech",
  "Smart",
  "Agile",
  "Fix",
  "Hack",
];
const secondWords = [
  "Tools",
  "Solutions",
  "Apps",
  "Way",
  "Path",
  "Method",
  "Future",
  "Systems",
  "Networks",
  "Hub",
];
const randomFirstIndex = Math.floor(Math.random() * 10);
const randomSecondIndex = Math.floor(Math.random() * 10);
const startupName =
  firstWords[randomFirstIndex] + " " + secondWords[randomSecondIndex];
console.log(
  "The startup: '" +
    startupName +
    "' contains " +
    startupName.length +
    " characters."
);
