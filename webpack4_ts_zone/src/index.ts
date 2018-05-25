import { ZoneShape } from './zone/zoneShape';
import { Battlefield } from "./zone/battlefield";
import { Zone } from "./zone/zone";

const battlefield = new Battlefield(18, 18);

const locationSide = battlefield.width;
const shrinkCoefficient = 2;
const lastZoneSide = 0;
const fillingObject = "∎";
const borderFillingObject = 0;
const cleanerObject = " ";

let gameLocation = new Array(locationSide);
for (let i = 0; i < locationSide; i++) {
  gameLocation[i] = new Array(locationSide);
}

for (let i = 0; i < locationSide; i++) {
  for (let j = 0; j < locationSide; j++) {
    gameLocation[i][j] = " ";
  }
}

battlefield.location = gameLocation;

const zone = new Zone(shrinkCoefficient, lastZoneSide);

for (let i = 0; i < 15; i++) {
  (function (Battlefield) {
    setTimeout(function () {
      // console.clear();
      zone.shrink(battlefield);
      console.log(zone.currentZoneShape);
      console.log(zone.finalZoneShape);
      console.log("");

      renderZone(battlefield.location, zone.currentZoneShape, fillingObject);
      renderWhiteZone(battlefield.location, zone.finalZoneShape, borderFillingObject);

      console.table(battlefield.location);
    }, i * 1000);
  })(gameLocation);
}

function renderZone(array: Array<Array<any>>, zone: ZoneShape, fillingObject: any) {
  if (zone.upperLeftPoint.x > 0 && zone.upperLeftPoint.y > 0 && zone.lowerRightPoint.x > 0 && zone.lowerRightPoint.y > 0) {
    for (let i = zone.upperLeftPoint.x - 1; i <= zone.lowerRightPoint.x + 1; i++) {
      battlefield.location[i][zone.upperLeftPoint.y - 1] = fillingObject;
      battlefield.location[i][zone.lowerRightPoint.y + 1] = fillingObject;
    }

    for (let i = zone.upperLeftPoint.y - 1; i <= zone.lowerRightPoint.y + 1; i++) {
      battlefield.location[zone.upperLeftPoint.x - 1][i] = fillingObject;
      battlefield.location[zone.lowerRightPoint.x + 1][i] = fillingObject;
    }
  }
}

function renderWhiteZone(array: Array<Array<any>>, zone: ZoneShape, fillingObject: any) {

    for (let i = zone.upperLeftPoint.x; i <= zone.lowerRightPoint.x; i++) {
      battlefield.location[i][zone.upperLeftPoint.y] = fillingObject;
      battlefield.location[i][zone.lowerRightPoint.y] = fillingObject;
    }

    for (let i = zone.upperLeftPoint.y; i <= zone.lowerRightPoint.y; i++) {
      battlefield.location[zone.upperLeftPoint.x][i] = fillingObject;
      battlefield.location[zone.lowerRightPoint.x][i] = fillingObject;
    }

}