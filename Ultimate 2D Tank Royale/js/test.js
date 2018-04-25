// import { Zone } from "./zone/zone";

const locationSide = 18;
const shrinkCoefficient = 1.4;
const lastZoneSide = 4;
const fillingObject = "∎";

let gameLocation = new Array(locationSide);
for (let i = 0; i < locationSide; i++) {
	gameLocation[i] = new Array(locationSide);
}

for (let i = 0; i < locationSide; i++) {
	for (let j = 0; j < locationSide; j++) {
		gameLocation[i][j] = " ";
    }
}

for (let i = 0; i < 14; i++) {
	(function(gameLocation) {
		setTimeout(function() {
			console.clear();
			Zone.shrink(gameLocation, shrinkCoefficient, lastZoneSide, fillingObject);
			console.table(gameLocation);
		}, i * 1000);
	})(gameLocation);
}