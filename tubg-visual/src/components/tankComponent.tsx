import { observer } from "mobx-react";
import * as React from 'react';
import { ITankComponentProps } from "./reactInterfaces";
import "./style.css";

@observer
export class TankComponent extends React.Component<ITankComponentProps, {}> {
  public render() {
    const { tankStore } = this.props;

    const tankDeadClassName: string = (tankStore.health <= 0) ? " tank_dead" : "";

    console.log(`-- tank ${tankStore.id}`);

    return (
      <div style={tankStore.tankStyle} className={"tank" + tankDeadClassName} />
    );
  }
}