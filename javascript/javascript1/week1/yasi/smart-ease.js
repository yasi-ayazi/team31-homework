console.log("Age-ify:");
//A future age calculator
const yearOfBirth=1987;
const yearFuture=2035;
const age=yearFuture-yearOfBirth;
console.log("You will be "+age+" years old in "+yearFuture);
//new section
console.log("Goodboy-Oldboy:");
//A dog age calculator
const dogYearOfBirth=2017;
const dogYearFuture = 2045;
const dogYear = dogYearFuture - dogYearOfBirth;
const shouldShowResultInDogYears = true;
if (shouldShowResultInDogYears) {
    console.log('Your dog will be ' + (dogYear * 7) + ' dog years old in ' + dogYearFuture + '.');
} else {
    console.log('Your dog will be ' + dogYear + ' human years old in ' + dogYearFuture + '.');
}
//third section
console.log("Housey Pricey:");
//A house price estimator
let volumeInMeters = 8*10*10; //volumeInMeters = width × depth × height 
let gardenSizeInM2 = 100;  //garden size
const peterHousePrice = 2500000; // Peter's actual house price
let housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;

if (housePrice < peterHousePrice) {
    console.log("Peter's house price is too high");
} else if (housePrice === peterHousePrice) {
    console.log("Peter's house price is perfect");
} else {    
    console.log("Peter's house price is too low");
}

volumeInMeters = 5*11*8; // volumeInMeters = width × depth × height 
gardenSizeInM2 = 70;  // garden size
housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
const juliaHousePrice = 1000000; // Julia's actual house price

if (housePrice < juliaHousePrice) {
    console.log("Julia's house price is too high");
} else if (housePrice === juliaHousePrice) {
    console.log("Julia's house price is perfect");
} else {    
    console.log("Julia's house price is too low");
}
