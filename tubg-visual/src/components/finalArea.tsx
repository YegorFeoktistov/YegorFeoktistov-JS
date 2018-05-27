import { inject, observer } from "mobx-react";
import * as React from 'react';
import { IBattlefieldProps } from "./reactInterfaces";
import "./style.css";

@inject('bfStore')
@observer
export class FinalArea extends React.Component<IBattlefieldProps, {}> {
  public render() {
    const { bfStore } = this.props;

    return (
      <div className="final-area" style={bfStore.finalAreaStyle} />
    );
  }
}