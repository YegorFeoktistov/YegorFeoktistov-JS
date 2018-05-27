import { inject, observer } from "mobx-react";
import * as React from 'react';
import { BulletComponent } from "./bulletComponent";
import { FinalArea } from "./finalArea";
import { LivingArea } from "./livingArea";
import { IBattlefieldProps } from "./reactInterfaces";
import "./style.css";
import { TankComponent } from "./tankComponent";


@inject('bfStore')
@observer
export class BattlefieldComponent extends React.Component<IBattlefieldProps, {}> {
  public render() {
    const { bfStore } = this.props;

    const tanks = bfStore.tankStoreList.map((tankStore) => {
      return <TankComponent key={tankStore.id} tankStore={tankStore} />
    });

    const bullets = bfStore.bulletStoreList.map((bulletStore) => {
      return <BulletComponent key={bulletStore.id} bulletStore={bulletStore} />
    });

    return (
      <div className="bf" style={bfStore.battlefieldStyle} >
        <div className="dead-area" />
        <LivingArea />
        <FinalArea />
        {tanks}
        {bullets}
      </div>
    )
  }
}