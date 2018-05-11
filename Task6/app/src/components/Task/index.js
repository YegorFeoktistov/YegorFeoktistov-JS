import React, { Component } from "react";
import "./style.css";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      id: `task-checkbox-${props.index}`,
      text: props.text
    };
  }
  render() {
    return (
      <div className="task">
        <div className="task__content">
          <div className="task__checkbox-section">
            <input type="checkbox" className="task__checkbox-input" id={this.state.id} />
            <label htmlFor={this.state.id} className="task__checkmark"></label>
            <label htmlFor={this.state.id} className="task__checkbox-label">{this.state.text}</label>
          </div>
          <span htmlFor="task-checkbox" className="task__delete-button" onClick={this.props.onDelete.bind(null, this.state.index)} >&times;</span>
        </div>
      </div>
    );
  }
}