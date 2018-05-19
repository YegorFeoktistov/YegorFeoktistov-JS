import { Point } from "./point";

/**
 * @class
 * @description Represents square shape of zone
 */
export class ZoneShape {
  //#region Class fields

  private _upperLeftPoint: Point;
  // private _side: number;
  private _lowerRightPoint: Point;
  private _width: number;
  private _height: number;

  //#endregion

  //#region Constructor

  /** @constructor
   * @param {Point} upperLeftPoint Upper left point of zone shape
   * @param {number} side Side value
   * @param {Point} lowerRightPoint Lower right point of zone shape
   * @param {number} width Width value
   * @param {number} height Height value
   * @this {ZoneShape}
   * @description Constructor of the ZoneShape class */
  public constructor(upperLeftPoint: Point, /* side: number, */ lowerRightPoint: Point/* , width: number, height: number */) {
    this._upperLeftPoint = upperLeftPoint;
    // this._side = side;
    this._lowerRightPoint = lowerRightPoint;
    // this._width = width;
    // this._height = height;
  }

  //#endregion

  //#region Accessor functions

  /**
   * Accessor
   * @description Upper left point of zone shape
   */
  public get upperLeftPoint(): Point {
    return this._upperLeftPoint;
  }
  public set upperLeftPoint(value: Point) {
    this._upperLeftPoint = value;
  }

  // /**
  //  * Accessor
  //  * @description Side value
  //  */
  // public get side(): number {
  //   return this._side;
  // }
  // public set side(value: number) {
  //   this._side = value;
  // }

  /**
   * Accessor
   * @description Lower right point of zone shape
   */
  public get lowerRightPoint(): Point {
    return this._lowerRightPoint;
  }
  public set lowerRightPoint(value: Point) {
    this._lowerRightPoint = value;
  }

  /**
   * Accessor
   * @description Width value
   */
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }

  /**
   * Accessor
   * @description Height value
   */
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  //#endregion

  //#region Class functions

  /**
   * @function
   * @description Calculates upper left point coordinates
   */
  public calculateUpperLeftPoint(): void {
    this._upperLeftPoint.x = this._lowerRightPoint.x - this._width + 1;
    this._upperLeftPoint.y = this._lowerRightPoint.y - this._height + 1;
  }

  /**
   * @function
   * @description Calculates lower right point coordinates
   */
  public calculateLowerRightPoint(): void {
    this._lowerRightPoint.x = this._upperLeftPoint.x + this._width - 1;
    this._lowerRightPoint.y = this._upperLeftPoint.y + this._height - 1;
  }

  // /**
  //  * @function
  //  * @description Calculates side using upper left and lower right points
  //  */
  // public calculateSide(): void {
  //   this._side = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;
  // }

  /**
   * @function
   * @description Calculates width and height using upper left and lower right points
   */
  public calculateSides(): void {
    this._width = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;
    this._height = this._lowerRightPoint.y - this._upperLeftPoint.y + 1;
  }

  /**
   * @function
   * @description Calculates width using upper left and lower right points
   */
  public calculateWidth(): void {
    this._width = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;
  }

  /**
   * @function
   * @description Calculates height using upper left and lower right points
   */
  public calculateHeight(): void {
    this._height = this._lowerRightPoint.y - this._upperLeftPoint.y + 1;
  }

  /**
   * @function
   * @description Returns value of the minimal side
   */
  public getMinimalSide(): number {
    return Math.min(this._width, this._height);
  }

  /**
   * @function
   * @description Returns value of the maximal side
   */
  public getMaximalSide(): number {
    return Math.max(this._width, this._height);
  }

  // /* This 2 methods will be removed, because width and height of the battlefield
  //    can be obtained using appropriate getters of the battlefield object */

  // public getVerticalSide(): number {
  //   const verticalSide = this._lowerRightPoint.y - this._upperLeftPoint.y + 1;
  //   return verticalSide;
  // }

  // public getHorizontalSide(): number {
  //   const horizontalSide = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;
  //   return horizontalSide;
  // }

  //#endregion
};