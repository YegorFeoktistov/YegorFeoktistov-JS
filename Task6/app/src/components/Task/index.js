import React from "react";
import "./style.css";

export default function Task(props) {
	const id = `task-checkbox-${props.index}`;
	return (
		<div className="task">
			<div className="task__content">
				<div className="task__checkbox-section">
					<input type="checkbox" className="task__checkbox-input" id={id}/>
					<label htmlFor={id} className="task__checkmark"></label>
					<label htmlFor={id} className="task__checkbox-label">{props.text}</label>
				</div>
				<span htmlFor="task-checkbox" className="task__delete-button">&times;</span>
			</div>
		</div>
	);
}