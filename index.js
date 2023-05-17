function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

const tasks = [];

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('***************************');
console.log('Welcome to JS TODO-APP');
console.log('***************************');
console.log('Select an action:');
console.log('1) Add a new task');
console.log('2) List all tasks');
console.log('3) List completed tasks');
console.log('4) Mark the task as done');
console.log('5) Delete a task');
console.log('6) Sort tasks by the due date');
console.log('7) Sort tasks by priority');
console.log('8) Clear all tasks');
console.log('***************************');

function addTask() {
  rl.question('Enter task description: ', (description) => {
    rl.question('Enter due date (YYYY-MM-DD): ', (dueDate) => {
      rl.question('Enter priority level (1-5): ', (priority) => {
        const task = new Task(description, dueDate, priority);
        tasks.push(task);
        console.log(`Task "${description}" added successfully.`);
        showMenu();
      });
    });
  });
}

function listTasks(completedOnly = false) {
  const filteredTasks = tasks.filter((task) => task.completed === completedOnly);
  if (filteredTasks.length === 0) {
    console.log('No tasks found.');
  } else {
    console.log('List of tasks:');
    filteredTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.description} (due on ${task.dueDate}, priority: ${task.priority}, ${task.completed ? 'completed' : 'incomplete'})`);
    });
  }
  showMenu();
}

function markTask() {
  rl.question('Enter the task number to mark as done: ', (index) => {
    const task = tasks[index - 1];
    if (task) {
      task.completed = true;
      console.log(`Task "${task.description}" marked as done.`);
    } else {
      console.log('Invalid task number.');
    }
    showMenu();
  });
}

function deleteTask() {
  rl.question('Enter the task number to delete: ', (index) => {
    const task = tasks.splice(index - 1, 1);
    if (task.length > 0) {
      console.log(`Task "${task[0].description}" deleted successfully.`);
    } else {
      console.log('Invalid task number.');
    }
    showMenu();
  });
}

function sortByDueDate() {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  console.log('Tasks sorted by the due date.');
  showMenu();
}

function sortByPriority() {
  tasks.sort((a, b) => a.priority - b.priority);
  console.log('Tasks sorted by priority.');
  showMenu();
}

function clearTasks() {
  tasks.length = 0;
  console.log('All tasks cleared.');
  showMenu();
}

function showMenu() {
  rl.question('What\'s your choice? ', (choice) => {
    console.log('***************************');
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        listTasks();
        break;
      case '3':
        listTasks(true);
        break;
      case '4':
        markTask();
        break;
      case '5':
        deleteTask();
        break;
      case '6':
        sortByDueDate();
        break;
      case '7':
        sortByPriority();
        break;
      case '8':
        clearTasks();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        showMenu();
        break;
    }
  });
}

showMenu();
