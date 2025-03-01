import "./styles.scss";

// Or if installed from NPM to use with a bundler
import Artyom from "artyom.js";
// const artyom = require("artyom.js");
const artyom = new Artyom();

let userName = [];
let todos = [];

function getReply(command) {
  if (command.includes("hello my name is")) {
    const name = command.replace("hello my name is", "");
    let formattedName = name.replaceAll(/\s/g, ""); // Remove all spaces

    let found = userName.some(
      (n) => n.toLowerCase() === formattedName.toLowerCase()
    ); // Case-insensitive check
    if (found) {
      return `You already told me your name is ${name}.`;
    }
    userName.push(formattedName);
    return `Nice to meet you, ${name}.`;
  }

  if (command.includes("what is my name")) {
    return userName
      ? `Your name is ${userName}.`
      : "I don't know your name yet.";
  }

  if (command.startsWith("add ") && command.includes(" to my list")) {
    const task = command.replace("add ", "").replace(" to my list", "");
    console.log(task);
    todos.push(task);
    return `${task} added to your list.`;
  }

  if (command.startsWith("remove ") && command.includes(" from my list")) {
    const task = command.replace("remove ", "").replace(" from my list", "");
    const index = todos.indexOf(task);
    if (index > -1) {
      todos.splice(index, 1);
      return `Removed ${task} from your list.`;
    } else {
      return `${task} is not in your todo list.`;
    }
  }

  if (command.includes("what is on my list")) {
    return todos.length > 0
      ? `You have ${todos.length} on your list: ${todos.join(", ")}.`
      : "Your list is empty.";
  }

  if (command.includes("what day is it today")) {
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    return today.toLocaleDateString("en-GB", options);
  }

  if (command.startsWith("what is ")) {
    const expression = command.replace("what is ", "").replace("?", "");
    try {
      const result = eval(expression);
      return result;
    } catch (error) {
      return "I can't calculate that.";
    }
  }

  if (command.startsWith("set a timer for")) {
    const minutes = parseInt(
      command.replace("set a timer for ", "").replace(" minutes", "")
    );
    if (!isNaN(minutes)) {
      setTimeout(() => artyom.say("Timer done!"), minutes * 60000);
      return `Timer set for ${minutes} minutes.`;
    } else {
      return "I couldn't set a timer.";
    }
  }

  return "I don't understand that command.";
}
function isgetReplyAvailable() {
  return typeof getReply !== "undefined" && typeof getReply === "function";
}

if (isgetReplyAvailable()) {
  let command;
  let timeoutId;
  let setIntervalTimer;

  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    button.innerHTML = "Talk now 🙂";
    setIntervalTimer = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 2;
      if (randomNumber % 2 === 0) {
        button.innerHTML = "Talk now 😮";
      } else {
        button.innerHTML = "Talk now 🙂";
      }
    }, 100);
    clearTimeout(timeoutId);

    command = "";
    timeoutId = setTimeout(() => {
      clearInterval(setIntervalTimer);
      const response = getReply(command);

      artyom.say(response);

      button.innerHTML = "Give a new command";
    }, 5000);
  });

  var UserDictation = artyom.newDictation({
    continuous: false, // Enable continuous if HTTPS connection
    onResult: function (text) {
      // Do something with the text
      if (text.length > command.length) {
        command = text;
        console.log(command);
      }
    },
    onStart: function () {
      console.log("Dictations started by the users");
    },
    onEnd: function () {
      console.log("Dictation stopped by the user");
    },
  });

  UserDictation.start();
} else {
  alert("add the getReply function!");
}
