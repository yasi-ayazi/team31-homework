//Item array removal
let names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

//Write some code here
function removeName(names, nameToRemove) {
  const indexOfPerson = names.indexOf("Ahmad");
  names = names.filter((item) => item !== nameToRemove);
}
removeName(names, nameToRemove);
// Code done
console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']

//When will we be there
const travelInformation = {
  speed: 50,
  destinationDistance: 5421,
};

function calculateTravelTime(travelInformation) {
  // Calculate total time in hours
  const totalTime =
    travelInformation.destinationDistance / travelInformation.speed;

  // Calculate full days of travel
  const days = Math.floor(totalTime / 24);

  // Calculate remaining distance after full days of travel
  const remainingDistance =
    travelInformation.destinationDistance - days * 24 * travelInformation.speed;

  // Calculate remaining time in hours
  const time = remainingDistance / travelInformation.speed;

  // Extract hours from remaining time
  const hours = parseInt(time, 10);

  // Calculate remaining minutes
  const minutes = Math.round((time - hours) * 60);

  // Return formatted travel time
  return `${days} days, ${hours} hours and ${minutes} minutes`;
}
const travelTime = calculateTravelTime(travelInformation);
console.log("Travel time is: ", travelTime); // 8 hours and 38 minutes*/

// Series duration of my life
const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
];
function logOutSeriesText() {
  const totalLifeSpanHours = 80 * 365 * 24 * 60;
  let totalSeriesTimeMinutes = 0;

  for (let i = 0; i < seriesDurations.length; i++) {
    const seriesTime =
      seriesDurations[i].days * 24 * 60 +
      seriesDurations[i].hours * 60 +
      seriesDurations[i].minutes;

    const seriesPercentage = (seriesTime * 100) / totalLifeSpanHours;
    totalSeriesTimeMinutes += seriesTime;
    console.log(
      `${seriesDurations[i].title} took ${seriesPercentage.toFixed(
        3
      )}% of my life`
    );
  }
  const totalPercentage = (totalSeriesTimeMinutes / totalLifeSpan) * 100;
  console.log(`\nIn total that is ${totalPercentage.toFixed(3)}% of my life`);
}

logOutSeriesText(); // logs out the text found above

//NOnoN0nOYes (Note taking app)
const notes = [];

function saveNote(content, id) {
  if (typeof id === "number") {
    id = id;
  } else if (typeof id === "string") {
    id = parseInt(id);
  } else {
    console.error(
      "Error: ID must be a number or a string that can be converted to a number"
    );
    return;
  }
  if (typeof content === undefined) {
    console.error("Error: content is empty");
    return;
  }
  notes.push({ content, id });
}
function getNote(id) {
  if (typeof id !== "number") {
    console.error("Error: ID must be a number");
    return;
  }

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      return notes[i];
    }
  }
  return "Note not found";
}
function logOutNotesFormatted() {
  for (let i = 0; i < notes.length; i++) {
    console.log(
      `The note with id: ${notes[i].id}, has the following note text: ${notes[i].content}`
    );
  }
}

//Unique feature
function deleteNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1); // Remove the note from the array
      console.log(`Note with id ${id} deleted.`);
      return;
    }
  }
  console.log("Note not found.");
}

//Test the note taking app
saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

console.log(notes);
const firstNote = getNote(1);
console.log(firstNote);

logOutNotesFormatted();

deleteNote(1);
logOutNotesFormatted();

//CactusIO-interactive (Smart phone usage app)
const activities = [];
const usageLimit = 100;

function addActivity(activity, duration) {
  const today = new Date().toLocaleDateString("en-US");
  activities.push({ date: today, activity, duration });
}

function showStatus() {
  if (!activities.length) {
    return "Add some activities before calling showStatus";
  }

  const today = new Date().toLocaleDateString("en-US");
  const todayActivities = activities.filter((act) => act.date === today);
  const totalDuration = todayActivities.reduce(
    (sum, act) => sum + act.duration,
    0
  );

  if (totalDuration > usageLimit) {
    return "You have reached your limit, no more smartphoning for you!";
  }

  return `You have added ${todayActivities.length} activities today. They amount to ${totalDuration} minutes of usage`;
}

function mostUsedActivity() {
  if (activities.length === 0) {
    return "No activities recorded.";
  }

  let activityDurations = {};

  activities.forEach((act) => {
    if (activityDurations[act.activity]) {
      activityDurations[act.activity] += act.duration;
    } else {
      activityDurations[act.activity] = act.duration;
    }
  });

  let maxActivity = Object.keys(activityDurations).reduce((a, b) =>
    activityDurations[a] > activityDurations[b] ? a : b
  );

  return `Most used activity is ${maxActivity} with ${activityDurations[maxActivity]} minutes.`;
}

addActivity("Youtube", 30);
addActivity("Facebook", 20);
addActivity("Instagram", 40);
addActivity("TikTok", 15);

// Display output
console.log(showStatus());
console.log(mostUsedActivity());
