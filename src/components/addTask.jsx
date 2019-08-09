import React, { Component } from "react";
import "./toDo.css";
import PropTypes from "prop-types";
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      editTextId: null,

      newTask: "",
      editText: ""
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
  componentDidMount() {
    this.inputRef.current.focus();
  }
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
    this.inputRef.current.focus();
  };
  finishEdit = () => {
    this.props.completeEdit(this.state.editText);
    this.setState({ newTask: "", editText: "" });
    this.inputRef.current.focus();
  };
  cancelEditing = () => {
    this.props.cancel();
    this.setState({ editText: "" });
    this.inputRef.current.focus();
  };

  handleInputKeyDown = event => {
    if (event.key === "Enter") {
      if (this.props.isEditMode) {
        this.finishEdit(event);
      } else {
        this.handleAdd(event);
      }
    } else if (event.keyCode === 27) {
      if (this.props.isEditMode) {
        this.cancelEditing();
      } else {
        this.setState({ newTask: "" });
      }
    }
  };

  render() {
    return (
      <div className="divv">
        <input
          className="inputarea"
          type="text"
          name="input"
          ref={this.inputRef}
          value={this.state[this.props.isEditMode ? "editText" : "newTask"]}
          onKeyDown={this.handleInputKeyDown}
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
  taskToBeEdited: PropTypes.object,
  isEditMode: PropTypes.bool,
  completeEdit: PropTypes.func,
  cancel: PropTypes.func
};

export default AddTask;
