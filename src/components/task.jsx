/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Task extends Component {
  state = {};

  render() {
    const { props } = this;
    return (
      <div>

        {props.value}
        ID:
        {props.id}
      </div>
    );
  }
}
Task.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
};
Task.defaultProps = {
  value: '',
  id: 0,
};

export default Task;
