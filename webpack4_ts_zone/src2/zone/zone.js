import { Point } from "./point";
import { ZoneShape } from "./zoneShape";
import { Lock } from "../lock/lock";

/*
Надо обмозговать:
	-Все еще пересмотреть способ сжатия единичной зоны, мб что-то можно сделать лучше
*/

/**
 * @class
 * @description Represents shrinking zone in the game location
 */
export class Zone {
	//#region Constructor

	/** @constructor
	 * @this {Zone}
	 * @description Constructor of the Zone class */
	constructor() {
		this._isFirstStage = true;
		this._isNewStage = true;
		this._finalZoneShape = new ZoneShape(new Point(0, 0), 0, new Point(0, 0));
		this._currentZoneShape = new ZoneShape(new Point(0, 0), 0, new Point(0, 0));
		this._verticalDistancesRatio = 0;
		this._horizontalDistancesRatio = 0;
		this._topDistance = 0;
		this._bottomDistance = 0;
		this._leftDistance = 0;
		this._rightDistance = 0;
		this._verticalStepCount = 0;
		this._horizontalStepCount = 0;

		Lock.lockAllFields(this);
	}

	//#endregion

	//#region Accessor functions declaration

	/**
	 * Accessor
	 * @description Is that a first stage of shrinking?
	 */
	get isFirstStage() {
		return this._isFirstStage;
	}
	set isFirstStage(value) {
		Lock.unlockObjectField(this, "_isFirstStage");

		this._isFirstStage = value;

		Lock.lockObjectField(this, "_isFirstStage");
	}

	/**
	 * Accessor
	 * @description Is that a new stage of shrinking
	 */
	get isNewStage() {
		return this._isNewStage;
	}
	set isNewStage(value) {
		Lock.unlockObjectField(this, "_isNewStage");

		this._isNewStage = value;

		Lock.lockObjectField(this, "_isNewStage");
	}

	/**
	 * Accessor
	 * @description Parameters of the final zone shape:
	 * upper left point, lower right point, side
	 */
	get finalZoneShape() {
		return this._finalZoneShape;
	}
	set finalZoneShape(value) {
		Lock.unlockObjectField(this, "_finalZoneShape");

		this._finalZoneShape = value;

		Lock.lockObjectField(this, "_finalZoneShape");
	}

	/**
	 * Accessor
	 * @description Parameters of the current zone shape:
	 * upper left point, lower right point, side
	 */
	get currentZoneShape() {
		return this._currentZoneShape;
	}
	set currentZoneShape(value) {
		Lock.unlockObjectField(this, "_currentZoneShape");

		this._currentZoneShape = value;

		Lock.lockObjectField(this, "_currentZoneShape");
	}

	/**
	 * Accessor
	 * @description The ratio of the distances between the zones vertically
	 */
	get verticalDistancesRatio() {
		return this._verticalDistancesRatio;
	}
	set verticalDistancesRatio(value) {
		Lock.unlockObjectField(this, "_verticalDistancesRatio");

		this._verticalDistancesRatio = value;

		Lock.lockObjectField(this, "_verticalDistancesRatio");
	}

	/**
	 * Accessor
	 * @description The ratio of the distances between the zones horizontally
	 */
	get horizontalDistancesRatio() {
		return this._horizontalDistancesRatio;
	}
	set horizontalDistancesRatio(value) {
		Lock.unlockObjectField(this, "_horizontalDistancesRatio");

		this._horizontalDistancesRatio = value;

		Lock.lockObjectField(this, "_horizontalDistancesRatio");
	}

	/**
	 * Accessor
	 * @description Value of the top distance between zones
	 */
	get topDistance() {
		return this._topDistance;
	}
	set topDistance(value) {
		Lock.unlockObjectField(this, "_topDistance");

		this._topDistance = value;

		Lock.lockObjectField(this, "_topDistance");
	}

	/**
	 * Accessor
	 * @description Value of the bottom distance between zones
	 */
	get bottomDistance() {
		return this._bottomDistance;
	}
	set bottomDistance(value) {
		Lock.unlockObjectField(this, "_bottomDistance");

		this._bottomDistance = value;

		Lock.lockObjectField(this, "_bottomDistance");
	}

	/**
	 * Accessor
	 * @description Value of the left distance between zones
	 */
	get leftDistance() {
		return this._leftDistance;
	}
	set leftDistance(value) {
		Lock.unlockObjectField(this, "_leftDistance");

		this._leftDistance = value;

		Lock.lockObjectField(this, "_leftDistance");
	}

