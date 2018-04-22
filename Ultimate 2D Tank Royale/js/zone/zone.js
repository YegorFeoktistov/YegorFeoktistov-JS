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

	//#endregion

	//#region Class functions

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @description Main function of the zone algorithm
	 */
	shrink: function (location, shrinkCoefficient, fillingObject = null) {
		this.shrinkCoefficient = shrinkCoefficient;

		// Verification of the first stage
		if (this.isFirstStage) {
			this.initializeFirstStage(location);
		}

		// Verification of the beginning of the new stage

		if (this.isNewStage) {
			this.beginNewStage();
		}

		// Verification of the continuation of the current stage

		this.continueCurrentStage();
	},

	/**
	 * @function @static
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {ZoneShape} currentZoneShape Current zone parameters
	 * @description Calculate parameters of the final zone
	 */
	calculateFinalZoneShape: function (shrinkCoefficient, currentZoneShape) {
		let finalZoneSide = currentZoneShape.side / shrinkCoefficient;
		finalZoneSideRounded = Math.round(finalZoneSide);
		finalZoneSide = finalZoneSideRounded <= 10 ? 10 : finalZoneSideRounded;

		// Для случая если нужна центральная точка
		// finalZoneSide = finalZoneSideRounded <= 10 ? 10 : finalZoneSideRounded % 2 !== 0 ? finalZoneSideRounded : finalZoneSideRounded - 1;

		const minBoundX = currentZoneShape.x1;
		const maxBoundX = currentZoneShape.x2 - finalZoneSide + 2;
		const minBoundY = currentZoneShape.y1;
		const maxBoundY = currentZoneShape.y2 - finalZoneSide + 2;

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
	 * @description Finds new final zone shape
	 */
	beginNewStage: function() {
		this.calculateFinalZoneShape(this.shrinkCoefficient, this.currentZoneShape);
		this.calculateVerticalSpeedDifference();
		this.calculateHorizontalSpeedDifference();
		this.isNewStage = false;
	},

	/**
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @description Fill an area outside the current zone
	 */
	continueCurrentStage: function(fillingObject) {

	},

	calculateVerticalSpeedDifference: function() {

	},

	calculateHorizontalSpeedDifference: function() {

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