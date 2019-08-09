import React, { Component } from "react";
import "./toDo.css";
import "bootstrap/dist/css/bootstrap.css";
import AddTask from "./addTask";
import TaskList from "./taskList";
import Header from "./header";
import uuid from "uuid";

class Todo extends Component {
  state = {
    tasks: [],
    editMode: false,
    toBeEdited: undefined
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
    const { tasks } = this.state;
    this.setState({
      tasks: [...tasks, { id: uuid(), value: newTaskValue }]
    });
  };

  handleDeleteTask = taskId => {
    const { tasks } = this.state;

    const ind = tasks.findIndex(element => element.id === taskId);
    // findIndex

    this.setState({
      confirm: false,
      editMode: false,
      remainingTasks: tasks.splice(ind, 1)
    });
  };

  setEditTask = task => {
    //console.log(`${JSON.stringify(task)} set edit`);
    this.setState({ toBeEdited: task, editMode: true });
  };
  handleEditTask = taskValue => {
    if (taskValue !== "") {
      const idholder = this.state.toBeEdited.id;
      let newtasksarray = [...this.state.tasks];
      const index = this.state.tasks.indexOf(this.state.toBeEdited);
      newtasksarray[index] = { id: idholder, value: taskValue };
      this.setState({ tasks: newtasksarray });
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
          deleteTask={this.handleDeleteTask}
          editTask={this.setEditTask}
        />
      </React.Fragment>
    );
  }
}

export default Todo;
