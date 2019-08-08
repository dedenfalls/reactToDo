import React, { Component } from "react";
import "./toDo.css";
import PropTypes from "prop-types";
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: "",
      editText: "",
      propsNotCopied: true
    };
  } /*
  componentDidUpdate = prevProps => {
    if (this.props.edit !== prevProps.edit) {
      this.setState({ editText: this.props.edit });
    }
  };*/
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.edit !== prevState.editText && prevState.propsNotCopied) {
      return { editText: nextProps.edit, propsNotCopied: false };
    }
    return null;
  }
  handleInputTask = event => {
    this.setState({ newTask: event.target.value });
  };
  handleEditTask = event => {
    this.setState({ editText: event.target.value });
  };
  handleAddTask = () => {
    this.props.addNew(this.state.newTask);
    this.setState({ newTask: "" });
  };
  finishEdit = () => {
    this.setState({ newTask: "", editText: "", propsNotCopied: true });
    this.props.completeEdit(this.state.editText);
  };
  cancelEditing = () => {
    this.setState({ newTask: "", editText: "", propsNotCopied: true });
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
            value={this.state.editText}
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
  edit: PropTypes.string,
  completeEdit: PropTypes.func,
  cancel: PropTypes.func
};

export default AddTask;
