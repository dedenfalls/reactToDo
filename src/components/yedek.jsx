import React, { Component } from "react";
import "./toDo.css";
import PropTypes from "prop-types";
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: ""
    };
  }
  handleInputTask = event => {
    this.setState({ newTask: event.target.value });
  };
  handleEditTask = event => {
    this.props.editFunc(event.target.value);
  };
  handleAddTask = () => {
    this.props.addNew(this.state.newTask);
    this.setState({ newTask: "" });
  };
  finishEdit = () => {
    this.setState({ newTask: "" });
    this.props.completeEdit();
  };
  cancelEditing = () => {
    this.setState({ newTask: "" });
    this.props.cancel();
  };

  render() {
    return (
      <div className="divv">
        {this.props.mode === false && (
          <input
            className="inputarea"
            type="text"
            value={this.state.newTask}
            name="newTask"
            onChange={this.handleInputTask}
          />
        )}
        {this.props.mode === true && (
          <input
            className="inputarea"
            type="text"
            value={this.props.editing}
            name="editTask"
            onChange={this.handleEditTask}
          />
        )}
        {!this.props.mode && (
          <button className="button" onClick={() => this.handleAddTask()}>
            Add Task
          </button>
        )}
        {this.props.mode && (
          <button className="button" onClick={() => this.finishEdit()}>
            Edit Task
          </button>
        )}
        {this.props.mode && (
          <button className="button" onClick={() => this.cancelEditing()}>
            Cancel
          </button>
        )}
      </div>
    );
  }
}
AddTask.propTypes = {
  addNew: PropTypes.func,
  editing: PropTypes.string,
  mode: PropTypes.bool,
  completeEdit: PropTypes.func,
  cancel: PropTypes.func,
  toggle: PropTypes.func
};

export default AddTask;
