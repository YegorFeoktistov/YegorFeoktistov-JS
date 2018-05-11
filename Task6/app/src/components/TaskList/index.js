import React from "react";
import Task from "../Task";
import "./style.css";
import getKey from "./../../keyGenerator";

export default function TaskList(props) {
  return (
    <ul className="task-list">
      {
        props.textList.map((value, index) => {
          return (
            <li key={getKey()} className="task-list__element"><Task index={index} text={value} onDelete={props.onDelete} /></li>
          );
        })
      }
    </ul>
  );
}