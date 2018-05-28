import { Bullet } from "../classes/bullet";
import { Tank } from "../classes/tank";
import { BulletStore } from "./bulletStore";
import { TankStore } from "./tankStore";

export const parseBullets = (bulletList: Array<Bullet>, bulletStoreList: Array<BulletStore>) => {
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