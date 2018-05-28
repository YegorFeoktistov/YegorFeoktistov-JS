import { computed, observable } from "mobx";

const SCALE_COEF = 20;

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
    const top = this.y * SCALE_COEF;
    const left = this.x * SCALE_COEF;

    return {
      width: `${SCALE_COEF}px`,
      height: `${SCALE_COEF}px`,
      top: `${top}px`,
      left: `${left}px`,
      transform: `rotate(${this.direction}deg)`
    };
  }
}

export type BulletStoreType = BulletStore;