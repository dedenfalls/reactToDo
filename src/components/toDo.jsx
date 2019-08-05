import React, { Component } from "react";

class Todo extends Component {
  state = {
    tasks: [],
    newTask: null
  };
  styles = {
    fontSize: 100,
    fontweight: "bold",
    margin: 10
  };
  handleInputTask = event => {
    console.log(event.target.value);
    this.setState({ newTask: event.target.value });
  };

  handleAddTask = () => {
    if (this.state.newTask == null) {
      alert("please enter a valid task");
      return;
    }
    this.setState(state => {
      const tasks = state.tasks.concat(this.state.newTask);
      return { tasks, value: "" };
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={this.styles}>hi</h1>
        {}
        {this.state.tasks.length === 0 && "please add a task"}
        <input type="text" name="newTask" onChange={this.handleInputTask} />
        <button onClick={this.handleAddTask}>Add Task</button>
        <ul>
          {this.state.tasks.map(task => (
            <li key={task}>
              {task} <button>delete</button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Todo;
