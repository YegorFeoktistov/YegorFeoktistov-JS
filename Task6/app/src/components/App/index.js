import React, { Component } from "react";
import TaskList from "../TaskList";

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
		if (e.which === 13 || e.keyCode === 13) {
			e.preventDefault();
			this.setState({
				text: "",
				textList: [...this.state.textList, this.state.text]
			});
		}
		else return;
	};

	render() {
		return (
			<div>
				<h1>Type task here!</h1>
				<input type="text" onChange={this.onChange} onKeyPress={this.onSubmit} />
				<TaskList textList={this.state.textList} />
			</div>
		);
	}
}

export default App;