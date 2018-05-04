import React from "react";
import Task from "../Task";

export default function TaskList(props) {
	return (
		<ul>
			{
				props.textList.map((value, index) => {
					return (
						<li key={index}><Task text={value} /></li>
					);
				})
			}
		</ul>
	);
}