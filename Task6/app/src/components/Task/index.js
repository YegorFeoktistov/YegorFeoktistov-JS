/*
  когда я передавал в onDelete index из state, ничего не работало, т.к. index почему то не менялся, хотя я в app делал updateIndexes и менял передаваемый state
*/

import React, { Component } from "react";
import "./style.css";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      id: `task-checkbox-${props.id}`,
      text: props.text,
      checked: false,
      edit: false
    };
  }

  onValueChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onValueSubmit = (e) => {
    if ((e.which === 13 || e.keyCode === 13) && e.target.value !== "") {
      e.preventDefault();

      if (this.props.onEditValueSubmit.bind(null, this.state.text, this.props.index)()) {
        e.target.value = "";

        this.setState({
          edit: !this.state.edit
        });
      }
    }
    else return;
  };

  onTaskCheck = () => {
    if (!this.state.checked) { // this handler is called before onChange, and "checked" value has not been changed yet
      if(window.confirm(`You've completed task "${this.state.text}". Delete task?`))
        this.props.onDelete.bind(null, this.props.index)();
    }
  };

  onCheckboxChange = () => {
    this.setState({
      checked: !this.state.checked
    })
  };

  onEditClick = () => {
    if (this.state.text !== "") {
      this.setState({
        edit: !this.state.edit
      });
    }
  };

  render() {
    let taskValue;

    if (this.state.edit) {
      taskValue = <input
        type="text"
        className="task__text-input"
        value={this.state.text}
        onChange={this.onValueChange}
        onKeyPress={this.onValueSubmit}
      />;
    }
    else {
      taskValue = <label
        htmlFor={this.state.id}
        className="task__checkbox-label"
        onClick={this.onTaskCheck}>
        {this.state.text}
      </label>;
    }

    return (
      <div className="task">
        <div className="task__content">
          <div className="task__checkbox-section">
            <input
              type="checkbox"
              className="task__checkbox-input"
              id={this.state.id}
              onChange={this.onCheckboxChange}
              defaultChecked={this.state.checked}
            />
            <label
              htmlFor={this.state.id}
              className="task__checkmark"
              onClick={this.onTaskCheck}>
            </label>
            {taskValue}
          </div>
          <div className="task__control-section">
            <div className="task__edit-button" onClick={this.onEditClick}>
              <i className="fas fa-pencil-alt"></i>
            </div>
            <div
              htmlFor="task-checkbox"
              className="task__delete-button"
              onClick={this.props.onDelete.bind(null, this.props.index)}>
              &times;
            </div>
          </div>
        </div>
      </div>
    );
  }
}