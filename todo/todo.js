const { table, log } = require("console");
const fs = require("fs");
const path = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(path);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTask = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(path, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTask(tasks); // FIXED
  console.log("Task added", task);
};
const listTasks = () => {
  const task = loadTasks();
  task.forEach((task, index) => console.log(`${index + 1}-${task.task}`));
};
const removeTask = (index) => {
  const tasks = loadTasks();

  // index starts from 1 in display, but array starts from 0
  const actualIndex = index - 1;

  if (actualIndex < 0 || actualIndex >= tasks.length) {
    console.log("Invalid task number");
    return;
  }

  // Remove the task
  tasks.splice(actualIndex, 1);

  // Save updated list
  saveTask(tasks);

  console.log(`Task ${index} removed`);
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("commond not found");
}
