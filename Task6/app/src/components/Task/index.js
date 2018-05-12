import React, { Component } from "react";
import "./style.css";

const ENTER_KEY_CODE = 13;

export class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      edit: false
    };
  }

  componentDidUpdate() {
    if (this.state.edit)
      document.querySelector(".task__text-input").focus();
  }

  onValueChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onValueSubmit = (e) => {
    if ((e.which === ENTER_KEY_CODE || e.keyCode === ENTER_KEY_CODE) && e.target.value !== "") {
      e.preventDefault();

      if (this.props.onEditValueSubmit(this.state.text, this.props.id)) {
        e.target.value = "";

        this.setState({
          edit: !this.state.edit
        });
      }
    }
    else return;
  };

  onTaskCheck = () => {
    if (!this.props.checked) { // this handler is called before onChange-event handler on checkbox , and "checked" value has not been changed yet
      if(window.confirm(`You've completed task "${this.state.text}". Delete task?`))
        this.props.onTaskDelete(this.props.id);
    }
  };

  onCheckboxChange = () => {
    this.props.onTaskCheckboxChange(this.props.id);
  };

  onEditClick = () => {
    if (this.state.text !== "") {
      this.setState({
        edit: !this.state.edit
      });
    }
  };

  render() {
    const htmlId = `task-checkbox-${this.props.id}`;

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
        htmlFor={htmlId}
        className="task__checkbox-label"
        onClick={this.onTaskCheck}
      >
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
              id={htmlId}
              onChange={this.onCheckboxChange}
              defaultChecked={this.props.checked}
            />
            <label
              htmlFor={htmlId}
              className="task__checkmark"
              onClick={this.onTaskCheck}>
            </label>
            {taskValue}
          </div>
          <div className="task__control-section">
            <div
              className="task__edit-button"
              htmlFor={htmlId}
              onClick={this.onEditClick}
            >
              <i className="fas fa-pencil-alt"></i>
            </div>
            <div
              htmlFor="task-checkbox"
              className="task__delete-button"
              onClick={() => this.props.onTaskDelete(this.props.id)}
            >
              &times;
            </div>
          </div>
        </div>
      </div>
    );
  }
}