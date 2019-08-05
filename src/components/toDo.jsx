import React, { Component } from "react";
import "./toDo.css";
class Todo extends Component {
  state = {
    tasks: [],
    newTask: ""
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
      return { tasks, value: "" };
    });
    this.setState({ newTask: "" });
  };
  handleDeleteTask = task => {
    let ind = this.state.tasks.indexOf(task);
    this.setState(state => {
      const remainingTasks = state.tasks.splice(ind, 1);

      return {
        remainingTasks
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="header">Welcome to Your Task Manager</h1>
        <br />

        {this.state.tasks.length === 0 && (
          <p className="container">You have no task. Please add one</p>
        )}
        <br />
        <div className="divv">
          <input
            className="inputarea"
            type="text"
            value={this.state.newTask}
            name="newTask"
            onChange={this.handleInputTask}
          />

          <button className="button" onClick={this.handleAddTask}>
            Add Task
          </button>
        </div>
        <div>
          <ul className="list">
            {this.state.tasks.map(task => (
              <li key={task} className="innerlist">
                {task}
                <button
                  className="button"
                  onClick={() => this.handleDeleteTask(task)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Todo;
