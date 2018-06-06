import { Bullet } from '../classes/bullet';
import { Tank } from '../classes/tank';
import { Zone } from '../zone/zone';
import { Battlefield } from '../classes/battlefield';
import { bfStore } from './battlefieldStore';

export class Simulation {
  public battlefield: Battlefield;
  public zone: Zone;

  public bulletList: Bullet[] = [
    /* new Bullet(getID(), 5, 1, 0),

    new Bullet(getID(), 10, 5, 90),

    new Bullet(getID(), 15, 10, 180),

    new Bullet(getID(), 20, 15, 270),

    new Bullet(getID(), 25, 20, 0),

    new Bullet(getID(), 16, 25, 0),

    new Bullet(getID(), 21, 30, 0) */
  ];

  public tankList = [
    new Tank(getID(), 10, 11, 1, 0),
    new Tank(getID(), 17, 18, 1, 270)

    /* new Tank(getID(), 3, 5, 1, 90),

    new Tank(getID(), 5, 10, 1, 180),

    new Tank(getID(), 7, 15, 1, 270),

    new Tank(getID(), 9, 20, 0, 0),

    new Tank(getID(), 11, 25, 0, 0),

    new Tank(getID(), 13, 30, 1, 0) */
  ];

  public constructor(width: number, height: number, shrCoef: number, lastSide: number) {
    this.battlefield = new Battlefield(width, height);
    this.zone = new Zone(shrCoef, lastSide);
  }

  public start() {
    setTimeout(() => {
      this.init(this.battlefield, this.zone);

    }, 1000);
  }

  private init(battlefield: Battlefield, zone: Zone): void {
    for (let i = 0; i < battlefield.width; i++) {
      setTimeout(() => {
        zone.shrink(battlefield);

        // if (i === 1) {
        //   this.bulletList.splice(1,1);
        //   this.bulletList.splice(3,1);
        //   this.tankList[0].x += 2;
        // }
        // if (i === 3) {
        //   this.bulletList[0].x += 2;
        //   this.tankList[2].health = 0;
        // }
        // if (i === 6) {
        //   this.bulletList.push(new Bullet(getID(), 1, 30, 270));
        //   this.bulletList.splice(0,1);
        //   this.bulletList[1].x += 2;
        //   this.bulletList[2].x += 2;
        //   this.tankList[1].x += 2;
        //   this.tankList[3].x += 2;
        // }

        if (i === 1) {
          this.tankList[0].x++;
          this.tankList[1].y--;
        }
        if (i > 1) {
          if (i === 2) {
            this.bulletList.push(new Bullet(getID(), 12, 11, 0));
            this.tankList[0].direction += 90;
          }

          if (i > 2 && this.tankList[0].health > 0) {
            this.tankList[0].y++;
          }

          if (this.bulletList[0] && i > 2) {
            this.bulletList[0].x++;
          }

          if (this.tankList[1].health) {
            this.tankList[1].y--;
          }

          if (this.tankList[1].y === 11) {
            this.tankList[1].health = 0;
          }
          if (this.bulletList[0] && this.bulletList[0].x === 17) {
            this.bulletList.splice(0, 1);
          }
          if (
            this.tankList[0].x < zone.currentZoneShape.upperLeftPoint.x ||
            this.tankList[0].x > zone.currentZoneShape.lowerRightPoint.x ||
            this.tankList[0].y < zone.currentZoneShape.upperLeftPoint.y ||
            this.tankList[0].y > zone.currentZoneShape.lowerRightPoint.y
          ) {
            this.tankList[0].health = 0;
          }
        }

        bfStore.setSimulationData(this.tankList, this.bulletList, zone.currentZoneShape, zone.finalZoneShape);
      }, i * 1000);
    }
  }
}

let uniqueId = 0;
const getID = () => uniqueId++;
