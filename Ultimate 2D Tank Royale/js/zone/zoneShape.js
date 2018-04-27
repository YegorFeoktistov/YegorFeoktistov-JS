/**
 * @class
 * @description Represents rectangle shape of zone
 */
class ZoneShape {
	//#region Constructor

	/** @constructor
	 * @param {Point} upperLeftPoint Upper left point of zone shape
	 * @param {number} side Side value
	 * @param {Point} lowerRightPoint Lower right point of zone shape
	 * @this {ZoneShape}
	 * @description Constructor of the ZoneShape class */
	constructor(upperLeftPoint, side, lowerRightPoint) {
		this._upperLeftPoint = upperLeftPoint;
		this._side = side;
		this._lowerRightPoint = lowerRightPoint;

		Lock.lockAllFields(this);
	}

	//#endregion

	//#region Accessor functions declaration

	/**
	 * Accessor
	 * @description Upper left point of zone shape
	 */
	get upperLeftPoint() {
		return this._upperLeftPoint;
	}
	set upperLeftPoint(value) {
		Lock.unlockObjectField(this, "_upperLeftPoint");

		this._upperLeftPoint = value;

		Lock.lockObjectField(this, "_upperLeftPoint");
	}

	/**
	 * Accessor
	 * @description Side value
	 */
	get side() {
		return this._side;
	}
	set side(value) {
		Lock.unlockObjectField(this, "_side");

		this._side = value;

		Lock.lockObjectField(this, "_side");
	}

	/**
	 * Accessor
	 * @description Lower right point of zone shape
	 */
	get lowerRightPoint() {
		return this._lowerRightPoint;
	}
	set lowerRightPoint(value) {
		Lock.unlockObjectField(this, "_lowerRightPoint");

		this._lowerRightPoint = value;

		Lock.lockObjectField(this, "_lowerRightPoint");
	}

	//#endregion

	//#region Class functions

	/**
	 * @function
	 * @description Calculates lower right point coordinates
	 */
	calculateLowerRightPoint() {
		this.lowerRightPoint.x = this.upperLeftPoint.x + this.side - 1;
		this.lowerRightPoint.y = this.upperLeftPoint.y + this.side - 1;
	}

	/**
	 * @function
	 * @description Calculates side using upper left and lower right points
	 */
	calculateSide() {
		this.side = this.lowerRightPoint.x - this.upperLeftPoint.x + 1;
	}

	//#endregion
};