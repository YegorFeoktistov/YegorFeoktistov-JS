import { inject, observer } from "mobx-react";
import * as React from 'react';
import { FinalArea } from "./finalArea";
import { LivingArea } from "./livingArea";
import { IDefaultProps } from "./reactInterfaces";
import "./style.css";
import { TankComponent } from "./tankComponent";


@inject('bfStore')
@observer
export class BattlefieldComponent extends React.Component<IDefaultProps, {}> {
  public render() {
    const { bfStore } = this.props;

    const tanks = bfStore.tankStoreList.map((tankStore) => {
      return <TankComponent key={tankStore.id} tankStore={tankStore} />
    })

    return (
      <div className="bf" style={bfStore.battlefieldStyle} >
        <div className="dead-area" />
        <LivingArea />
        <FinalArea />
        {tanks}
      </div>
    )
  }
}