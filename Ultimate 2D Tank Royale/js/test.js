const locationSide = 18;
const shrinkCoefficient = 1.4;
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

const zone = new Zone();

for (let i = 0; i < 19; i++) {
	(function(gameLocation) {
		setTimeout(function() {
			console.clear();
			zone.shrink(gameLocation, shrinkCoefficient, lastZoneSide, fillingObject, borderFillingObject, cleanerObject);
			console.table(gameLocation);
		}, i * 1000);
	})(gameLocation);
}