	/**
	 * Accessor
	 * @description Value of the right distance between zones
	 */
	get rightDistance() {
		return this._rightDistance;
	}
	set rightDistance(value) {
		Lock.unlockObjectField(this, "_rightDistance");

		this._rightDistance = value;

		Lock.lockObjectField(this, "_rightDistance");
	}

	/**
	 * Accessor
	 * @description Value of the vertical shrinking steps
	 */
	get verticalStepCount() {
		return this._verticalStepCount;
	}
	set verticalStepCount(value) {
		Lock.unlockObjectField(this, "_verticalStepCount");

		this._verticalStepCount = value;

		Lock.lockObjectField(this, "_verticalStepCount");
	}

	/**
	 * Accessor
	 * @description Value of the horizontal shrinking steps
	 */
	get horizontalStepCount() {
		return this._horizontalStepCount;
	}
	set horizontalStepCount(value) {
		Lock.unlockObjectField(this, "_horizontalStepCount");

		this._horizontalStepCount = value;

		Lock.lockObjectField(this, "_horizontalStepCount");
	}

	//#endregion

	//#region Class functions

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {number} lastZoneSide Value of the last zone side
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @param {*} borderFillingObject Object to fill a border of the zone
	 * @param {*} cleanerObject Object to clean the border of the zone
	 * @description Main function of the zone algorithm
	 */
	shrink(location, shrinkCoefficient, lastZoneSide, fillingObject, borderFillingObject, cleanerObject) {
		// Verification of the first stage
		if (this.isFirstStage) {
			this.initializeFirstStage(location);
		}

		// Verification of the beginning of the new stage

		if (this.isNewStage) {
			this.beginNewStage(location, shrinkCoefficient, lastZoneSide, borderFillingObject, cleanerObject);
		}

		// Continuation of the current stage

		this.continueCurrentStage(location, fillingObject, lastZoneSide);
	}

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @description Sets game location shape as current zone shape
	 */
	initializeFirstStage(location) {
		this.currentZoneShape.upperLeftPoint.x = 0;
		this.currentZoneShape.upperLeftPoint.y = 0;
		this.currentZoneShape.lowerRightPoint.x = location.length - 1;
		this.currentZoneShape.lowerRightPoint.y = location[0].length - 1;
		this.currentZoneShape.calculateSide();

		this.isFirstStage = false;
		this.isNewStage = true;
	}

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {number} lastZoneSide Value of the last zone side
	 * @param {*} borderFillingObject Object to fill a border of the zone
	 * @param {*} cleanerObject Object to clean the border of the zone
	 * @description Finds new final zone shape
	 */
	beginNewStage(location, shrinkCoefficient, lastZoneSide, borderFillingObject, cleanerObject) {
		this.clearBorder(location, cleanerObject);
		this.calculateFinalZoneShape(shrinkCoefficient, lastZoneSide);
		this.calculateDistances();
		this.calculateVerticalDistancesRatio();
		this.calculateHorizontalDistancesRatio();
		this.drawZoneBorderline(location, borderFillingObject);

		this.verticalStepCount = 0;
		this.horizontalStepCount = 0;

		this.isNewStage = false;
	}

	/**
	 * @function
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {number} lastZoneSide Value of the last zone side
	 * @description Calculate parameters of the final zone
	 */
	calculateFinalZoneShape(shrinkCoefficient, lastZoneSide) {
		let finalZoneSide = this.currentZoneShape.side / shrinkCoefficient;
		const finalZoneSideRounded = Math.round(finalZoneSide);
		finalZoneSide = finalZoneSideRounded <= lastZoneSide ? lastZoneSide : finalZoneSideRounded;

		// Для случая если нужна центральная точка
		// finalZoneSide = finalZoneSideRounded <= lastZoneSide
		// ? lastZoneSide : finalZoneSideRounded % 2 !== 0
		// ? finalZoneSideRounded : finalZoneSideRounded - 1;

		const minBoundX = this.currentZoneShape.upperLeftPoint.x;
		const maxBoundX = this.currentZoneShape.lowerRightPoint.x - finalZoneSide + 2;
		const minBoundY = this.currentZoneShape.upperLeftPoint.y;
		const maxBoundY = this.currentZoneShape.lowerRightPoint.y - finalZoneSide + 2;

		const finalZoneX1 = Math.floor(Math.random() * (maxBoundX - minBoundX) + minBoundX);
		const finalZoneY1 = Math.floor(Math.random() * (maxBoundY - minBoundY) + minBoundY);

		this.finalZoneShape.upperLeftPoint.x = finalZoneX1;
		this.finalZoneShape.upperLeftPoint.y = finalZoneY1;
		this.finalZoneShape.side = finalZoneSide;
		this.finalZoneShape.calculateLowerRightPoint();
	}

