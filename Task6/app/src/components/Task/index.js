import React from "react";

export default function Task(props) {
	return (
		<div>
			<input type="checkbox" />
			<span>{props.text}</span>
		</div>
	);
}