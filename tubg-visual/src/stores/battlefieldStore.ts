import { action, computed, observable } from "mobx";
import { Tank } from '../classes/tank';
import { Point } from "../zone/point";
import { ZoneShape } from '../zone/zoneShape';
import { Bullet } from './../classes/bullet';
import { BulletStore } from './bulletStore';
import { parseBullets, parseTanks } from "./storeParserFuctions";
import { TankStore } from './tankStore';


const MIN_SCALE = 20;
const MAX_SCALE = 40;

export let SCALE_COEF = observable.box(MIN_SCALE);
export let TRANSITION = observable.box(1);

class BattlefieldStore {
  @observable
  public tankStoreList: Array<TankStore> = [];
  @observable
  public bulletStoreList: Array<BulletStore> = [];

  @observable
  private livingZone: ZoneShape;
  @observable
  private finalZone: ZoneShape;
  @observable
  private bfWidth: number;
  @observable
  private bfHeight: number;
  @observable
  private isDraggable: boolean = false;
  @observable
  private bfTop: number = 0;
  @observable
  private bfLeft: number = 0;

  private offset = [0, 0];
  private mousePosition = {x: 0, y: 0};

  public constructor() {
    // я тут просто запускаю тестовую симуляцию

    // const battlefield = new Battlefield(50, 50);
    // const zone = new Zone(2, 0)

    // this.setBattlefieldSize(battlefield.width, battlefield.height);

    // setTimeout(() => {
    //   this.init(battlefield, zone);

    // }, 1000);
  }

  @computed
  public get battlefieldStyle() {
    const style =  {
      width: this.bfWidth * SCALE_COEF.get(),
      height: this.bfHeight * SCALE_COEF.get(),
      top: this.bfTop,
      left: this.bfLeft
    };

    return style;
  }

  @computed
  public get livingAreaStyle() {
    const width = this.getZoneWidth(this.livingZone);
    const height = this.getZoneHeight(this.livingZone);
    const top = this.livingZone.upperLeftPoint.y * SCALE_COEF.get();
    const left = this.livingZone.upperLeftPoint.x * SCALE_COEF.get();

    const style = {
      width: width,
      height: height,
      top: top,
      left: left,
      transition: TRANSITION.get()
    };

    return style;
  }

  @computed
  public get finalAreaStyle() {
    if (this.finalZone) {
      const width = this.getZoneWidth(this.finalZone);
      const height = this.getZoneHeight(this.finalZone);
      const top = this.finalZone.upperLeftPoint.y * SCALE_COEF.get();
      const left = this.finalZone.upperLeftPoint.x * SCALE_COEF.get();

      const style = {
        width: width,
        height: height,
        top: top,
        left: left,
        transition: TRANSITION.get()
      };

      return style;
    } else {
      return null;
    }
  }

  private getZoneWidth(zone: ZoneShape): number {
    const width = (zone.lowerRightPoint.x - zone.upperLeftPoint.x + 1) * SCALE_COEF.get();

    return width;
  }

  private getZoneHeight(zone: ZoneShape): number {
    const height = (zone.lowerRightPoint.y - zone.upperLeftPoint.y + 1) * SCALE_COEF.get();

    return height;
  }

  @action
  public onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.isDraggable = true;
    this.offset = [
      e.currentTarget.offsetLeft - e.clientX,
      e.currentTarget.offsetTop - e.clientY
    ];
  }

  @action
  public onMouseUp = () => {
    this.isDraggable = false;
  }

  @action
  public onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.isDraggable) {

      this.mousePosition = {
        x: e.clientX,
        y: e.clientY
      };

      if (document.body.clientWidth < (this.bfWidth * SCALE_COEF.get())) {
        const leftVal = (this.mousePosition.x + this.offset[0]);

        this.bfLeft = leftVal <=
          0 ?
          leftVal >=
          (document.body.clientWidth - this.bfWidth * SCALE_COEF.get()) ?
          leftVal :
          (document.body.clientWidth - this.bfWidth * SCALE_COEF.get()) :
          0;
      } else {
        this.bfLeft = 0;
      }

      if (document.body.clientHeight < (this.bfHeight * SCALE_COEF.get())) {
        const topVal = (this.mousePosition.y + this.offset[1]);

        this.bfTop = topVal <=
          0 ?
          topVal >=
          (document.body.clientHeight - this.bfHeight * SCALE_COEF.get()) ?
          topVal :
          (document.body.clientHeight - this.bfHeight * SCALE_COEF.get()) :
          0;
      } else {
        this.bfTop = 0;
      }
    }
  }

  @action
  public onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    TRANSITION.set(0);
    if (e.deltaY < 0 && (SCALE_COEF.get() < MAX_SCALE)) {
      SCALE_COEF.set(SCALE_COEF.get() + 1);
    } else if (e.deltaY > 0 && (SCALE_COEF.get() > MIN_SCALE)) {
      SCALE_COEF.set(SCALE_COEF.get() - 1);
    }
  }

  @action
  public setBattlefieldSize(width: number, height: number): void {
    this.bfWidth = width;
    this.bfHeight = height;

    this.livingZone = new ZoneShape(
      new Point(0, 0),
      new Point(width - 1, height - 1)
    )
  }

  @action
  public setSimulationData(
    tankList: Array<Tank>,
    bulletList: Array<Bullet>,
    livingZone?: ZoneShape,
    finalZone?: ZoneShape
  ): void {
    TRANSITION.set(1);
    parseTanks(tankList, this.tankStoreList);
    parseBullets(bulletList, this.bulletStoreList);

    this.livingZone = livingZone;
    this.finalZone = finalZone;
  }

  // дальше пошли методы для симуляции, к стору и компоненту отношения не имеют
  // private init(battlefield: Battlefield, zone: Zone): void {

  //   for (let i = 0; i < battlefield.width; i++) {
  //     setTimeout(() => {
  //       zone.shrink(battlefield);

  //       if (i === 1) {
  //         bulletList.splice(1,1);
  //         bulletList.splice(3,1);
  //         tankList[0].x += 2;
  //       }
  //       if (i === 3) {
  //         bulletList[0].x += 2;
  //         tankList[2].health = 0;
  //       }
  //       if (i === 6) {
  //         bulletList.push(new Bullet(getID(), 1, 30, 270));
  //         bulletList.splice(0,1);
  //         bulletList[1].x += 2;
  //         bulletList[2].x += 2;
  //         tankList[1].x += 2;
  //         tankList[3].x += 2;
  //       }

  //       this.setSimulationData(tankList, bulletList, zone.currentZoneShape, zone.finalZoneShape);
  //     }, i * 1000);
  //   }
  // }
}

// генерю id и key

export type BattlefieldStoreType = BattlefieldStore;

export const bfStore = new BattlefieldStore();

// чтобы из консоли можно было менять значения в сторе
(<any>window).bfStore = bfStore;
// (<any>window).bulletList = bulletList;
// (<any>window).tankList = tankList;