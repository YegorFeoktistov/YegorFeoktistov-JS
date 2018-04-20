/**
 * Static class Zone
 */
const Zone = {
	//#region Fields declaration

	/**
	 * private static field
	 *
	 * Does the zone shrink now?
	 */
	_isShrinking: false,

	/**
	 * private static field
	 *
	 * Coefficient of zone shrinking
	 */
	_shrinkCoefficient: 2.0,

	/**
	 * private static field
	 *
	 * Value of the current zone radius
	 */
	_zoneRadius: 0,

	/**
	 * private static field
	 *
	 * Coordinates of the zone center
	 */
	_zoneCenterPoint: {
		x: 0,
		y: 0
	},

	/**
	 * private static field
	 *
	 * Coordinates of the first point inside the zone
	 */
	_zoneUpperLeftPoint: {
		x: 0,
		y:0
	},

	//#endregion

	//#region Accessor functions declaration

	/**
	 * private static field
	 *
	 * Does the zone shrink now?
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
	 * private static field
	 *
	 * Coefficient of zone shrinking
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
	 * private static field
	 *
	 * Value of the current zone radius
	 */
	get zoneRadius() {
		return this._zoneRadius;
	},
	set zoneRadius(value) {
		unlockObjectField(this, "_zoneRadius");

		this._zoneRadius = value;

		lockObjectField(this, "_zoneRadius");
	},

	/**
	 * private static field
	 *
	 * Coordinates of the zone center
	 */
	get zoneCenterPoint() {
		return this._zoneCenterPoint;
	},
	set zoneCenterPoint(value) {
		unlockObjectField(this, "_zoneCenterPoint");

		this._zoneCenterPoint = value;

		lockObjectField(this, "_zoneCenterPoint");
	},

	/**
	 * private static field
	 *
	 * Coordinates of the first point inside the zone
	 */
	get zoneUpperLeftPoint() {
		return this._zoneUpperLeftPoint;
	},
	set zoneUpperLeftPoint(value) {
		unlockObjectField(this, "_zoneUpperLeftPoint");

		this._zoneUpperLeftPoint = value;

		lockObjectField(this, "_zoneUpperLeftPoint");
	},

	//#endregion

	//#region Class functions

	/**
	 * static function
	 *
	 * Main function of the zone algorithm
	 * @param {Array} location
	 * game location for processing
	 */
	shrink: function (location) {
		// Do this unreal shit! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
	},

	/**
	 * static function
	 *
	 * Generate center point of the zone
	 * @param {Number} zoneRadius
	 * radius of the created zone
	 */
	generateCenterPoint: function (zoneRadius) {
		// (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
	},

	/**
	 * static function
	 *
	 * Generate radius of the zone
	 * @param {Number} shrinkCoefficient
	 * coefficient of zone shrinking
	 */
	generateZoneRadius: function (shrinkCoefficient) {
		// (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
	},

	//#endregion

	//#region Functions for making private fields

	/**
	 *
	 * sets "writable" and "enumerable" attributes to "false"
	 * @param {*} object
	 * target object
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
	 *
	 * sets "writable" attribute of field to "false"
	 * @param {*} object
	 * target object
	 * @param {*} field
	 * target field
	 */
	lockObjectField: function(object, field) {
		Object.defineProperty(object, field, {
			writable: false
		});
	},

	/**
	 *
	 * sets "writable" attribute of field to "true"
	 * @param {*} object
	 * target object
	 * @param {*} field
	 * target field
	 */
	unlockObjectField: function(object, field) {
		Object.defineProperty(object, field, {
			writable: true
		});
	}

	//#endregion
};