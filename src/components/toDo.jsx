import React, { Component } from "react";
import "./toDo.css";
import "bootstrap/dist/css/bootstrap.css";
import Tasklist from "./taskList";
class Todo extends Component {
  state = {
    tasks: [],
    newTask: "",
    confirm: false,
    current_task: null
  };

  handleInputTask = event => {
    this.setState({ newTask: event.target.value });
  };

  handleAddTask = () => {
    if (this.state.newTask === "") {
      alert("Please enter a valid task");
      return;
    }
    if (this.state.tasks.includes(this.state.newTask)) {
      alert("You have already written this task");
      return;
    }
    this.setState(state => {
      const tasks = state.tasks.concat(this.state.newTask);

      return { newTask: "", tasks, value: "" };
    });
  };
  handleDeleteTask = () => {
    let abbr = this.state;
    let ind = abbr.tasks.indexOf(abbr.current_task);
    this.setState(state => {
      state.confirm = false;
      const remainingTasks = state.tasks.splice(ind, 1);

      return {
        remainingTasks
      };
    });
  };
  handleConfirmationWindow = () => {
    this.setState({ confirm: !this.state.confirm });
  };

  handleConfirmationWindowWithTask = task => {
    console.log(this.state.confirm);
    this.setState({ current_task: task, confirm: true });
    console.log(this.state.confirm);
  };

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.confirm}</h1>
        <h1 className="header">Welcome to Your Task Manager</h1>
        <br />
        <hr />
        {this.state.tasks.length === 0 && (
          <p className="container">You have no task. Please add one</p>
        )}
        <br />
        <Tasklist />
        <div className="divv">
          <input
            disabled={this.state.confirm}
            className="inputarea"
            type="text"
            value={this.state.newTask}
            name="newTask"
            onChange={this.handleInputTask}
          />

          <button
            className="button"
            disabled={this.state.confirm}
            onClick={this.handleAddTask}
          >
            Add Task
          </button>
        </div>
        <hr />
        <div>
          <ul className="list">
            {this.state.tasks.map(task => (
              <li key={task} className="innerlist">
                {task}
                <button
                  className="button"
                  disabled={this.state.confirm}
                  onClick={() =>
                    /*this.handleDeleteTask(task)*/ this.handleConfirmationWindowWithTask(
                      task
                    )
                  }
                >
                  Delete
                </button>
                <hr />
              </li>
            ))}
          </ul>
        </div>
        <br />
        {this.state.confirm === true && (
          <div
            className="popup"
            id="exampleModal"
            //tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Warning! You are about to delete a task
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.handleConfirmationWindow()}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h4>Do you really want to delete this task?</h4>
                  {<p className="confirm_area">{this.state.current_task}</p>}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => this.handleConfirmationWindow()}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => this.handleDeleteTask()}
                    className="btn btn-danger"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Todo;
