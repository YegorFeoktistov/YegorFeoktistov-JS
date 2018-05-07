import React from "react";
import "./style.css";

export default function Task(props) {
	const id = `task-checkbox-${props.index}`;
	return (
		<div className="task">
			<div className="task__content">
				<div className="task__checkbox-section">
					<input type="checkbox" className="task__checkbox-input" id={id}/>
					<label for={id} class="task__checkmark"></label>
					<label for={id} class="task__checkbox-label">{props.text}</label>
				</div>
				<span for="task-checkbox" class="task__delete-button">&times;</span>
			</div>
		</div>
	);
}