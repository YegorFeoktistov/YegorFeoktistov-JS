import { Point } from "./point";

/**
 * @class
 * @description Represents rectangular shape of zone
 */
export class ZoneShape {
  //#region Class fields

  public upperLeftPoint: Point;
  public lowerRightPoint: Point;

  //#endregion

  //#region Constructor

  /** @constructor
   * @this {ZoneShape}
   * @description Constructor of the ZoneShape class */
  public constructor() {
    this.upperLeftPoint = new Point(0, 0);
    this.lowerRightPoint = new Point(0, 0);
  }

  //#endregion

  //#region Class functions

  public defineShape(upperLeftPoint: Point, lowerRightPoint: Point): void {
    this.upperLeftPoint.x = upperLeftPoint.x;
    this.upperLeftPoint.y = upperLeftPoint.y;

    this.lowerRightPoint.x = lowerRightPoint.x;
    this.lowerRightPoint.y = lowerRightPoint.y;
  }

  /**
   * @function
   * @description Calculates width using upper left and lower right points
   */
  public getWidth(): number {
    const width = this.lowerRightPoint.x - this.upperLeftPoint.x + 1;
    return width;
  }

  /**
   * @function
   * @description Calculates height using upper left and lower right points
   */
  public getHeight(): number {
    const height = this.lowerRightPoint.y - this.upperLeftPoint.y + 1;
    return height;
  }

  /**
   * @function
   * @description Returns value of the minimal side
   */
  public getMinimalSide(): number {
    const width = this.getWidth();
    const height = this.getHeight();

    return Math.min(width, height);
  }

  /**
   * @function
   * @description Returns value of the maximal side
   */
  public getMaximalSide(): number {
    const width = this.getWidth();
    const height = this.getHeight();

    return Math.max(width, height);

    //#endregion
  }


  // public shrinkShape(shrinkSteps: ShrinkSteps): void {
  //   this.upperLeftPoint.x += shrinkSteps.leftStep;
  //   this.upperLeftPoint.y += shrinkSteps.topStep;
  //   this.lowerRightPoint.x -= shrinkSteps.rightStep;
  //   this.lowerRightPoint.y -= shrinkSteps.bottomStep;
  //   this.calculateSides();
  // }

  // /**
  //  * @function
  //  * @description Calculates upper left point coordinates
  //  */
  // public calculateUpperLeftPoint(): void {
  //   this.upperLeftPoint.x = this.lowerRightPoint.x - this._width + 1;
  //   this.upperLeftPoint.y = this.lowerRightPoint.y - this._height + 1;
  // }

  // /**
  //  * @function
  //  * @description Calculates lower right point coordinates
  //  */
  // public calculateLowerRightPoint(): void {
  //   this.lowerRightPoint.x = this.upperLeftPoint.x + this._width - 1;
  //   this.lowerRightPoint.y = this.upperLeftPoint.y + this._height - 1;
  // }

  // /**
  //  * @function
  //  * @description Calculates width and height using upper left and lower right points
  //  */
  // public calculateSides(): void {
  //   this._width = this.lowerRightPoint.x - this.upperLeftPoint.x + 1;
  //   this._height = this.lowerRightPoint.y - this.upperLeftPoint.y + 1;
  // }

}