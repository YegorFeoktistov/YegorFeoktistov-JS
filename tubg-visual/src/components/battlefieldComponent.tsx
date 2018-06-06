import { inject, observer } from "mobx-react";
import * as React from 'react';
import { BulletComponent } from "./bulletComponent";
import { FinalArea } from "./finalArea";
import { LivingArea } from "./livingArea";
import { IBattlefieldProps } from "./propsInterfaces";
import "./style.css";
import { TankComponent } from "./tankComponent";
import { Simulation } from "../stores/simulation";
import { action } from "mobx";

@inject('bfStore')
@observer
export class BattlefieldComponent extends React.Component<IBattlefieldProps, {}> {
  private simulation: Simulation;

  public constructor(props: IBattlefieldProps) {
    super(props);

    const { bfStore } = props;
    bfStore.setBattlefieldSize(50, 50);

    this.simulation = new Simulation();
    this.simulation.customEvent.subscribe((data) => {
      bfStore.setSimulationData(data.tankList, data.bulletList, data.currentZoneShape, data.finalZoneShape);
    });
  }

  public componentDidMount() {
    this.simulation.start();
  }

  public render() {
    const { bfStore } = this.props;

    const battlefieldStyle = {
      width: `${bfStore.battlefieldStyle.width}px`,
      height: `${bfStore.battlefieldStyle.height}px`,
      top: `${bfStore.battlefieldStyle.top}px`,
      left: `${bfStore.battlefieldStyle.left}px`
    };

    const tanks = bfStore.tankStoreList.map((tankStore) => {
      return <TankComponent key={tankStore.id} tankStore={tankStore} />
    });

    const bullets = bfStore.bulletStoreList.map((bulletStore) => {
      return <BulletComponent key={bulletStore.id} bulletStore={bulletStore} />
    });

    return (
      <div className="bf-container">
        <div
          className="bf"
          style={battlefieldStyle}
          onWheel={bfStore.onWheel}
          onMouseDown={bfStore.onMouseDown}
          onMouseUp={bfStore.onMouseUp}
          onMouseMove={bfStore.onMouseMove}
        >
          <div className="dead-area" />
          <LivingArea />
          <FinalArea />
          {tanks}
          {bullets}
        </div>
        <label className="range-label">
          <p className="range-label__text">
            Change speed
          </p>
          <input
            className="slider"
            type="range"
            min="10"
            max="2000"
            defaultValue="1000"
            step="1"
          />
        </label>
      </div>
    )
  }
}