	/**
	 * @function
	 * @description Calculates distances between zones
	 */
	calculateDistances() {
		this.topDistance = Math.abs(this.finalZoneShape.upperLeftPoint.y - this.currentZoneShape.upperLeftPoint.y);
		this.bottomDistance = Math.abs(this.currentZoneShape.lowerRightPoint.y - this.finalZoneShape.lowerRightPoint.y);
		this.leftDistance = Math.abs(this.finalZoneShape.upperLeftPoint.x - this.currentZoneShape.upperLeftPoint.x);
		this.rightDistance = Math.abs(this.currentZoneShape.lowerRightPoint.x - this.finalZoneShape.lowerRightPoint.x);
	}

	/**
	 * @function
	 * @description Calculates the ratio between the vertical distances of zones
	 */
	calculateVerticalDistancesRatio() {
		if (this.topDistance <= 0 || this.bottomDistance <= 0) {
			this.verticalDistancesRatio = 0;
		}
		else {
			const max = Math.max(this.topDistance, this.bottomDistance);
			const min = Math.min(this.topDistance, this.bottomDistance);
			this.verticalDistancesRatio = Math.floor(max / min);
		}
	}

	/**
	 * @function
	 * @description Calculates the ratio between the horizontal distances of zones
	 */
	calculateHorizontalDistancesRatio() {
		if (this.leftDistance <= 0 || this.rightDistance <= 0) {
			this.horizontalDistancesRatio = 0;
		}
		else {
			const max = Math.max(this.leftDistance, this.rightDistance);
			const min = Math.min(this.leftDistance, this.rightDistance);
			this.horizontalDistancesRatio = Math.floor(max / min);
		}
	}

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @param {number} lastZoneSide Value of the last zone side
	 * @description Fill an area outside the current zone
	 */
	continueCurrentStage(location, fillingObject, lastZoneSide) {
		const shrinkSteps = {
			topStep: 0,
			bottomStep: 0,
			leftStep: 0,
			rightStep: 0
		};

		// Vertical

		this.shrinkVertically(location, fillingObject, lastZoneSide, shrinkSteps);

		// Horizontal

		this.shrinkHorizontally(location, fillingObject, shrinkSteps);

		// Shrink single size zone

		this.shrinkSingleSizeZone(location, fillingObject, lastZoneSide);

		// Update currentZoneShape

		this.calculateCurrentZoneShape(shrinkSteps);

		// Check if current zone reaches final zone

		this.checkIsFinalZoneReached();
	}

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @param {number} lastZoneSide Value of the last zone side
	 * @param {object} shrinkSteps Values of shrinks for each side
	 * @description Shrinks location vertically
	 */
	shrinkVertically(location, fillingObject, lastZoneSide, shrinkSteps) {
		const isTopSideReached = (this.currentZoneShape.upperLeftPoint.y === this.finalZoneShape.upperLeftPoint.y);
		const isBottomSideReached = (this.currentZoneShape.lowerRightPoint.y === this.finalZoneShape.lowerRightPoint.y);
		const isCommonStep = (this.verticalStepCount === this.verticalDistancesRatio);

		const upperX = this.currentZoneShape.upperLeftPoint.x;
		const upperY = this.currentZoneShape.upperLeftPoint.y;
		const lowerX = this.currentZoneShape.lowerRightPoint.x;
		const lowerY = this.currentZoneShape.lowerRightPoint.y;

		if (!isTopSideReached && !isBottomSideReached) {
			this.verticalStepCount++;

			if (this.topDistance > this.bottomDistance) {
				shrinkSteps.topStep++;

				for (let i = upperX; i <= lowerX; i++) {
					location[i][upperY] = fillingObject;

					if (isCommonStep) {
						location[i][lowerY] = fillingObject;
					}
				}

				if (isCommonStep) {
					shrinkSteps.bottomStep++;
					this.verticalStepCount = 0;
				}
			}
			else if (this.topDistance < this.bottomDistance) {
				shrinkSteps.bottomStep++;

				for (let i = upperX; i <= lowerX; i++) {
					location[i][lowerY] = fillingObject;

					if (isCommonStep) {
						location[i][upperY] = fillingObject;
					}
				}

				if (isCommonStep) {
					shrinkSteps.topStep++;
					this.verticalStepCount = 0;
				}
			}
			else {
				for (let i = upperX; i <= lowerX; i++) {
					location[i][upperY] = fillingObject;
					location[i][lowerY] = fillingObject;
				}

				shrinkSteps.topStep++;
				shrinkSteps.bottomStep++;
				this.verticalStepCount = 0;
			}
		}
		else if (isTopSideReached && !isBottomSideReached) {
			for (let i = upperX; i <= lowerX; i++) {
				location[i][lowerY] = fillingObject;
			}

			shrinkSteps.bottomStep++;
		}
		else if (!isTopSideReached && isBottomSideReached) {
			for (let i = upperX; i <= lowerX; i++) {
				location[i][upperY] = fillingObject;
			}

			shrinkSteps.topStep++;
		}
	}

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @param {object} shrinkSteps Values of shrinks for each side
	 * @description Shrinks location horizontally
	 */
	shrinkHorizontally(location, fillingObject, shrinkSteps) {
		const isLeftSideReached = (this.currentZoneShape.upperLeftPoint.x === this.finalZoneShape.upperLeftPoint.x);
		const isRightSideReached = (this.currentZoneShape.lowerRightPoint.x === this.finalZoneShape.lowerRightPoint.x);
		const isCommonStep = (this.horizontalStepCount === this.horizontalDistancesRatio);

		const upperX = this.currentZoneShape.upperLeftPoint.x;
		const upperY = this.currentZoneShape.upperLeftPoint.y;
		const lowerX = this.currentZoneShape.lowerRightPoint.x;
		const lowerY = this.currentZoneShape.lowerRightPoint.y;

		if (!isLeftSideReached && !isRightSideReached) {
			this.horizontalStepCount++;

			if (this.leftDistance > this.rightDistance) {
				shrinkSteps.leftStep++;

				for (let i = upperY; i <= lowerY; i++) {
					location[upperX][i] = fillingObject;

					if (isCommonStep) {
						location[lowerX][i] = fillingObject;
					}
				}

				if (isCommonStep) {
					shrinkSteps.rightStep++;
					this.horizontalStepCount = 0;
				}
			}
			else if (this.leftDistance < this.rightDistance) {
				shrinkSteps.rightStep++;

				for (let i = upperY; i <= lowerY; i++) {
					location[lowerX][i] = fillingObject;

					if (isCommonStep) {
						location[upperX][i] = fillingObject;
					}
				}

				if (isCommonStep) {
					shrinkSteps.leftStep++;
					this.horizontalStepCount = 0;
				}
			}
			else {
				for (let i = upperY; i <= lowerY; i++) {
					location[upperX][i] = fillingObject;
					location[lowerX][i] = fillingObject;
				}

				shrinkSteps.leftStep++;
				shrinkSteps.rightStep++;
				this.horizontalStepCount = 0;
			}
		}
		else if (isLeftSideReached && !isRightSideReached) {
			for (let i = upperY; i <= lowerY; i++) {
				location[lowerX][i] = fillingObject;
			}

			shrinkSteps.rightStep++;
		}
		else if (!isLeftSideReached && isRightSideReached) {
			for (let i = upperY; i <= lowerY; i++) {
				location[upperX][i] = fillingObject;
			}

			shrinkSteps.leftStep++;
		}
	}

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @param {number} lastZoneSide Value of the last zone side
	 * @description Shrinks zone when its size equals one
	 */
	shrinkSingleSizeZone(location, fillingObject, lastZoneSide) {
		if (this.currentZoneShape.side === 1 && lastZoneSide < 1) {
			location[this.currentZoneShape.upperLeftPoint.x][this.currentZoneShape.upperLeftPoint.y] = fillingObject;
		}
	}

