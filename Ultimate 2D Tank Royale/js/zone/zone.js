import { ZoneShape } from "./zoneShape";

/**
 * @static @class
 */
const Zone = {
	//#region Fields declaration

	/**
	 * @property {boolean} _isFirstStage @private @static
	 * @description Is that a first stage of shrinking?
	 */
	_isFirstStage: true,

	/**
	 * @property {boolean} _isNewStage @private @static
	 * @description Is that a new stage of shrinking?
	 */
	_isNewStage: true,

	/**
	 * @property {number} _shrinkCoefficient @private @static
	 * @description Coefficient of zone shrinking
	 */
	_shrinkCoefficient: 2.0,

	/**
	 * @property {number} _lastZoneSide @private @static
	 * @description Value of the last zone side
	 */
	_lastZoneSide: 10,

	/**
	 * @property {ZoneShape} _finalZoneShape @private @static
	 * @description Parameters of the final zone shape:
	 * upper left point, lower right point, side
	 */
	_finalZoneShape: Object.create(ZoneShape).constructor(),

	/**
	 * @property {ZoneShape} _currentZoneShape @private @static
	 * @description Parameters of the current zone shape:
	 * upper left point, lower right point, side
	 */
	_currentZoneShape: Object.create(ZoneShape).constructor(),

	/**
	 * @property {number} _verticalDistancesRatio @private @static
	 * @description The ratio of the distances between the zones vertically
	 */
	_verticalDistancesRatio: 0,

	/**
	 * @property {number} _horizontalDistancesRatio @private @static
	 * @description The ratio of the distances between the zones horizontally
	 */
	_horizontalDistancesRatio: 0,

	/**
	 * @property {number} _topDistance @private @static
	 * @description Value of the top distance between zones
	 */
	_topDistance: 0,

	/**
	 * @property {number} _bottomDistance @private @static
	 * @description Value of the bottom distance between zones
	 */
	_bottomDistance: 0,

	/**
	 * @property {number} _leftDistance @private @static
	 * @description Value of the left distance between zones
	 */
	_leftDistance: 0,

	/**
	 * @property {number} _rightDistance @private @static
	 * @description Value of the right distance between zones
	 */
	_rightDistance: 0,

	//#endregion

	//#region Accessor functions declaration

	/**
	 * Accessor @static
	 * @description Is that a first stage of shrinking?
	 */
	get isFirstStage() {
		return this._isFirstStage;
	},
	set isFirstStage(value) {
		unlockObjectField(this, "_isFirstStage");

		this._isFirstStage = value;

		lockObjectField(this, "_isFirstStage");
	},

	/**
	 * Accessor @static
	 * @description Is that a new stage of shrinking
	 */
	get isNewStage() {
		return this._isNewStage;
	},
	set isNewStage(value) {
		unlockObjectField(this, "_isNewStage");

		this._isNewStage = value;

		lockObjectField(this, "_isNewStage");
	},

	/**
	 * Accessor @static
	 * @description Coefficient of zone shrinking
	 */
	get shrinkCoefficient() {
		return this._shrinkCoefficient;
	},
	set shrinkCoefficient(value) {
		unlockObjectField(this, "_shrinkCoefficient");

		this._shrinkCoefficient = value;

		lockObjectField(this, "_shrinkCoefficient");
	},

	/**
	 * Accessor @static
	 * @description Value of the last zone side
	 */
	get lastZoneSide() {
		return this._lastZoneSide;
	},
	set lastZoneSide(value) {
		unlockObjectField(this, "_lastZoneSide");

		this._lastZoneSide = value;

		lockObjectField(this, "_lastZoneSide");
	},

	/**
	 * Accessor @static
	 * @description Parameters of the final zone shape:
	 * upper left point, lower right point, side
	 */
	get finalZoneShape() {
		return this._finalZoneShape;
	},
	set finalZoneShape(value) {
		unlockObjectField(this, "_finalZoneShape");

		this._finalZoneShape = value;

		lockObjectField(this, "_finalZoneShape");
	},

	/**
	 * Accessor @static
	 * @description Parameters of the current zone shape:
	 * upper left point, lower right point, side
	 */
	get currentZoneShape() {
		return this._currentZoneShape;
	},
	set currentZoneShape(value) {
		unlockObjectField(this, "_currentZoneShape");

		this._currentZoneShape = value;

		lockObjectField(this, "_currentZoneShape");
	},

	/**
	 * Accessor @static
	 * @description The ratio of the distances between the zones vertically
	 */
	get verticalDistancesRatio() {
		return this._verticalDistancesRatio;
	},
	set verticalDistancesRatio(value) {
		unlockObjectField(this, "_verticalDistancesRatio");

		this._verticalDistancesRatio = value;

		lockObjectField(this, "_verticalDistancesRatio");
	},

	/**
	 * Accessor @static
	 * @description The ratio of the distances between the zones horizontally
	 */
	get horizontalDistancesRatio() {
		return this._horizontalDistancesRatio;
	},
	set horizontalDistancesRatio(value) {
		unlockObjectField(this, "_horizontalDistancesRatio");

		this._horizontalDistancesRatio = value;

		lockObjectField(this, "_horizontalDistancesRatio");
	},

	/**
	 * Accessor @static
	 * @description Value of the top distance between zones
	 */
	get topDistance() {
		return this._topDistance;
	},
	set topDistance(value) {
		unlockObjectField(this, "_topDistance");

		this._topDistance = value;

		lockObjectField(this, "_topDistance");
	},

	/**
	 * Accessor @static
	 * @description Value of the bottom distance between zones
	 */
	get bottomDistance() {
		return this._bottomDistance;
	},
	set bottomDistance(value) {
		unlockObjectField(this, "_bottomDistance");

		this._bottomDistance = value;

		lockObjectField(this, "_bottomDistance");
	},

	/**
	 * Accessor @static
	 * @description Value of the left distance between zones
	 */
	get leftDistance() {
		return this._leftDistance;
	},
	set leftDistance(value) {
		unlockObjectField(this, "_leftDistance");

		this._leftDistance = value;

		lockObjectField(this, "_leftDistance");
	},

	/**
	 * Accessor @static
	 * @description Value of the right distance between zones
	 */
	get rightDistance() {
		return this._rightDistance;
	},
	set rightDistance(value) {
		unlockObjectField(this, "_rightDistance");

		this._rightDistance = value;

		lockObjectField(this, "_rightDistance");
	},

	//#endregion

	//#region Class functions

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @description Main function of the zone algorithm
	 */
	shrink: function (location, shrinkCoefficient, lastZoneSide, fillingObject = null) {
		this.shrinkCoefficient = shrinkCoefficient;
		this.lastZoneSide = lastZoneSide;

		// Verification of the first stage
		if (this.isFirstStage) {
			this.initializeFirstStage(location);
		}

		// Verification of the beginning of the new stage

		if (this.isNewStage) {
			this.beginNewStage();
		}

		// Continuation of the current stage

		this.continueCurrentStage();
	},

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @description Sets game location shape as current zone shape
	 */
	initializeFirstStage: function(location) {
		this.currentZoneShape.x1 = 0;
		this.currentZoneShape.y1 = 0;
		this.currentZoneShape.x2 = location.length - 1;
		this.currentZoneShape.y2 = location[0].length - 1;
		this.currentZoneShape.calculateSide();

		this.isFirstStage = false;
		this.isNewStage = true;
	},

	/**
	 * @function @static
	 * @description Finds new final zone shape
	 */
	beginNewStage: function() {
		this.calculateFinalZoneShape();
		this.calculateDistances();
		this.calculateVerticalDistancesRatio();
		this.calculateHorizontalDistancesRatio();
		this.isNewStage = false;
	},

	/**
	 * @function @static
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @description Fill an area outside the current zone
	 */
	continueCurrentStage: function(fillingObject) {
		const topStep;
		const bottomStep;
		const leftStep;
		const rightStep;

		const verticalStepCount;
		const horizontalStepCount;

		// Vertical

		const isTopSideReached = this.currentZoneShape.y1 === this.finalZoneShape.y1;
		const isBottomSideReached = this.currentZoneShape.y2 === this.finalZoneShape.y2;

		if (!isTopSideReached && !isBottomSideReached) {
			for (let i = this.currentZoneShape.x1; i < this.currentZoneShape.side; i++) {
				const topDistance = Math.abs(this.finalZoneShape.y1 - this.currentZoneShape.y1);
				const bottomDistance = Math.abs(this.currentZoneShape.y2 - this.finalZoneShape.y2);

				if (topDistance > bottomDistance) {

				}
				else if (topDistance < bottomDistance) {

				}
				else {

				}
			}
		}
		else if (isTopSideReached && !isBottomSideReached) {

		}
		else if (!isTopSideReached && isBottomSideReached) {

		}

		// Horizontal



		if (this.checkFinalZoneReached()) {
			this.isNewStage = true;
		}
	},

	/**
	 * @function @static
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {ZoneShape} currentZoneShape Current zone parameters
	 * @description Calculate parameters of the final zone
	 */
	calculateFinalZoneShape: function () {
		let finalZoneSide = this.currentZoneShape.side / this.shrinkCoefficient;
		const finalZoneSideRounded = Math.round(finalZoneSide);
		finalZoneSide = finalZoneSideRounded <= this.lastZoneSide ? this.lastZoneSide : finalZoneSideRounded;

		// Для случая если нужна центральная точка
		// finalZoneSide = finalZoneSideRounded <= this.lastZoneSide ? this.lastZoneSide : finalZoneSideRounded % 2 !== 0 ? finalZoneSideRounded : finalZoneSideRounded - 1;

		const minBoundX = this.currentZoneShape.x1;
		const maxBoundX = this.currentZoneShape.x2 - finalZoneSide + 2;
		const minBoundY = this.currentZoneShape.y1;
		const maxBoundY = this.currentZoneShape.y2 - finalZoneSide + 2;

		const finalZoneX1 = Math.floor(Math.random() * (maxBoundX - minBoundX) + minBoundX);
		const finalZoneY1 = Math.floor(Math.random() * (maxBoundY - minBoundY) + minBoundY);

		this.finalZoneShape.x1 = finalZoneX1;
		this.finalZoneShape.y1 = finalZoneY1;
		this.finalZoneShape.side = finalZoneSide;
		this.finalZoneShape.calculateLowerRightPoint();
	},

	/**
	 * @function @static
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {ZoneShape} currentZoneShape Current zone parameters
	 * @description Calculate parameters of the current zone
	 */
	calculateCurrentZoneShape: function (/* shrinkCoefficient, currentZoneShape */) {

		// let finalZoneSide = currentZoneShape.side / shrinkCoefficient;
		// finalZoneSideRounded = Math.round(finalZoneSide);
		// finalZoneSide = finalZoneSideRounded <= 10 ? 10 : finalZoneSideRounded;

		// // Для случая если нужна центральная точка
		// // finalZoneSide = finalZoneSideRounded <= 10 ? 10 : finalZoneSideRounded % 2 !== 0 ? finalZoneSideRounded : finalZoneSideRounded - 1;

		// const minBoundX = currentZoneShape.x1;
		// const maxBoundX = currentZoneShape.x2 - finalZoneSide + 2;
		// const minBoundY = currentZoneShape.y1;
		// const maxBoundY = currentZoneShape.y2 - finalZoneSide + 2;

		// const finalZoneX1 = Math.floor(Math.random() * (maxBoundX - minBoundX) + minBoundX);
		// const finalZoneY1 = Math.floor(Math.random() * (maxBoundY - minBoundY) + minBoundY);

		// this.finalZoneShape.x1 = finalZoneX1;
		// this.finalZoneShape.y1 = finalZoneY1;
		// this.finalZoneShape.side = finalZoneSide;
		// this.finalZoneShape.calculateLowerRightPoint();
	},

	/**
	 * @function @static
	 * @description Check if the current zone reaches the final zone
	 */
	checkFinalZoneReached: function() {
		if (
			this.currentZoneShape.x1 === this.finalZoneShape.x1
			&& this.currentZoneShape.y1 === this.finalZoneShape.y1
			&& this.currentZoneShape.side === this.finalZoneShape.side
		) {
			return true;
		}
		else {
			return false;
		}
	},

	/**
	 * @description Calculates the ratio between the vertical distances of zones
	 */
	calculateVerticalDistancesRatio: function() {
		if (topDistance <= 0 || bottomDistance <= 0) {
			this.verticalDistancesRatio = 0;
		}
		else {
			const max = Math.max(topDistance, bottomDistance);
			const min = Math.min(topDistance, bottomDistance);
			this.verticalDistancesRatio = Math.floor(max / min);
		}
	},

	/**
	 * @description Calculates the ratio between the horizontal distances of zones
	 */
	calculateHorizontalDistancesRatio: function() {
		if (leftDistance <= 0 || rightDistance <= 0) {
			this.horizontalDistancesRatio = 0;
		}
		else {
			const max = Math.max(leftDistance, rightDistance);
			const min = Math.min(leftDistance, rightDistance);
			this.horizontalDistancesRatio = Math.floor(max / min);
		}
	},

	/**
	 * @description Calculates distances between zones
	 */
	calculateDistances: function() {
		this.topDistance = Math.abs(this.finalZoneShape.y1 - this.currentZoneShape.y1);
		this.bottomDistance = Math.abs(this.currentZoneShape.y2 - this.finalZoneShape.y2);
		this.leftDistance = Math.abs(this.finalZoneShape.x1 - this.currentZoneShape.x1);
		this.rightDistance = Math.abs(this.currentZoneShape.x2 - this.finalZoneShape.x2);
	},

	shrinkTop: function(params) {

	},

	shrinkBottom: function(params) {

	},

	shrinkLeft: function(params) {

	},

	shrinkRight: function(params) {

	},

	/**
	 * !! Not used right now !!
	 */
	drawZoneBorderline : function(location) {
		// (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
	},

	//#endregion

	//#region Functions for making private fields

	/**
	 * @function
	 * @param {*} object Target object
	 * @description Sets "writable" and "enumerable" attributes to "false"
	 */
	lockAllFields: function(object) {
		for (property in object) {
			if (property[0] === "_") {
				Object.defineProperty(object, property, {
					enumerable: false,
					writable: false
				});
			}
		}
	},

	/**
	 * @function
	 * @param {*} object Target object
	 * @param {*} field Target field
	 * @description Sets "writable" attribute of field to "false"
	 */
	lockObjectField: function(object, field) {
		Object.defineProperty(object, field, {
			writable: false
		});
	},

	/**
	 * @function
	 * @param {*} object Target object
	 * @param {*} field Target field
	 * @description Sets "writable" attribute of field to "true"
	 */
	unlockObjectField: function(object, field) {
		Object.defineProperty(object, field, {
			writable: true
		});
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
	// },

	// /**
	//  * private static field
	//  *
	//  * Coordinates of the first point inside the zone
	//  */
	// _zoneUpperLeftPoint: {
	// 	x: 0,
	// 	y:0
	// },

	// /**
	//  * private static field
	//  *
	//  * Value of the current zone radius
	//  */
	// get zoneRadius() {
	// 	return this._zoneRadius;
	// },
	// set zoneRadius(value) {
	// 	unlockObjectField(this, "_zoneRadius");

	// 	this._zoneRadius = value;

	// 	lockObjectField(this, "_zoneRadius");
	// },

	// /**
	//  * private static field
	//  *
	//  * Coordinates of the zone center
	//  */
	// get zoneCenterPoint() {
	// 	return this._zoneCenterPoint;
	// },
	// set zoneCenterPoint(value) {
	// 	unlockObjectField(this, "_zoneCenterPoint");

	// 	this._zoneCenterPoint = value;

	// 	lockObjectField(this, "_zoneCenterPoint");
	// },

	// /**
	//  * private static field
	//  *
	//  * Coordinates of the first point inside the zone
	//  */
	// get zoneUpperLeftPoint() {
	// 	return this._zoneUpperLeftPoint;
	// },
	// set zoneUpperLeftPoint(value) {
	// 	unlockObjectField(this, "_zoneUpperLeftPoint");

	// 	this._zoneUpperLeftPoint = value;

	// 	lockObjectField(this, "_zoneUpperLeftPoint");
	// },

	//#endregion
};