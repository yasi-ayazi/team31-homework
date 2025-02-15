//Flight booking fullname function
function getFullName(firstName, surName, useFormalName = true) {
  if (!firstName || !surName) {
    return "Invalid name";
  }
  if (useFormalName) {
    return "Lord " + firstName + " " + surName;
  } else {
    return firstName + " " + surName;
  }
}
let fullName1 = getFullName("Sarah", "Tomes");
let fullName2 = getFullName("Alice", "Baker", false);
// Testing the function
console.log(fullName1);
console.log(fullName2);

//Event application
function getEventWeekday(daysFromToday) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const eventDay = (today.getDay() + daysFromToday) % 7;
  return days[eventDay];
}
// Testing the function
console.log(getEventWeekday(9));
console.log(getEventWeekday(0));

//Weather wear
function whatToWear(temperature) {
  if (temperature >= 25) {
    return "Wear shorts and a t-shirt";
  } else if (temperature >= 15) {
    return "Wear jeans and a light jacket";
  } else if (temperature >= 5) {
    return "Wear a warm jacket, sweater, and pants";
  } else {
    return "Wear a heavy coat, gloves, and a hat";
  }
}

// Testing the function
const clothesToWear = whatToWear(18);
console.log(clothesToWear);

//Student manager
const class07Students = [];

function addStudentToClass(studentName) {
  if (!studentName) {
    console.log("Invalid name");
    return;
  }

  if (class07Students.includes(studentName)) {
    console.log("Student " + studentName + " is already in the class");
    return;
  }

  if (studentName === "Queen") {
    class07Students.push(studentName);
    return;
  }

  if (class07Students.length >= 6) {
    console.log("Cannot add more students to class 07");
    return;
  }

  // Add student to the class
  class07Students.push(studentName);
}

function getNumberOfStudents() {
  return class07Students.length;
}

// Testing the functions
// Adding students
addStudentToClass("Alice");
addStudentToClass("Bob");
addStudentToClass("Charlie");
addStudentToClass("David");
addStudentToClass("Emma");
addStudentToClass("Frank");
//Checking the conditions
addStudentToClass("Grace");
addStudentToClass("Queen");
addStudentToClass("Alice");
addStudentToClass("");

// Checking the number of students
console.log("Number of students in class 07:", getNumberOfStudents());

//Candy helper optional
const boughtCandyPrices = [];
const validPurchases = [];
const candyPrices = {
  sweet: 0.5,
  chocolate: 0.7,
  toffee: 1.1,
  "chewing-gum": 0.03,
};

let amountToSpend = Math.random() * 100;
console.log("Total money to spend:", amountToSpend.toFixed(2));

function addCandy(candyType, weight) {
  if (!candyPrices[candyType]) {
    console.log("Invalid candy type!");
    return;
  }

  const price = candyPrices[candyType] * weight;
  const totalPrice = boughtCandyPrices.reduce((sum, val) => sum + val, 0);

  if (totalPrice + price > amountToSpend) {
    console.log(`Not enough money! You can only spend up to ${amountToSpend.toFixed(2)}.`);
  } else {
    boughtCandyPrices.push(price);
    validPurchases.push({ type: candyType, weight, price });
    console.log(`Added ${candyType} (${weight}g) for $${price.toFixed(2)}`);
  }
}

function canBuyMoreCandy() {
  let totalPrice = boughtCandyPrices.reduce((sum, val) => sum + val, 0);
  if (totalPrice < amountToSpend) {
    console.log("You can buy more, so please do!");
    return true;
  } else {
    console.log("Enough candy for you!");
    return false;
  }
}


// Testing the functions
addCandy("sweet", 20);
addCandy("chocolate", 15);
addCandy("toffee", 10);
addCandy("chewing-gum", 50);

console.log("Bought candy prices:", boughtCandyPrices);
console.log("Valid purchases:", validPurchases);

// Check if more candy can be bought
canBuyMoreCandy();
