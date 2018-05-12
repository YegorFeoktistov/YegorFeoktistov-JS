import React from "react";
import { Task } from "../Task";
import "./style.css";

export function TaskList(props) {
  const onDragStart = (e, index) => {
    e.dataTransfer.setData('text', index);
    e.currentTarget.style.cursor = 'grabbing'
  };

  const allowDrop = e => {
    e.preventDefault();
  };

  const onDrop = e => {
    e.preventDefault();
    const index = e.dataTransfer.getData('text');
    const destination = calculateDestination(e, props.taskList.length);

    props.onTaskMove(index, destination);
  };

  const calculateDestination = (e, length) => {
    const taskCoef = 1 / length;
    const dropCoef = (e.pageY - e.currentTarget.getBoundingClientRect().top) / e.currentTarget.offsetHeight;

    const destination = Math.ceil(dropCoef / taskCoef) - 1;

    return destination;
  }

  return (
    <ul className="task-list" onDrop={onDrop} onDragOver={allowDrop}>
      {
        props.taskList.map((item, index) => {
          return (
            <li key={item.id}
              className="task-list__element"
              onDragStart={e => onDragStart(e, index)}
              draggable>
              <Task
                id={item.id}
                text={item.text}
                checked={item.checked}
                onTaskDelete={props.onTaskDelete}
                onEditValueSubmit={props.onEditValueSubmit}
                onTaskCheckboxChange={props.onTaskCheckboxChange}
              />
            </li>
          );
        })
      }
    </ul>
  );
}