import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./toDo.css";
import PropTypes from "prop-types";

class TaskList extends Component {
  state = {
    tasks: [],
    confirm: false,
    current: null
  };

  handleEdit = task => {
    this.props.editTask(task);
    this.props.toggleEdit(true);
  };

  handleConfirmationWindow = () => {
    this.setState({ confirm: !this.state.confirm });
  };

  handleConfirmationWindowWithTask = task => {
    this.setState({ current: task, confirm: true });
  };
  handleDelete = () => {
    this.props.toggleEdit(false);
    this.props.deleteTask(this.state.current);
    this.handleConfirmationWindow();
  };

  render() {
    return (
      <div>
        {this.props.taskLength === 0 && (
          <p className="container">You have no task. Please add one</p>
        )}
        <ul className="list">
          {this.props.enteredTask.map(task => (
            <li key={task} className="innerlist">
              {task}
              <button
                className="button"
                onClick={() => this.handleConfirmationWindowWithTask(task)}
              >
                Delete
              </button>

              <button className="button" onClick={() => this.handleEdit(task)}>
                Edit Task
              </button>

              <hr />
            </li>
          ))}
        </ul>
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
                    onClick={this.handleConfirmationWindow}
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
      </div>
    );
  }
}

TaskList.propTypes = {
  toggleEdit: PropTypes.func,
  enteredTask: PropTypes.array,
  taskLength: PropTypes.number,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func
};

export default TaskList;