	/**
	 * @function
	 * @param {object} shrinkSteps Values of shrinks for each side
	 * @description Calculate parameters of the current zone
	 */
	calculateCurrentZoneShape(shrinkSteps) {
		this.currentZoneShape.upperLeftPoint.x += shrinkSteps.leftStep;
		this.currentZoneShape.upperLeftPoint.y += shrinkSteps.topStep;
		this.currentZoneShape.lowerRightPoint.x -= shrinkSteps.rightStep;
		this.currentZoneShape.lowerRightPoint.y -= shrinkSteps.bottomStep;
		this.currentZoneShape.calculateSide();
	}

	/**
	 * @function
	 * @description Check if the current zone reaches the final zone
	 */
	checkIsFinalZoneReached() {
		if (
			this.currentZoneShape.upperLeftPoint.x === this.finalZoneShape.upperLeftPoint.x
			&& this.currentZoneShape.upperLeftPoint.y === this.finalZoneShape.upperLeftPoint.y
			&& this.currentZoneShape.side === this.finalZoneShape.side
			&& this.currentZoneShape.lowerRightPoint.x === this.finalZoneShape.lowerRightPoint.x
			&& this.currentZoneShape.lowerRightPoint.y === this.finalZoneShape.lowerRightPoint.y
		) {
			this.isNewStage = true;
		}
	}

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @param {*} borderFillingObject Object to fill a border of the zone
	 * @description Fills border cells of the final zone with given object
	 */
	drawZoneBorderline(location, borderFillingObject) {
		for (let i = this.finalZoneShape.upperLeftPoint.x; i <= this.finalZoneShape.lowerRightPoint.x; i++) {
			location[i][this.finalZoneShape.upperLeftPoint.y] = borderFillingObject;
			location[i][this.finalZoneShape.lowerRightPoint.y] = borderFillingObject;
		}
		for (let i = this.finalZoneShape.upperLeftPoint.y; i <= this.finalZoneShape.lowerRightPoint.y; i++) {
			location[this.finalZoneShape.upperLeftPoint.x][i] = borderFillingObject;
			location[this.finalZoneShape.lowerRightPoint.x][i] = borderFillingObject;
		}
	}

