### Describe Task()
Test: "It should create a new object with properties of taskName, steps and doneBy."
Code: let newTask = new Task("sweep", ["sweep dirt into pile", "sweep pile into dustpan", "empty dustpan into garbage"], "tonight")
Expected Output:
"newTask => {taskname: sweep, steps: array, doneBy: tonight}"