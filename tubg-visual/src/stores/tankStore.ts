import { computed, observable } from "mobx";
import { SCALE_COEF, TRANSITION } from "./battlefieldStore";

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
    const top = this.y * SCALE_COEF.get();
    const left = this.x * SCALE_COEF.get();
    const angle = this.health <= 0 ? 0 : this.direction;
    // const transition = this.health <= 0 ? 0 : TRANSITION.get();

    return {
      width: SCALE_COEF,
      height: SCALE_COEF,
      top: top,
      left: left,
      transform: angle,
      transition: TRANSITION.get()
    };
  }
}

export type TankStoreType = TankStore;