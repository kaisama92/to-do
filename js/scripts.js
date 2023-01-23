//Business Logic for taskList
function TaskList() {
  this.tasks = {};
  this.currentId = 0;
}

TaskList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.task[task.id] = task;
};

TaskList.prototype.assignId = function() {
  this.currentId += 1; 
  return this.currentId;
};

TaskList.prototype.findTask = function(id) {
  if (this.task[id] !== undefined) {
    return this.task[id];
  }
  return false;
};

TaskList.prototype.deleteTask = function(id) {
  if (this.task[id] === undefined) {
    return false;
  }
  delete this.task[id];
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
    const task = taskListToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.whatWhen());
    li.setAttribute("id", task.id);
    ul.append(li);
  });
  tasksDiv.append(ul);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedTaskName = document.querySelector("input#new-task-name").value;
  const inputtedSteps = document.querySelector("input#new-steps").value.split(",");
  const inputtedDeadline = document.querySelector("input#new-date").value;
  let newTask = new Task(inputtedTaskName, inputtedSteps, inputtedDeadline);
  TaskList.addTask(newTask);
  document.querySelector("input#new-task-name").value = null;
  document.querySelector("input#new-steps").value = null;
  document.querySelector("input#new-date").value = null;
}

window.addEventListener("load", function () {
  this.document.querySelector("form#new-task").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#tasks").addEventListener("click", displayTaskDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
  document.querySelector("button.cross").addEventListener("click", handleCrossOut);
})