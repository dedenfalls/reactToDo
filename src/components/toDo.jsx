/* eslint-disable linebreak-style */
/* eslint-disable no-alert */

import React, { Component } from 'react';
import './toDo.css';
import 'bootstrap/dist/css/bootstrap.css';
import uuid from 'uuid';
import AddTask from './addTask';
import TaskList from './taskList';
import Header from './header';
import db from '../firebase';


class Todo extends Component {
  state = {
    editMode: false,
    toBeEdited: undefined,
    newEditRequest: false,
  };


  toggleEditMode = (mode) => {
    this.setState({ editMode: mode });
  };

  handleAddTask = (newTaskValue) => {
    if (newTaskValue === '') {
      alert('Please enter a valid task');
      return;
    }
    db.collection('Tasks').add({ id: uuid(), value: newTaskValue });
  };

  handleDeleteTask = (taskId) => {
    db.collection('Tasks').where('id', '==', taskId).get().then((snapShot) => {
      if (snapShot.empty) {
        alert('No Matching Task');
      } else {
        db.collection('Tasks').doc(snapShot.docs[0].id).delete();
      }
    });

    // db.collection('Tasks').where().delete();


    // const ind = tasks.findIndex(element => element.id === taskId);
    // tasks.splice(ind, 1);
    this.setState({
      editMode: false,
    });
  };

  setEditTask = (task) => {
    //  console.log(`${JSON.stringify(task)} set edit`);
    this.setState({ toBeEdited: task, editMode: true, newEditRequest: true });
  };

  handleEditTask = (taskValue) => {
    if (taskValue !== '') {
      const { toBeEdited } = this.state;

      db.collection('Tasks').where('id', '==', toBeEdited.id).get().then((snapShot) => {
        if (snapShot.empty) {
          alert('No Matching Task');
        } else {
          db.collection('Tasks').doc(snapShot.docs[0].id).update({ value: taskValue });
        }
      });
    } else if (taskValue === '') {
      alert('You entered an empty task');
    }

    this.cancelEdit();
  };

  cancelEdit = () => {
    this.setState({ toBeEdited: undefined, editMode: false });
  };

  unsetEditRequest = () => {
    this.setState({ newEditRequest: false });
  }

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
          newEditRequest={state.newEditRequest}
          unsetEditRequest={this.unsetEditRequest}
        />

        <TaskList
          deleteTask={this.handleDeleteTask}
          editTask={this.setEditTask}
        />
      </React.Fragment>
    );
  }
}

export default Todo;
