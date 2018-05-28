import { Bullet } from './../classes/bullet';
import { action, computed, observable } from "mobx";
import { Battlefield } from '../classes/battlefield';
import { Point } from "../zone/point";
import { Zone } from "../zone/zone";
import { ZoneShape } from '../zone/zoneShape';
import { BulletStore } from './bulletStore';
import { TankStore } from './tankStore';
import { Tank } from '../classes/tank';

const SCALE_COEF = 20;

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

    this.livingZone = new ZoneShape(
      new Point(battlefield.startX, battlefield.startY),
      new Point(battlefield.finishX, battlefield.finishY)
    )

    this.init(battlefield, zone);
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
  }

  @action
  public setSimulationData(
    /* tankStoreList: Array<TankStore>,
    bulletStoreList: Array<BulletStore>, */
    tankList: Array<Tank>,
    bulletList: Array<Bullet>,
    livingZone?: ZoneShape,
    finalZone?: ZoneShape
  ): void {
    /* this.tankStoreList = tankStoreList;
    this.bulletStoreList = bulletStoreList; */

    parseTanks(tankList, this.tankStoreList);
    parseBullets(bulletList, this.bulletStoreList);

    this.livingZone = livingZone;
    this.finalZone = finalZone;
  }

  // дальше пошли методы для симуляции, к стору и компоненту отношения не имеют
  private init(battlefield: Battlefield, zone: Zone): void {
    // this.genTanks();
    // this.genBullets();

    for (let i = 0; i < battlefield.width; i++) {
      setTimeout(() => {
        zone.shrink(battlefield);

        // this.livingZone = zone.currentZoneShape;
        // this.finalZone = zone.finalZoneShape;

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
      }, i * 2000);
    }
  }

  // private genTanks(): void {
  //   const tank1 = new TankStore(getID(), 1, 1, 1, 0);
  //   this.tankStoreList.push(tank1);

  //   const tank2 = new TankStore(getID(), 3, 5, 1, 90);
  //   this.tankStoreList.push(tank2);

  //   const tank3 = new TankStore(getID(), 5, 10, 1, 180);
  //   this.tankStoreList.push(tank3);

  //   const tank4 = new TankStore(getID(), 7, 15, 1, 270);
  //   this.tankStoreList.push(tank4);

  //   const tank5 = new TankStore(getID(), 9, 20, 0, 0);
  //   this.tankStoreList.push(tank5);

  //   const tank6 = new TankStore(getID(), 11, 25, 0, 0);
  //   this.tankStoreList.push(tank6);

  //   const tank7 = new TankStore(getID(), 13, 30, 1, 0);
  //   this.tankStoreList.push(tank7);
  // }

  // private genBullets(): void {
  //   const bullet1 = new BulletStore(getID(), 5, 1, 0);
  //   this.bulletStoreList.push(bullet1);

  //   const bullet2 = new BulletStore(getID(), 10, 5, 90);
  //   this.bulletStoreList.push(bullet2);

  //   const bullet3 = new BulletStore(getID(), 15, 10, 180);
  //   this.bulletStoreList.push(bullet3);

  //   const bullet4 = new BulletStore(getID(), 20, 15, 270);
  //   this.bulletStoreList.push(bullet4);

  //   const bullet5 = new BulletStore(getID(), 25, 20, 0);
  //   this.bulletStoreList.push(bullet5);

  //   const bullet6 = new BulletStore(getID(), 16, 25, 0);
  //   this.bulletStoreList.push(bullet6);

  //   const bullet7 = new BulletStore(getID(), 21, 30, 0);
  //   this.bulletStoreList.push(bullet7);
  // }
}

// генерю id и key
let uniqueId = 0;
const getID = () => uniqueId++;

const parseBullets = (bulletList: Array<Bullet>, bulletStoreList: Array<BulletStore>) => {
  if (bulletStoreList.length === 0) {
    for (let i = 0; i < bulletList.length; i++) {
      bulletStoreList.push(new BulletStore(
        bulletList[i].id,
        bulletList[i].x,
        bulletList[i].y,
        bulletList[i].direction
      ));
    }

  } else {

    for (let i = 0; i < bulletList.length; i++) {
      const foundStore = bulletStoreList.find(item => {
        return item.id === bulletList[i].id;
      });

      if (foundStore) {
        foundStore.x = bulletList[i].x;
        foundStore.y = bulletList[i].y;
        foundStore.direction = bulletList[i].direction;
      } else {
        bulletStoreList.push(new BulletStore(
          bulletList[i].id,
          bulletList[i].x,
          bulletList[i].y,
          bulletList[i].direction
        ));
      }
    }

    const deleteIndexes: number[] = [];

    for (let i = 0; i < bulletStoreList.length; i++) {
      const foundIndex = bulletList.findIndex(item => {
        return item.id === bulletStoreList[i].id;
      });

      if (foundIndex === -1) {
        bulletStoreList.splice(i, 1);
        i--;
      }
    }
  }
}

const parseTanks = (tankList: Array<Tank>, tankStoreList: Array<TankStore>) => {
  if (tankStoreList.length === 0) {
    for (let i = 0; i < tankList.length; i++) {
      tankStoreList.push(new TankStore(
        tankList[i].id,
        tankList[i].x,
        tankList[i].y,
        tankList[i].health,
        tankList[i].direction
      ));
    }

  } else {

    for (let i = 0; i < tankList.length; i++) {
      tankStoreList[i].x = tankList[i].x;
      tankStoreList[i].y = tankList[i].y;
      tankStoreList[i].health = tankList[i].health;
      tankStoreList[i].direction = tankList[i].direction;
    }
  }
}

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