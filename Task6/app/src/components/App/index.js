import React, { Component } from "react";
import TaskList from "../TaskList";
import "./style.css";
import getKey from "./../../keyGenerator";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      taskList: []
    };
  }

  onChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  onSubmit = (e) => {
    if ((e.which === 13 || e.keyCode === 13) && e.target.value !== "") {
      e.preventDefault();

      if (this.checkForExistingValue(e.target.value)) {
        return;
      }

      const task = {
        id: getKey(),
        text: this.state.inputText,
        index: this.state.taskList.length
      };

      this.setState({
        taskList: [...this.state.taskList, task]
      });

      e.target.value = "";
    }
    else return;
  };

  onEditValueSubmit = (value, index) => {
    if (this.checkForExistingValue(value)) {
      return false;
    }
    else {
      const newArray = [...this.state.taskList];
      newArray[index].text = value;

      this.setState({
        taskList: [...newArray]
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

  onDelete = (index) => {
    const newArray = [...this.state.taskList];
    newArray.splice(index, 1);
    this.updateTasksIndexes(newArray);
    this.setState({
      taskList: [...newArray]
    });
  };

  updateTasksIndexes = (taskList) => {
    taskList.forEach((item, i) => {
      item.index = i;
    });
  };

  moveTask = (index, destination) => {
		const newArray = [...this.state.taskList];
		newArray.splice(destination, 0, newArray.splice(index, 1)[0]);
		this.setState({
      taskList: [...newArray]
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
            onChange={this.onChange}
            onKeyPress={this.onSubmit}
          />
          <div className="todo-list__task-list">
            <TaskList
              taskList={this.state.taskList}
              onDelete={this.onDelete}
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