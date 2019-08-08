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
    toBeEdited: "",
    editing: ""
  };
  shouldComponentUpdate = () => true;
  toggleEditMode = mode => {
    this.setState({ editmode: mode });
  };

  setEditing = task => {
    this.setState({ editing: task });
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
    this.setState({ toBeEdited: task, editing: task });
  };
  handleEditTask = () => {
    if (
      !this.state.tasks.includes(this.state.editing) &&
      this.state.editing !== ""
    ) {
      this.handleAddTask(this.state.editing);
      this.handleDeleteTask(this.state.toBeEdited);
    } else {
      alert("You Already have this task or you entered an empty task");
    }

    this.setState({ toBeEdited: "", editmode: false, editing: "" });
  };
  cancelEdit = () => {
    this.setState({ toBeEdited: "", editmode: false, editing: "" });
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <AddTask
          editing={this.state.editing}
          toggle={this.toggleEditMode}
          addNew={this.handleAddTask}
          editFunc={this.setEditing}
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
