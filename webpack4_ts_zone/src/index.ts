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

for (let i = 0; i < 19; i++) {
  (function (Battlefield) {
    setTimeout(function () {
      console.clear();
      zone.shrink(battlefield, fillingObject, borderFillingObject, cleanerObject);
      console.table(battlefield.location);
    }, i * 1000);
  })(gameLocation);
}