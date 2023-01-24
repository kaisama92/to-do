//Business Logic for taskList
function TaskList() {
  this.tasks = {};
  this.currentId = 0;
}

TaskList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks[task.id] = task;
};

TaskList.prototype.assignId = function() {
  this.currentId += 1; 
  return this.currentId;
};

TaskList.prototype.findTask = function(id) {
  if (this.tasks[id] !== undefined) {
    return this.tasks[id];
  }
  return false;
};

TaskList.prototype.deleteTask = function(id) {
  console.log(this.tasks[id]);
  if (this.tasks[id] === undefined) {
    return false;
  }
  delete this.tasks[id];
  return true;
};

TaskList.prototype.updateTask = function(id) {
  //const task = taskList.findTask(event.target.id);
  console.log(this.tasks[id]);
  if (this.tasks[id] === undefined) {
    return false;
  }
  console.log(this.tasks.taskName);
  this.tasks.taskName = this.tasks.taskName + ": Is Done"
  return true;
};





//Business Logic for Task

function Task(taskName, steps, doneBy) {
  this.taskName = taskName;
  this.steps = steps;
  this.doneBy = doneBy;
}

Task.prototype.whatWhen = function() {
  return this.taskName + " " + this.doneBy;
};

// User Interface Logic ---------
let taskList = new TaskList();

function listTask(taskListToDisplay) {
  let tasksDiv = document.querySelector("div#tasks");
  tasksDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(taskListToDisplay.tasks).forEach(function(key) {
    const task = taskListToDisplay.findTask(key);
    const li = document.createElement("li");
    li.append(task.whatWhen());
    li.setAttribute("id", task.id);
    ul.append(li);
  });
  tasksDiv.append(ul);
}

function displayTaskDetails(event) {
  const task = taskList.findTask(event.target.id);
  document.querySelector(".task-name").innerText = task.taskName;
  document.querySelector(".steps").innerText = task.steps;
  document.querySelector(".date").innerText = task.doneBy;
  document.querySelector("button.delete").setAttribute("id", task.id);
  document.querySelector("div#tasks-details").removeAttribute("class");
}

function handleDelete(event) {
  taskList.deleteTask(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#tasks-details").setAttribute("class", "hidden");
  listTask(taskList);
}

function handleUpdate(event) {
  taskList.updateTask(event.target.id);
  document.querySelector("button.cross").removeAttribute("id");
  document.querySelector("div#tasks-details").setAttribute("class", "hidden");
  listTask(taskList);
}


function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedTaskName = document.querySelector("input#new-task-name").value;
  const inputtedSteps = document.querySelector("input#new-steps").value.split(",");
  const inputtedDeadline = document.querySelector("input#new-date").value;
  let newTask = new Task(inputtedTaskName, inputtedSteps, inputtedDeadline);
  taskList.addTask(newTask);
  listTask(taskList);
  document.querySelector("input#new-task-name").value = null;
  document.querySelector("input#new-steps").value = null;
  document.querySelector("input#new-date").value = null;
}

window.addEventListener("load", function () {
  this.document.querySelector("form#new-task").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#tasks").addEventListener("click", displayTaskDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
  document.querySelector("button.cross").addEventListener("click", handleUpdate);
});