	/**
	 * @function
	 * @param {array} location Game location for processing
	 * @param {*} cleanerObject Object to clean the border of the zone
	 * @description Removes the drawn border of the final zone
	 */
	clearBorder(location, cleanerObject) {
		for (let i = this.finalZoneShape.upperLeftPoint.x; i <= this.finalZoneShape.lowerRightPoint.x; i++) {
			location[i][this.finalZoneShape.upperLeftPoint.y] = cleanerObject;
			location[i][this.finalZoneShape.lowerRightPoint.y] = cleanerObject;
		}
		for (let i = this.finalZoneShape.upperLeftPoint.y; i <= this.finalZoneShape.lowerRightPoint.y; i++) {
			location[this.finalZoneShape.upperLeftPoint.x][i] = cleanerObject;
			location[this.finalZoneShape.lowerRightPoint.x][i] = cleanerObject;
		}
	}

	//#endregion

	//#region Garbage

	// /**
	//  * private static field
	//  *
	//  * Value of the current zone radius
	//  */
	// _zoneRadius: 0,

	// /**
	//  * private static field
	//  *
	//  * Coordinates of the zone center
	//  */
	// _zoneCenterPoint: {
	// 	x: 0,
	// 	y: 0
	// }

	// /**
	//  * private static field
	//  *
	//  * Coordinates of the first point inside the zone
	//  */
	// _zoneUpperLeftPoint: {
	// 	x: 0,
	// 	y:0
	// }

	// /**
	//  * private static field
	//  *
	//  * Value of the current zone radius
	//  */
	// get zoneRadius() {
	// 	return this._zoneRadius;
	// }
	// set zoneRadius(value) {
	// 	unlockObjectField(this, "_zoneRadius");

	// 	this._zoneRadius = value;

	// 	lockObjectField(this, "_zoneRadius");
	// }

	// /**
	//  * private static field
	//  *
	//  * Coordinates of the zone center
	//  */
	// get zoneCenterPoint() {
	// 	return this._zoneCenterPoint;
	// }
	// set zoneCenterPoint(value) {
	// 	unlockObjectField(this, "_zoneCenterPoint");

	// 	this._zoneCenterPoint = value;

	// 	lockObjectField(this, "_zoneCenterPoint");
	// }

	// /**
	//  * private static field
	//  *
	//  * Coordinates of the first point inside the zone
	//  */
	// get zoneUpperLeftPoint() {
	// 	return this._zoneUpperLeftPoint;
	// }
	// set zoneUpperLeftPoint(value) {
	// 	unlockObjectField(this, "_zoneUpperLeftPoint");

	// 	this._zoneUpperLeftPoint = value;

	// 	lockObjectField(this, "_zoneUpperLeftPoint");
	// }

	//#endregion
};