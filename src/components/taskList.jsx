/* eslint-disable linebreak-style */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './toDo.css';
import PropTypes from 'prop-types';
import Task from './task';

class TaskList extends React.Component {
  state = {
    confirm: false,
    currentTaskId: null,
  };

  handleEdit = (task) => {
    const { editTask } = this.props;
    editTask(task);
  };

  handleConfirmationWindow = () => {
    const { confirm } = this.state;
    this.setState({ confirm: !confirm });
  };

  handleConfirmationWindowWithTask = (task) => {
    this.setState({ currentTaskId: task, confirm: true });
  };

  handleDelete = () => {
    const { deleteTask } = this.props;
    const { currentTaskId } = this.state;
    deleteTask(currentTaskId);
    this.handleConfirmationWindow();
  };

  render() {
    const { enteredTask } = this.props;
    const { state } = this;
    return (
      <>
        {enteredTask.length === 0 && (
          <p className="container">You have no task. Please add one</p>
        )}
        <ul className="list">
          {enteredTask.map(task => (
            <li key={task.id} className="innerlist">
              <Task value={task.value} id={task.id} />
              <button
                className="button"
                type="button"
                onClick={() => this.handleConfirmationWindowWithTask(task.id)}
              >
                Delete
              </button>

              <button className="button" type="button" onClick={() => this.handleEdit(task)}>
                Edit Task
              </button>

              <hr />
            </li>
          ))}
        </ul>
        {state.confirm === true && (
          <div
            className="popup"
            id="exampleModal"
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
                    onClick={this.handleConfirmationWindow}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h4>Do you really want to delete this task?</h4>
                  {<p className="confirm_area">{enteredTask.find(task => task.id === state.currentTaskId).value}</p>}
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
                    onClick={() => this.handleDelete()}
                    className="btn btn-danger"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

TaskList.propTypes = {
  enteredTask: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, value: PropTypes.string })),
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
};
TaskList.defaultProps = {

  enteredTask: null,
  deleteTask: undefined,
  editTask: undefined,
};
export default TaskList;
