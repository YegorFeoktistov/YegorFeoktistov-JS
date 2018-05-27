import { inject, observer } from "mobx-react";
import * as React from 'react';
import { IDefaultProps } from "./reactInterfaces";
import "./style.css";

@inject('bfStore')
@observer
export class LivingArea extends React.Component<IDefaultProps, {}> {
  public render() {
    const { bfStore } = this.props;

    return (
      <div className="living-area" style={bfStore.livingAreaStyle} />
    );
  }
}