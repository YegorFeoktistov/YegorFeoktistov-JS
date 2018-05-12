import React, { Component } from "react";
import TaskList from "../TaskList";
import "./style.css";
import getKey from "./../../keyGenerator";

const ENTER_KEY_CODE = 13;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      taskList: []
    };
  }

  onInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  onInputSubmit = (e) => {
    if ((e.which === ENTER_KEY_CODE || e.keyCode === ENTER_KEY_CODE) && e.target.value !== "") {
      e.preventDefault();

      if (this.checkForExistingValue(e.target.value)) {
        return;
      }

      const task = {
        id: getKey(),
        text: this.state.inputText
      };

      this.setState({
        taskList: [...this.state.taskList, task]
      });

      e.target.value = "";
    }
    else return;
  };

  onEditValueSubmit = (value, id) => {
    if (this.checkForExistingValue(value)) {
      return false;
    }
    else {
      const newArray = [...this.state.taskList];

      newArray.forEach(item => {
        if (item.id === id) {
          item.text = value;
          return;
        }
      });

      this.setState({
        taskList: newArray
      });

      return true;
    }
  }

  checkForExistingValue = (value) => {
    const result = this.state.taskList.some(item => item.text === value);

      if (result) {
        window.alert(`"${value}" task already exists!`);
        return true;
      }
      return false;
  };

  onTaskDelete = (id) => {
    const newArray = [...this.state.taskList];

    const deletedElement = newArray.find(item => {
      return item.id === id
    });

    newArray.splice(newArray.indexOf(deletedElement), 1);

    this.setState({
      taskList: newArray
    });
  };

  moveTask = (index, destination) => {
		const newArray = [...this.state.taskList];
		newArray.splice(destination, 0, newArray.splice(index, 1)[0]);
		this.setState({
      taskList: newArray
    });
	}

  render() {
    return (
      <div className="todo-list todo-list_shadow">
        <div className="todo-list__content">
          <h1 className="todo-list__header">Type task here!</h1>
          <input
            type="text"
            className="todo-list__text-input"
            onChange={this.onInputChange}
            onKeyPress={this.onInputSubmit}
          />
          <div className="todo-list__task-list">
            <TaskList
              taskList={this.state.taskList}
              onTaskDelete={this.onTaskDelete}
              onEditValueSubmit={this.onEditValueSubmit}
              onTaskMove={this.moveTask}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;