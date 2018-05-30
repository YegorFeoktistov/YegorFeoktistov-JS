import { computed, observable } from "mobx";
import { SCALE_COEF } from "./battlefieldStore";

export class TankStore {
  @observable
  public id: number;
  @observable
  public x: number;
  @observable
  public y: number;
  @observable
  public health: number;
  @observable
  public direction: number;

  public constructor(id: number, x: number, y: number, health: number, direction: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = health;
    this.direction = direction;
  }

  @computed
  public get tankStyle() {
    const top = this.y * SCALE_COEF;
    const left = this.x * SCALE_COEF;
    const angle = this.health <= 0 ? 0 : this.direction;

    return {
      width: `${SCALE_COEF}px`,
      height: `${SCALE_COEF}px`,
      top: `${top}px`,
      left: `${left}px`,
      transform: `rotate(${angle}deg)`
    };
  }
}

export type TankStoreType = TankStore;