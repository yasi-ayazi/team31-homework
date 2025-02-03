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

