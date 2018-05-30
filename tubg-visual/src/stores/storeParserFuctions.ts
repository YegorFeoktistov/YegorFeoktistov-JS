import { Bullet } from "../classes/bullet";
import { Tank } from "../classes/tank";
import { BulletStore } from "./bulletStore";
import { TankStore } from "./tankStore";

export const parseBullets = (bulletList: Array<Bullet>, bulletStoreList: Array<BulletStore>) => {
  bulletStoreList.length = 0;

  for (let i = 0; i < bulletList.length; i++) {
    bulletStoreList.push(new BulletStore(
      bulletList[i].id,
      bulletList[i].x,
      bulletList[i].y,
      bulletList[i].direction
    ));
  }
}

export const parseTanks = (tankList: Array<Tank>, tankStoreList: Array<TankStore>) => {
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