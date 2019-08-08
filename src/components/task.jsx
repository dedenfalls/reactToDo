import React, { Component } from "react";

class Task extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.value} ID:
        {this.props.id}
      </div>
    );
  }
}

export default Task;
