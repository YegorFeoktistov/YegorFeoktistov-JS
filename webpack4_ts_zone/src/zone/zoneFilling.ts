import { Battlefield } from "./battlefield";

/**
 * @class
 * @static
 * @description Fills the game battlefield with shrinking zone
 */
export class ZoneFilling {
  /**
   * @constructor
   * @description Private constructor of static class
   */
  private constructor() {
  }

  /**
   * @method
   * @param {Battlefield} battlefield Game battlefield for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} mainYIndex Y index of the main filling side
   * @param {number} commonStepYIndex Y index of the opposite filling side
   * @param {boolean} isCommonStep Value for tracking the common shrinking step
   * @description Fills vertical sides of the zone if vertical distances are unequal
   */
  public static unequalDistancesVerticalLoop(
    battlefield: Battlefield,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    mainYIndex: number,
    commonStepYIndex: number,
    isCommonStep: boolean
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      battlefield.location[i][mainYIndex] = fillingObject;

      if (isCommonStep) {
        battlefield.location[i][commonStepYIndex] = fillingObject;
      }
    }
  }

  /**
   * @method
   * @param {Battlefield} battlefield Game battlefield for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} upperYIndex Y index of the top filling side
   * @param {number} lowerYIndex Y index of the bottom filling side
   * @description Fills vertical sides of the zone if vertical distances are equal
   */
  public static equalDistancesVerticalLoop(
    battlefield: Battlefield,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    upperYIndex: number,
    lowerYIndex: number
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      battlefield.location[i][upperYIndex] = fillingObject;
      battlefield.location[i][lowerYIndex] = fillingObject;
    }
  }

  /**
   * @method
   * @param {Battlefield} battlefield Game battlefield for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} sideYIndex Y index of the filling side
   * @description Fills one vertical side of the zone
   */
  public static zeroDistanceVerticalLoop(
    battlefield: Battlefield,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    sideYIndex: number
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      battlefield.location[i][sideYIndex] = fillingObject;
    }
  }

  /**
   * @method
   * @param {Battlefield} battlefield Game battlefield for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} mainXIndex X index of the main filling side
   * @param {number} commonStepXIndex X index of the opposite filling side
   * @param {boolean} isCommonStep Value for tracking the common shrinking step
   * @description Fills horizontal sides of the zone if horizontal distances are unequal
   */
  public static unequalDistancesHorizontalLoop(
    battlefield: Battlefield,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    mainXIndex: number,
    commonStepXIndex: number,
    isCommonStep: boolean
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      battlefield.location[mainXIndex][i] = fillingObject;

      if (isCommonStep) {
        battlefield.location[commonStepXIndex][i] = fillingObject;
      }
    }
  }

  /**
   * @method
   * @param {Battlefield} battlefield Game battlefield for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} upperXIndex X index of the left filling side
   * @param {number} lowerXIndex X index of the right filling side
   * @description Fills horizontal sides of the zone if horizontal distances are equal
   */
  public static equalDistancesHorizontalLoop(
    battlefield: Battlefield,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    upperXIndex: number,
    lowerXIndex: number
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      battlefield.location[upperXIndex][i] = fillingObject;
      battlefield.location[lowerXIndex][i] = fillingObject;
    }
  }

  /**
   * @method
   * @param {Battlefield} battlefield Game battlefield for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} sideXIndex X index of the filling side
   * @description Fills one horizontal side of the zone
   */
  public static zeroDistanceHorizontalLoop(
    battlefield: Battlefield,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    sideXIndex: number
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      battlefield.location[sideXIndex][i] = fillingObject;
    }
  }
}
