import React from "react";
import Task from "../Task";
import "./style.css";

export default function TaskList(props) {
	return (
		<ul className="task-list">
			{
				props.textList.map((value, index) => {
					return (
						<li key={index} className="task-list__element"><Task index={index} text={value} /></li>
					);
				})
			}
		</ul>
	);
}