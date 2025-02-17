//Item array removal
const names = [
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

// Write some code here
function removeName(names, nameToRemove) {
  for (let i = 0; i < names.length; i++) {
    if (names[i] === nameToRemove) {
      names.splice(i, 1);
      break;
    }
  }
}
removeName(names, nameToRemove);
// Code done
console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']

//When will we be there
const travelInformation = {
  speed: 50,
  destinationDistance: 5421,
};
function timeForTravel(travelInformation) {
  const time = travelInformation.destinationDistance / travelInformation.speed;
  return time;
}

function calculateTravelTime(travelInformation) {
  const totalTime = timeForTravel(travelInformation);
  const days = Math.floor(totalTime / 24);
  const remainingDistance =
    travelInformation.destinationDistance - days * 24 * travelInformation.speed;
  const time = remainingDistance / travelInformation.speed;
  console.log(time);
  const hours = parseInt(time, 10);
  const minutes = Math.round((time - hours) * 60);
  return `${days} days, ${hours} hours and ${minutes} minutes`;
}
const travelTime = calculateTravelTime(travelInformation);
console.log("Travel time is: ",travelTime); // 8 hours and 38 minutes*/

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
  const totalLifeSpan = 80 * 365 * 24 * 60;
  let totalSeriesTime = 0;

  for (let i = 0; i < seriesDurations.length; i++) {
    const seriesTime =
      (seriesDurations[i].days * 24 * 60) +
      (seriesDurations[i].hours * 60) +
      seriesDurations[i].minutes;

    const seriesPercentage = (seriesTime * 100) / totalLifeSpan;
    totalSeriesTime += seriesTime;
    console.log(
      `${seriesDurations[i].title} took ${seriesPercentage.toFixed(
        3
      )}% of my life`
    );
  }
  const totalPercentage = (totalSeriesTime / totalLifeSpan) * 100;
  console.log(`\nIn total that is ${totalPercentage.toFixed(3)}% of my life`);
}

logOutSeriesText(); // logs out the text found above

//NOnoN0nOYes (Note taking app)
const notes = [];

function saveNote(content, id) {
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
  let today = new Date().toLocaleDateString("en-US"); 
  activities.push({ date: today, activity, duration });
}

function showStatus() {
  if (activities.length === 0) {
    return "Add some activities before calling showStatus";
  }

  let today = new Date().toLocaleDateString("en-US"); 
  let todayActivities = activities.filter(act => act.date === today); 
  let totalDuration = todayActivities.reduce((sum, act) => sum + act.duration, 0);

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

  activities.forEach(act => {
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
