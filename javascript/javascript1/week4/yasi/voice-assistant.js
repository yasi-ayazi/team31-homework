let userName = "";
let todos = [];

function getReply(command) {
    if (command.startsWith("hello my name is ")) {
        const name = command.replace("hello my name is ", "");
        if (userName && userName.toLowerCase() === name.toLowerCase()) {
            return `You already told me your name is ${userName}.`;
        }
        userName = name;
        return `Nice to meet you, ${userName}.`;
    }
    
    if (command === "what is my name?") {
        return userName ? `Your name is ${userName}.` : "I don't know your name yet.";
    }
    
    if (command.startsWith("add ") && command.includes(" to my todo")) {
        const task = command.replace("Add ", "").replace(" to my todo", "");  
        todos.push(task);
        return `${task} added to your todo.`;
    }
    
    if (command.startsWith("remove ") && command.includes(" from my todo")) {
        const task = command.replace("remove ", "").replace(" from my todo", "");
        const index = todos.indexOf(task);
        if (index > -1) {
            todos.splice(index, 1);
            return `Removed ${task} from your todo.`;
        } else {
            return `${task} is not in your todo list.`;
        }
    }
    
    if (command === "what is on my todo?") {
        return todos.length > 0 ? `You have ${todos.length} todos: ${todos.join(", " )}.` : "Your todo list is empty.";
    }
    
    if (command === "what day is it today?") {
        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return today.toLocaleDateString('en-GB', options);
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
    
    if (command.startsWith("set a timer for ")) {
        const minutes = parseInt(command.replace("set a timer for ", "").replace(" minutes", ""));
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