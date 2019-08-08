import React, { Component } from "react";
import "./toDo.css";
import "bootstrap/dist/css/bootstrap.css";
import AddTask from "./addTask";
import TaskList from "./taskList";
import Header from "./header";
class Todo extends Component {
  state = {
    tasks: [],
    editMode: false,
    toBeEdited: undefined,
    id: 0
  };
  toggleEditMode = mode => {
    this.setState({ editMode: mode });
    console.log(`${JSON.stringify(this.state.toBeEdited)}  to be edited`);
  };

  handleAddTask = newTaskValue => {
    if (newTaskValue === "") {
      alert("Please enter a valid task");
      return;
    }
    this.setState(state => {
      const tasks = state.tasks.concat({
        id: this.state.id,
        value: newTaskValue
      });
      return { newTask: "", tasks, value: "", id: this.state.id + 1 };
    });
  };
  findTaskWithValue = value => {
    let abbr = this.state.tasks;
    return abbr.find(element => element.value === value);
  };
  findTaskWithId = Id => {
    let abbr = this.state.tasks;
    return abbr.find(element => element.id === Id);
  };
  handleDeleteTask = taskId => {
    let abbr = this.state.tasks;
    let findTask = this.findTaskWithId(taskId);
    let ind = abbr.indexOf(findTask);
    this.setState(state => {
      state.confirm = false;
      state.editMode = false;
      const remainingTasks = state.tasks.splice(ind, 1);

      return {
        remainingTasks
      };
    });
  };

  setEditTask = task => {
    console.log(`${JSON.stringify(task)} set edit`);
    this.setState({ toBeEdited: task, editMode: true });
  };
  handleEditTask = taskValue => {
    if (taskValue !== "") {
      console.log("control point");

      let idholder = this.state.toBeEdited.id;
      let newtasksarray = [...this.state.tasks];
      let index = this.state.tasks.indexOf(this.state.toBeEdited);
      newtasksarray[index] = { id: idholder, value: taskValue };
      this.setState({ tasks: newtasksarray });
      // this.handleDeleteTask(this.state.toBeEdited.id);
      // this.handleAddTask(taskValue);
    } else if (taskValue === "") {
      alert("You entered an empty task");
    }

    this.setState({ toBeEdited: undefined, editMode: false });
  };
  cancelEdit = () => {
    this.setState({ toBeEdited: undefined, editMode: false });
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <AddTask
          addNew={this.handleAddTask}
          taskToBeEdited={this.state.toBeEdited}
          isEditMode={this.state.editMode}
          completeEdit={this.handleEditTask}
          cancel={this.cancelEdit}
        />

        <TaskList
          toggleEdit={this.toggleEditMode}
          enteredTask={this.state.tasks}
          taskLength={this.state.tasks.length}
          deleteTask={this.handleDeleteTask}
          editTask={this.setEditTask}
        />
      </React.Fragment>
    );
  }
}

export default Todo;
