let userName = [];
let todos = [];

function getReply(command) {
  command=command.toLowerCase();
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
      setTimeout(() => console.log("Timer done!"), minutes * 60000);
      return `Timer set for ${minutes} minutes.`;
    } else {
      return "I couldn't set a timer.";
    }
  }

  return "I don't understand that command.";
}

// Example for testing:
console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is 3 + 3?"));
console.log(getReply("Set a timer for 1 minutes"));
