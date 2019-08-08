import React, { Component } from "react";
import "./toDo.css";
import "bootstrap/dist/css/bootstrap.css";
import AddTask from "./addTask";
import TaskList from "./taskList";
import Header from "./header";
class Todo extends Component {
  state = {
    tasks: [],
    editmode: false,
    toBeEdited: ""
  };
  toggleEditMode = mode => {
    this.setState({ editmode: mode });
    console.log(this.state.toBeEdited + " to be edited");
  };

  handleAddTask = newTask => {
    if (newTask === "") {
      alert("Please enter a valid task");
      return;
    }
    if (this.state.tasks.includes(newTask)) {
      alert("You have already written this task");
      return;
    }
    this.setState(state => {
      const tasks = state.tasks.concat(newTask);

      return { newTask: "", tasks, value: "" };
    });
  };
  handleDeleteTask = task => {
    let abbr = this.state;
    let ind = abbr.tasks.indexOf(task);
    this.setState(state => {
      state.confirm = false;
      const remainingTasks = state.tasks.splice(ind, 1);

      return {
        remainingTasks
      };
    });
  };

  setEditTask = task => {
    this.setState({ toBeEdited: task });
  };
  handleEditTask = task => {
    if (!this.state.tasks.includes(task) && task !== "") {
      this.handleDeleteTask(this.state.toBeEdited);
      this.handleAddTask(task);
    } else if (task === "") {
      alert("You entered an empty task");
    } else if (this.state.tasks.includes(task)) {
      alert("You Already have this task");
    }

    this.setState({ toBeEdited: "", editmode: false });
  };
  cancelEdit = () => {
    this.setState({ toBeEdited: "", editmode: false });
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <AddTask
          addNew={this.handleAddTask}
          edit={this.state.toBeEdited}
          mode={this.state.editmode}
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
