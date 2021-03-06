import { action, computed, observable } from "mobx";
import { SCALE_COEF, TRANSITION } from "./battlefieldStore";

export class BulletStore {
  @observable
  public id: number;
  @observable
  public x: number;
  @observable
  public y: number;
  @observable
  public direction: number;

  public constructor(id: number, x: number, y: number, direction: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  @computed
  public get bulletStyle() {
    const top = this.y * SCALE_COEF.get();
    const left = this.x * SCALE_COEF.get();

    return {
      width: SCALE_COEF,
      height: SCALE_COEF,
      top: top,
      left: left,
      transform: this.direction,
      transition: TRANSITION.get()
    };
  }
}

export type BulletStoreType = BulletStore;