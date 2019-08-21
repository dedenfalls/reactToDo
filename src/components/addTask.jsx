/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import './toDo.css';
import PropTypes from 'prop-types';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      editTextId: null,
      newTask: '',
      editText: '',
    };
  }
  /*  componentDidUpdate = prevProps => {
    if (
      this.props.taskToBeEdited !== prevProps.taskToBeEdited &&
      this.props.isEditMode
    ) {
      this.setState({ editText: this.props.taskToBeEdited.value });
    }
  };  */

  componentDidUpdate() {
    this.inputRef.current.focus();
  }

  static getDerivedStateFromProps(nextProps) {
    if (
      nextProps.taskToBeEdited
      && nextProps.isEditMode && nextProps.newEditRequest
    ) {
      nextProps.unsetEditRequest();
      return {
        editText: nextProps.taskToBeEdited.value,
        editTextId: nextProps.taskToBeEdited.id,
      };
    }
    return null;
  }

  handleInput = (event) => {
    this.setState({ newTask: event.target.value });
  };

  handleEdit = (event) => {
    if (event.target.value === '') {
      this.setState({ editText: event.target.value });
      return;
    }
    this.setState({ editText: event.target.value });
  };

  handleAdd = () => {
    const { addNew } = this.props;
    const { newTask } = this.state;
    addNew(newTask);

    this.setState({ newTask: '' });
    this.inputRef.current.focus();
  };

  finishEdit = () => {
    const { completeEdit } = this.props;
    const { editText } = this.state;
    completeEdit(editText);
    this.setState({ newTask: '', editText: '' });
    this.inputRef.current.focus();
  };

  cancelEditing = () => {
    const { cancel } = this.props;
    cancel();
    this.setState({ editText: '' });
    this.inputRef.current.focus();
  };

  handleInputKeyDown = (event) => {
    const { isEditMode } = this.props;
    if (event.key === 'Enter') {
      if (isEditMode) {
        this.finishEdit(event);
      } else {
        this.handleAdd(event);
      }
    } else if (event.keyCode === 27) {
      if (isEditMode) {
        this.cancelEditing();
      } else {
        this.setState({ newTask: '' });
      }
    }
  };

  render() {
    const { state } = this;
    const { isEditMode } = this.props;
    return (
      <div className="divv">
        <input
          className="inputarea"
          type="text"
          name="input"
          ref={this.inputRef}
          value={state[isEditMode ? 'editText' : 'newTask']}
          onKeyDown={this.handleInputKeyDown}
          onChange={isEditMode ? this.handleEdit : this.handleInput}
        />

        {isEditMode && (
          <button className="button" type="button" onClick={() => this.finishEdit()}>
            Edit Task
          </button>
        )}
        {!isEditMode && (
          <button className="button" type="submit" onClick={() => this.handleAdd()}>
            Add Task
          </button>
        )}
        {isEditMode && (
          <button className="button" type="button" onClick={() => this.cancelEditing()}>
            Cancel
          </button>
        )}
      </div>
    );
  }
}
AddTask.propTypes = {
  addNew: PropTypes.func,
  taskToBeEdited: PropTypes.shape({ id: PropTypes.string, value: PropTypes.string }),
  isEditMode: PropTypes.bool,
  completeEdit: PropTypes.func,
  cancel: PropTypes.func,
};
AddTask.defaultProps = {
  addNew: undefined,
  taskToBeEdited: undefined,
  isEditMode: false,
  completeEdit: undefined,
  cancel: undefined,
};

export default AddTask;
