/**
 * @class
 * @description Represents coordinate point
 */
class Point {
	//#region Constructor

	/** @constructor
	 * @param {number} x X coordinate of a point
	 * @param {number} y Y coordinate of a point
	 * @this {Point}
	 * @description Constructor of the Point class */
	constructor(x, y) {
		this._x = x;
		this._y = y;

		Lock.lockAllFields(this);
	}

	//#endregion

	//#region Accessor functions declaration

	/**
	 * Accessor
	 * @description X coordinate of a point
	 */
	get x() {
		return this._x;
	}
	set x(value) {
		Lock.unlockObjectField(this, "_x");

		this._x = value;

		Lock.lockObjectField(this, "_x");
	}

	/**
	 * Accessor
	 * @description Y coordinate of a point
	 */
	get y() {
		return this._y;
	}
	set y(value) {
		Lock.unlockObjectField(this, "_y");

		this._y = value;

		Lock.lockObjectField(this, "_y");
	}

	//#endregion
}