/* eslint-disable linebreak-style */
/* eslint-disable no-alert */

import React, { Component } from 'react';
import './toDo.css';
import 'bootstrap/dist/css/bootstrap.css';
import uuid from 'uuid';
import AddTask from './addTask';
import TaskList from './taskList';
import Header from './header';


class Todo extends Component {
  state = {
    tasks: [],
    editMode: false,
    toBeEdited: undefined,
  };

  toggleEditMode = (mode) => {
    this.setState({ editMode: mode });
  };

  handleAddTask = (newTaskValue) => {
    if (newTaskValue === '') {
      alert('Please enter a valid task');
      return;
    }
    const { tasks } = this.state;
    this.setState({
      tasks: [...tasks, { id: uuid(), value: newTaskValue }],
    });
  };

  handleDeleteTask = (taskId) => {
    const { tasks } = this.state;

    const ind = tasks.findIndex(element => element.id === taskId);
    // findIndex
    tasks.splice(ind, 1);
    this.setState({
      editMode: false,
    });
  };

  setEditTask = (task) => {
    //  console.log(`${JSON.stringify(task)} set edit`);
    this.setState({ toBeEdited: task, editMode: true });
  };

  handleEditTask = (taskValue) => {
    if (taskValue !== '') {
      const { toBeEdited } = this.state;
      const { tasks } = this.state;
      const newtasksarray = [...tasks];
      const index = tasks.indexOf(toBeEdited);
      newtasksarray[index] = { id: toBeEdited.id, value: taskValue };
      this.setState({ tasks: newtasksarray });
    } else if (taskValue === '') {
      alert('You entered an empty task');
    }

    this.setState({ toBeEdited: undefined, editMode: false });
  };

  cancelEdit = () => {
    this.setState({ toBeEdited: undefined, editMode: false });
  };

  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <Header />
        <AddTask
          addNew={this.handleAddTask}
          taskToBeEdited={state.toBeEdited}
          isEditMode={state.editMode}
          completeEdit={this.handleEditTask}
          cancel={this.cancelEdit}
        />

        <TaskList
          enteredTask={state.tasks}
          deleteTask={this.handleDeleteTask}
          editTask={this.setEditTask}
        />
      </React.Fragment>
    );
  }
}

export default Todo;
