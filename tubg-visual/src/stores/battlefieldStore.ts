import { action, computed, observable } from "mobx";
import { Battlefield } from '../classes/battlefield';
import { Tank } from '../classes/tank';
import { Point } from "../zone/point";
import { Zone } from "../zone/zone";
import { ZoneShape } from '../zone/zoneShape';
import { Bullet } from './../classes/bullet';
import { BulletStore } from './bulletStore';
import { parseBullets, parseTanks } from "./storeParserFuctions";
import { TankStore } from './tankStore';

export const SCALE_COEF = 20;

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

  public constructor() {
    // я тут просто запускаю тестовую симуляцию

    const battlefield = new Battlefield(50, 50);
    const zone = new Zone(2, 0)

    this.setBattlefieldSize(battlefield.width, battlefield.height);

    setTimeout(() => {
      this.init(battlefield, zone);

    }, 2000);
  }

  @computed
  public get battlefieldStyle() {
    return {
      width: `${this.bfWidth}px`,
      height: `${this.bfHeight}px`
    };
  }

  @computed
  public get livingAreaStyle() {
    const width = this.getWidth(this.livingZone);
    const height = this.getHeight(this.livingZone);
    const top = this.livingZone.upperLeftPoint.y * SCALE_COEF;
    const left = this.livingZone.upperLeftPoint.x * SCALE_COEF;

    return {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      backgroundPosition: `-${left}px -${top}px`
    };
  }

  @computed
  public get finalAreaStyle() {
    if (this.finalZone) {
      const width = this.getWidth(this.finalZone);
      const height = this.getHeight(this.finalZone);
      const top = this.finalZone.upperLeftPoint.y * SCALE_COEF;
      const left = this.finalZone.upperLeftPoint.x * SCALE_COEF;

      return {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`
      };
    } else {
      return {
        display: `hidden`
      };
    }
  }

  private getWidth(zone: ZoneShape): number {
    const width = (zone.lowerRightPoint.x - zone.upperLeftPoint.x + 1) * SCALE_COEF;

    return width;
  }

  private getHeight(zone: ZoneShape): number {
    const height = (zone.lowerRightPoint.y - zone.upperLeftPoint.y + 1) * SCALE_COEF;

    return height;
  }

  @action
  public setBattlefieldSize(width: number, height: number): void {
    this.bfWidth = width * SCALE_COEF;
    this.bfHeight = height * SCALE_COEF;
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
    parseTanks(tankList, this.tankStoreList);
    parseBullets(bulletList, this.bulletStoreList);

    this.livingZone = livingZone;
    this.finalZone = finalZone;
  }

  // дальше пошли методы для симуляции, к стору и компоненту отношения не имеют
  private init(battlefield: Battlefield, zone: Zone): void {

    for (let i = 0; i < battlefield.width; i++) {
      setTimeout(() => {
        zone.shrink(battlefield);

        if (i === 1) {
          bulletList.splice(1,1);
          bulletList.splice(3,1);
          tankList[0].x += 2;
        }
        if (i === 3) {
          bulletList[0].x += 2;
          tankList[2].direction += 90;
        }
        if (i === 6) {
          bulletList.push(new Bullet(getID(), 1, 30, 270));
          bulletList.splice(0,1);
          tankList[1].x += 2;
          tankList[3].x += 2;
        }

        this.setSimulationData(tankList, bulletList, zone.currentZoneShape, zone.finalZoneShape);
      }, i * 500);
    }
  }
}

// генерю id и key
let uniqueId = 0;
const getID = () => uniqueId++;

const bulletList = [
  new Bullet(getID(), 5, 1, 0),

  new Bullet(getID(), 10, 5, 90),

  new Bullet(getID(), 15, 10, 180),

  new Bullet(getID(), 20, 15, 270),

  new Bullet(getID(), 25, 20, 0),

  new Bullet(getID(), 16, 25, 0),

  new Bullet(getID(), 21, 30, 0)
];

const tankList = [
  new Tank(getID(), 1, 1, 1, 0),

  new Tank(getID(), 3, 5, 1, 90),

  new Tank(getID(), 5, 10, 1, 180),

  new Tank(getID(), 7, 15, 1, 270),

  new Tank(getID(), 9, 20, 0, 0),

  new Tank(getID(), 11, 25, 0, 0),

  new Tank(getID(), 13, 30, 1, 0)
];

export type BattlefieldStoreType = BattlefieldStore;

export const bfStore = new BattlefieldStore();

// чтобы из консоли можно было менять значения в сторе
(<any>window).bfStore = bfStore;
(<any>window).bulletList = bulletList;
(<any>window).tankList = tankList;