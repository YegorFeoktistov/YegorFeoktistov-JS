import React, { Component } from "react";
import TaskList from "../TaskList";
import "./style.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: "",
			textList: []
		};
	}

	onChange = (e) => {
		this.setState({text: e.target.value });
	}

	onSubmit = (e) => {
		if ((e.which === 13 || e.keyCode === 13) && e.target.value !== "") {
			e.preventDefault();
			this.setState({
				textList: [...this.state.textList, this.state.text]
			});
			e.target.value = "";
		}
		else return;
	};

	render() {
		return (
			<div className="todo-list todo-list_shadow">
				<div className="todo-list__content">
					<h1 className="todo-list__header">Type task here!</h1>
					<input type="text" className="todo-list__text-input" onChange={this.onChange} onKeyPress={this.onSubmit} />
					<div className="todo-list__task-list">
						<TaskList textList={this.state.textList} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;