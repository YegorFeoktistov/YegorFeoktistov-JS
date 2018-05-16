import { Point } from "./point";

/**
 * @class
 * @description Represents rectangle shape of zone
 */
export class ZoneShape {
  private _upperLeftPoint: Point;
  private _side: number;
  private _lowerRightPoint: Point;

  //#region Constructor

	/** @constructor
	 * @param {Point} upperLeftPoint Upper left point of zone shape
	 * @param {number} side Side value
	 * @param {Point} lowerRightPoint Lower right point of zone shape
	 * @this {ZoneShape}
	 * @description Constructor of the ZoneShape class */
  constructor(upperLeftPoint: Point, side: number, lowerRightPoint: Point) {
    this._upperLeftPoint = upperLeftPoint;
    this._side = side;
    this._lowerRightPoint = lowerRightPoint;
  }

  //#endregion

  //#region Accessor functions declaration

	/**
	 * Accessor
	 * @description Upper left point of zone shape
	 */
  get upperLeftPoint(): Point {
    return this._upperLeftPoint;
  }
  set upperLeftPoint(value: Point) {
    this._upperLeftPoint = value;
  }

	/**
	 * Accessor
	 * @description Side value
	 */
  get side(): number {
    return this._side;
  }
  set side(value: number) {
    this._side = value;
  }

	/**
	 * Accessor
	 * @description Lower right point of zone shape
	 */
  get lowerRightPoint(): Point {
    return this._lowerRightPoint;
  }
  set lowerRightPoint(value: Point) {
    this._lowerRightPoint = value;
  }

  //#endregion

  //#region Class functions

	/**
	 * @function
	 * @description Calculates lower right point coordinates
	 */
  calculateLowerRightPoint(): void {
    this.lowerRightPoint.x = this.upperLeftPoint.x + this.side - 1;
    this.lowerRightPoint.y = this.upperLeftPoint.y + this.side - 1;
  }

	/**
	 * @function
	 * @description Calculates side using upper left and lower right points
	 */
  calculateSide(): void {
    this.side = this.lowerRightPoint.x - this.upperLeftPoint.x + 1;
  }

  //#endregion
};