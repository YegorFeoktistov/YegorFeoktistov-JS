/**
 * Static class Zone
 */
const Zone = {
	//#region Fields declaration

	/**
	 * @property {boolean} _isShrinking @private @static
	 * @description Does the zone shrink now?
	 */
	_isShrinking: false,

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

	//#endregion

	//#region Accessor functions declaration

	/**
	 * Accessor @static
	 * @description Does the zone shrink now?
	 */
	get isShrinking() {
		return this._isShrinking;
	},
	set isShrinking(value) {
		unlockObjectField(this, "_isShrinking");

		this._isShrinking = value;

		lockObjectField(this, "_isShrinking");
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

	//#region Class functions

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @description Main function of the zone algorithm
	 */
	shrink: function (location) {
		// Do this unreal shit! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
	},

	/**
	 * @function @static
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {ZoneShape} currentZoneShape Current zone parameters
	 * @description Calculate parameters of the final zone
	 */
	calculateFinalZoneShape: function (shrinkCoefficient, currentZoneShape) {
		const finalZoneSide = currentZoneShape.side / shrinkCoefficient;
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
};