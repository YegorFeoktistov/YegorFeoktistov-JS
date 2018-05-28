import { observer } from "mobx-react";
import * as React from 'react';
import { IBulletComponentProps } from "./reactInterfaces";
import "./style.css";

@observer
export class BulletComponent extends React.Component<IBulletComponentProps, {}> {
  public render() {
    const { bulletStore } = this.props;

    return (
      <div style={bulletStore.bulletStyle} className="bullet" />
    );
  }
}