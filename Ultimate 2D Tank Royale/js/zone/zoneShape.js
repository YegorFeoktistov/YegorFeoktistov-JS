/**
 * @class
 */
const ZoneShape = {

	/** @constructor
	 * @param {number} x1 Upper left point x coordinate
	 * @param {number} y1 Upper left point y coordinate
	 * @param {number} side Side value
	 * @param {number} x2 Lower right point x coordinate
	 * @param {number} y2 Lower right point y coordinate
	 * @this {ZoneShape}
	 * @description Constructor of the ZoneShape class */
	constructor: function (x1, y1, side, x2, y2) {
		this._x1 = x1;
		this._y1 = y1;
		this._side = side;
		this._x2 = x2;
		this._y2 = y2;

		this.lockAllFields(this);

		return this;
	},

	//#region Accessor functions declaration

	/**
	 * Accessor
	 * @description Upper left point x coordinate
	 */
	get x1() {
		return this._x1;
	},
	set x1(value) {
		unlockObjectField(this, "_x1");

		this._x1 = value;

		lockObjectField(this, "_x1");
	},

	/**
	 * Accessor
	 * @description Upper left point y coordinate
	 */
	get y1() {
		return this._y1;
	},
	set y1(value) {
		unlockObjectField(this, "_y1");

		this._y1 = value;

		lockObjectField(this, "_y1");
	},

	/**
	 * Accessor
	 * @description Lower right point x coordinate
	 */
	get x2() {
		return this._x2;
	},
	set x2(value) {
		unlockObjectField(this, "_x2");

		this._x2 = value;

		lockObjectField(this, "_x2");
	},

	/**
	 * Accessor
	 * @description Lower right point y coordinate
	 */
	get y2() {
		return this._y2;
	},
	set y2(value) {
		unlockObjectField(this, "_y2");

		this._y2 = value;

		lockObjectField(this, "_y2");
	},

	/**
	 * Accessor
	 * @description Side value
	 */
	get side() {
		return this._side;
	},
	set side(value) {
		unlockObjectField(this, "_side");

		this._side = value;

		lockObjectField(this, "_side");
	},

	//#endregion

	//#region Class functions

	/**
	 * @function
	 * @description Calculates lower right point coordinates
	 */
	calculateLowerRightPoint: function () {
		this.x2 = this.x1 + this.side - 1;
		this.y2 = this.y1 + this.side - 1;
	},

	/**
	 * @function
	 * @description Calculates side using upper left and lower right points
	 */
	calculateSide: function () {
		this.side = this.x2 - this.x1 + 1;
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