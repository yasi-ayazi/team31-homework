import "./styles.scss";
import Artyom from "artyom.js";

const artyom = new Artyom();

let userName = ""; // Store user's name
let todoList = []; // Store user's todo list
let lastResponse = ""; // Prevent repeating the same response
// Joke database
const jokes = [
  "Why don't skeletons fight each other? Because they don't have the guts!",
  "I told my wife she should embrace her mistakes. She gave me a hug.",
  "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Why can't your nose be 12 inches long? Because then it would be a foot!",
];

// Define commands (Using Artyom.js standard)
const commands = [
  {
    indexes: ["hello I'm *", "hello my name is *"],
    smart: true,
    action: (i, wildcard) => {
      wildcard = wildcard.trim(); // Ensure clean input
      if (userName === wildcard) {
        return `You've already told me your name is ${userName}.`;
      }
      userName = wildcard;
      return `Nice to meet you, ${userName}.`;
    },
  },
  {
    indexes: ["what is my name"],
    action: () => {
      return userName
        ? `Your name is ${userName}.`
        : "I don't know your name yet.";
    },
  },
  {
    indexes: ["add * to my todo"],
    smart: true,
    action: (i, wildcard) => {
      todoList.push(wildcard.trim());
      return `${wildcard} added to your todo.`;
    },
  },
  {
    indexes: ["remove * from my todo"],
    smart: true,
    action: (i, wildcard) => {
      let task = wildcard.trim();
      let index = todoList.indexOf(task);
      if (index > -1) {
        todoList.splice(index, 1);
        return `Removed ${task} from your todo.`;
      }
      return `${task} is not in your todo list.`;
    },
  },
  {
    indexes: ["what is on my todo"],
    action: () => {
      return todoList.length > 0
        ? `You have ${todoList.length} todos: ${todoList.join(" and ")}.`
        : "Your todo list is empty.";
    },
  },
  {
    indexes: ["what day is it today"],
    action: () => {
      const today = new Date();
      return `Today is ${today.toDateString()}.`;
    },
  },
  {
    indexes: ["what is * plus *"],
    smart: true,
    action: (i, num1, num2) =>
      `The answer is ${parseInt(num1) + parseInt(num2)}.`,
  },
  {
    indexes: ["what is * minus *"],
    smart: true,
    action: (i, num1, num2) =>
      `The answer is ${parseInt(num1) - parseInt(num2)}.`,
  },
  {
    indexes: ["what is * times *"],
    smart: true,
    action: (i, num1, num2) =>
      `The answer is ${parseInt(num1) * parseInt(num2)}.`,
  },
  {
    indexes: ["what is * divided by *"],
    smart: true,
    action: (i, num1, num2) =>
      num2 != 0
        ? `The answer is ${parseInt(num1) / parseInt(num2)}`
        : "Cannot divide by zero.",
  },
  {
    indexes: ["set a timer for * minutes"],
    smart: true,
    action: (i, minutes) => {
      setTimeout(() => {
        artyom.say("Timer done!");
        console.log("Timer done!");
      }, parseInt(minutes) * 60000);
      return `Timer set for ${minutes} minutes.`;
    },
  },
  {
    indexes: ["tell me a joke"],
    action: () => {
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      return joke;
    },
  },
];

// Register commands in Artyom
artyom.addCommands(commands);

// Function to process recognized speech
function getReply(command) {
  console.log("Processing command:", command);

  let response = null;

  // Check if the command matches any defined commands
  commands.forEach((cmd) => {
    cmd.indexes.forEach((index) => {
      let pattern = index.replace(/\*/g, "(.*)");
      let match = command.match(new RegExp(pattern, "i"));

      if (match) {
        response = cmd.smart
          ? cmd.action(match.index, ...match.slice(1))
          : cmd.action();
      }
    });
  });

  return response;
}

// Check if `getReply` exists
function isgetReplyAvailable() {
  return typeof getReply !== "undefined" && typeof getReply === "function";
}

if (isgetReplyAvailable()) {
  let command = "";
  let timeoutId;
  let setIntervalTimer;

  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    button.innerHTML = "Talk now 🙂";

    setIntervalTimer = setInterval(() => {
      button.innerHTML = Math.random() < 0.5 ? "Talk now 😮" : "Talk now 🙂";
    }, 100);

    clearTimeout(timeoutId);
    command = "";

    timeoutId = setTimeout(() => {
      clearInterval(setIntervalTimer);
      const response = getReply(command);

      if (response && response !== lastResponse) {
        artyom.say(response);
        console.log("Reply:", response);
        lastResponse = response;
      }

      button.innerHTML = "Give a new command";
    }, 5000);
  });

  var UserDictation = artyom.newDictation({
    continuous: false,
    onResult: function (text) {
      if (text.length > command.length && text !== lastResponse) {
        clearTimeout(timeoutId); // Stop processing until full command is captured
        timeoutId = setTimeout(() => {
          command = text.trim(); // Capture full spoken phrase
          console.log("Recognized Command:", command);

          const response = getReply(command);

          if (response && response !== lastResponse) {
            console.log("Response:", response);
            artyom.say(response);
            lastResponse = response;
          }
        }, 800); // Delay to ensure full phrase is captured
      }
    },
    onStart: function () {
      console.log("Dictation started...");
    },
    onEnd: function () {
      console.log("Dictation stopped.");
    },
  });

  UserDictation.start();
} else {
  alert("Add the getReply function!");
}
