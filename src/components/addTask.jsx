import React, { Component } from "react";
import "./toDo.css";
import PropTypes from "prop-types";
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTextId: null,
      newTask: "",
      editText: "",
      propsNotCopied: true
    };
  } /*
  componentDidUpdate = prevProps => {
    if (
      this.props.taskToBeEdited !== prevProps.taskToBeEdited &&
      this.props.isEditMode
    ) {
      this.setState({ editText: this.props.taskToBeEdited.value });
    }
  };*/

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      (!prevState.editText ||
        nextProps.taskToBeEdited.id !== prevState.editTextId) &&
      nextProps.taskToBeEdited &&
      nextProps.isEditMode
    ) {
      return {
        editText: nextProps.taskToBeEdited.value,
        editTextId: nextProps.taskToBeEdited.id
      };
    }
    return null;
  }
  handleInput = event => {
    this.setState({ newTask: event.target.value });
  };
  handleEdit = event => {
    this.setState({ editText: event.target.value });
  };
  handleAdd = () => {
    this.props.addNew(this.state.newTask);
    this.setState({ newTask: "" });
  };
  finishEdit = () => {
    this.props.completeEdit(this.state.editText);
    this.setState({ newTask: "", editText: "", propsNotCopied: true });
  };
  cancelEditing = () => {
    this.props.cancel();
    this.setState({ newTask: "", editText: "", propsNotCopied: true });
  };

  render() {
    return (
      <div className="divv">
        <input
          className="inputarea"
          type="text"
          value={this.state[this.props.isEditMode ? "editText" : "newTask"]}
          onChange={this.props.isEditMode ? this.handleEdit : this.handleInput}
        />

        {!this.props.isEditMode && (
          <button className="button" onClick={() => this.handleAdd()}>
            Add Task
          </button>
        )}
        {this.props.isEditMode && (
          <button className="button" onClick={() => this.finishEdit()}>
            Edit Task
          </button>
        )}
        {this.props.isEditMode && (
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
  edit: PropTypes.object,
  completeEdit: PropTypes.func,
  cancel: PropTypes.func
};

export default AddTask;
