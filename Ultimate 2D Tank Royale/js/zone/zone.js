/*
Надо обмозговать:
	-Проверку на итоговый размер зоны оформить красивее. Пока что это костыль в методе shrinkVertically()
	-В JSDocs не документировал параметр borderFillingObject у функций
	-Подумать, стоит ли передавать какие-либо свойства в параметрах конструктора, чтобы юзер типо настраивать их мог. Если да, то какие именно. Задавать ли им значения по умолчанию? Какие параметры стоит хранить как поля объекта, а какие - только передавать в shrink(), но внутри не хранить.
	-Попробовать сыграть от конструктора и создания экземпляра зоны
	-Всё это говно нужно в ES6 перекидывать, да побыстрее
	-Сделать сущность Point?
	-Стоит ли делать так y1 = this.currentZoneShape.y1 в методах сжатия, в местах где цикл прописывается и в простых обращениях к ячейке локации. Стоит ли это того?
*/
// import { ZoneShape } from "./zoneShape";

/**
 * @static @class
 */
const Zone = {
	//#region Constructor

	/** @constructor
	 * @this {Zone}
	 * @description Constructor of the Zone class */
	/* constructor: function (
		isFirstStage = true,
		isNewStage = true,
		shrinkCoefficient = 2.0,
		lastZoneSide = 10,
		finalZoneShape = Object.create(ZoneShape).constructor(),
		currentZoneShape = Object.create(ZoneShape).constructor(),
		verticalDistancesRatio = 0,
		horizontalDistancesRatio = 0,
		topDistance = 0,
		bottomDistance = 0,
		leftDistance = 0,
		rightDistance = 0,
		verticalStepCount = 0,
		horizontalStepCount = 0,
	) {
		this._isFirstStage = isFirstStage;
		this._isNewStage = isNewStage;
		this._shrinkCoefficient = shrinkCoefficient;
		this._lastZoneSide = lastZoneSide;
		this._finalZoneShape = finalZoneShape;
		this._currentZoneShape = currentZoneShape;
		this._verticalDistancesRatio = verticalDistancesRatio;
		this._horizontalDistancesRatio = horizontalDistancesRatio;
		this._topDistance = topDistance;
		this._bottomDistance = bottomDistance;
		this._leftDistance = leftDistance;
		this._rightDistance = rightDistance;
		this._verticalStepCount = verticalStepCount;
		this._horizontalStepCount = horizontalStepCount;

		this.lockAllFields(this);

		return this;
	}, */

	//#endregion

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
	 * @property {number} _lastZoneSide @private @static
	 * @description Value of the last zone side
	 */
	_lastZoneSide: 10,

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

	/**
	 * @property {number} _verticalDistancesRatio @private @static
	 * @description The ratio of the distances between the zones vertically
	 */
	_verticalDistancesRatio: 0,

	/**
	 * @property {number} _horizontalDistancesRatio @private @static
	 * @description The ratio of the distances between the zones horizontally
	 */
	_horizontalDistancesRatio: 0,

	/**
	 * @property {number} _topDistance @private @static
	 * @description Value of the top distance between zones
	 */
	_topDistance: 0,

	/**
	 * @property {number} _bottomDistance @private @static
	 * @description Value of the bottom distance between zones
	 */
	_bottomDistance: 0,

	/**
	 * @property {number} _leftDistance @private @static
	 * @description Value of the left distance between zones
	 */
	_leftDistance: 0,

	/**
	 * @property {number} _rightDistance @private @static
	 * @description Value of the right distance between zones
	 */
	_rightDistance: 0,

	/**
	 * @property {number} _verticalStepCount @private @static
	 * @description Value of the vertical shrinking steps
	 */
	_verticalStepCount: 0,

	/**
	 * @property {number} _horizontalStepCount @private @static
	 * @description Value of the horizontal shrinking steps
	 */
	_horizontalStepCount: 0,

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
		this.unlockObjectField(this, "_isFirstStage");

		this._isFirstStage = value;

		this.lockObjectField(this, "_isFirstStage");
	},

	/**
	 * Accessor @static
	 * @description Is that a new stage of shrinking
	 */
	get isNewStage() {
		return this._isNewStage;
	},
	set isNewStage(value) {
		this.unlockObjectField(this, "_isNewStage");

		this._isNewStage = value;

		this.lockObjectField(this, "_isNewStage");
	},

	/**
	 * Accessor @static
	 * @description Coefficient of zone shrinking
	 */
	get shrinkCoefficient() {
		return this._shrinkCoefficient;
	},
	set shrinkCoefficient(value) {
		this.unlockObjectField(this, "_shrinkCoefficient");

		this._shrinkCoefficient = value;

		this.lockObjectField(this, "_shrinkCoefficient");
	},

	/**
	 * Accessor @static
	 * @description Value of the last zone side
	 */
	get lastZoneSide() {
		return this._lastZoneSide;
	},
	set lastZoneSide(value) {
		this.unlockObjectField(this, "_lastZoneSide");

		this._lastZoneSide = value;

		this.lockObjectField(this, "_lastZoneSide");
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
		this.unlockObjectField(this, "_finalZoneShape");

		this._finalZoneShape = value;

		this.lockObjectField(this, "_finalZoneShape");
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
		this.unlockObjectField(this, "_currentZoneShape");

		this._currentZoneShape = value;

		this.lockObjectField(this, "_currentZoneShape");
	},

	/**
	 * Accessor @static
	 * @description The ratio of the distances between the zones vertically
	 */
	get verticalDistancesRatio() {
		return this._verticalDistancesRatio;
	},
	set verticalDistancesRatio(value) {
		this.unlockObjectField(this, "_verticalDistancesRatio");

		this._verticalDistancesRatio = value;

		this.lockObjectField(this, "_verticalDistancesRatio");
	},

	/**
	 * Accessor @static
	 * @description The ratio of the distances between the zones horizontally
	 */
	get horizontalDistancesRatio() {
		return this._horizontalDistancesRatio;
	},
	set horizontalDistancesRatio(value) {
		this.unlockObjectField(this, "_horizontalDistancesRatio");

		this._horizontalDistancesRatio = value;

		this.lockObjectField(this, "_horizontalDistancesRatio");
	},

	/**
	 * Accessor @static
	 * @description Value of the top distance between zones
	 */
	get topDistance() {
		return this._topDistance;
	},
	set topDistance(value) {
		this.unlockObjectField(this, "_topDistance");

		this._topDistance = value;

		this.lockObjectField(this, "_topDistance");
	},

	/**
	 * Accessor @static
	 * @description Value of the bottom distance between zones
	 */
	get bottomDistance() {
		return this._bottomDistance;
	},
	set bottomDistance(value) {
		this.unlockObjectField(this, "_bottomDistance");

		this._bottomDistance = value;

		this.lockObjectField(this, "_bottomDistance");
	},

	/**
	 * Accessor @static
	 * @description Value of the left distance between zones
	 */
	get leftDistance() {
		return this._leftDistance;
	},
	set leftDistance(value) {
		this.unlockObjectField(this, "_leftDistance");

		this._leftDistance = value;

		this.lockObjectField(this, "_leftDistance");
	},

	/**
	 * Accessor @static
	 * @description Value of the right distance between zones
	 */
	get rightDistance() {
		return this._rightDistance;
	},
	set rightDistance(value) {
		this.unlockObjectField(this, "_rightDistance");

		this._rightDistance = value;

		this.lockObjectField(this, "_rightDistance");
	},

	/**
	 * Accessor @static
	 * @description Value of the vertical shrinking steps
	 */
	get verticalStepCount() {
		return this._verticalStepCount;
	},
	set verticalStepCount(value) {
		this.unlockObjectField(this, "_verticalStepCount");

		this._verticalStepCount = value;

		this.lockObjectField(this, "_verticalStepCount");
	},

	/**
	 * Accessor @static
	 * @description Value of the horizontal shrinking steps
	 */
	get horizontalStepCount() {
		return this._horizontalStepCount;
	},
	set horizontalStepCount(value) {
		this.unlockObjectField(this, "_horizontalStepCount");

		this._horizontalStepCount = value;

		this.lockObjectField(this, "_horizontalStepCount");
	},

	//#endregion

	//#region Class functions

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @param {number} shrinkCoefficient Coefficient of zone shrinking
	 * @param {number} lastZoneSide Value of the last zone side
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @description Main function of the zone algorithm
	 */
	shrink: function (location, shrinkCoefficient, lastZoneSide, fillingObject = null, borderFillingObject = 0) {
		this.shrinkCoefficient = shrinkCoefficient;
		this.lastZoneSide = lastZoneSide;

		// Verification of the first stage
		if (this.isFirstStage) {
			this.initializeFirstStage(location);
		}

		// Verification of the beginning of the new stage

		if (this.isNewStage) {
			this.beginNewStage(location, borderFillingObject);
		}

		// Continuation of the current stage

		this.continueCurrentStage(location, fillingObject);
	},

	/**
	 * @function @static
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
	 * @function @static
	 * @param {array} location Game location for processing
	 * @description Finds new final zone shape
	 */
	beginNewStage: function(location, borderFillingObject) {
		this.clearBorder(location, cleanerObject = " ");
		this.calculateFinalZoneShape();
		this.calculateDistances();
		this.calculateVerticalDistancesRatio();
		this.calculateHorizontalDistancesRatio();
		this.drawZoneBorderline(location, borderFillingObject);

		this.verticalStepCount = 0;
		this.horizontalStepCount = 0;

		this.isNewStage = false;
	},

	/**
	 * @function @static
	 * @description Calculate parameters of the final zone
	 */
	calculateFinalZoneShape: function () {
		let finalZoneSide = this.currentZoneShape.side / this.shrinkCoefficient;
		const finalZoneSideRounded = Math.round(finalZoneSide);
		finalZoneSide = finalZoneSideRounded <= this.lastZoneSide ? this.lastZoneSide : finalZoneSideRounded;

		// Для случая если нужна центральная точка
		// finalZoneSide = finalZoneSideRounded <= this.lastZoneSide
		// ? this.lastZoneSide : finalZoneSideRounded % 2 !== 0
		// ? finalZoneSideRounded : finalZoneSideRounded - 1;

		const minBoundX = this.currentZoneShape.x1;
		const maxBoundX = this.currentZoneShape.x2 - finalZoneSide + 2;
		const minBoundY = this.currentZoneShape.y1;
		const maxBoundY = this.currentZoneShape.y2 - finalZoneSide + 2;

		const finalZoneX1 = Math.floor(Math.random() * (maxBoundX - minBoundX) + minBoundX);
		const finalZoneY1 = Math.floor(Math.random() * (maxBoundY - minBoundY) + minBoundY);

		this.finalZoneShape.x1 = finalZoneX1;
		this.finalZoneShape.y1 = finalZoneY1;
		this.finalZoneShape.side = finalZoneSide;
		this.finalZoneShape.calculateLowerRightPoint();
	},

	/**
	 * @function @static
	 * @description Calculates distances between zones
	 */
	calculateDistances: function() {
		this.topDistance = Math.abs(this.finalZoneShape.y1 - this.currentZoneShape.y1);
		this.bottomDistance = Math.abs(this.currentZoneShape.y2 - this.finalZoneShape.y2);
		this.leftDistance = Math.abs(this.finalZoneShape.x1 - this.currentZoneShape.x1);
		this.rightDistance = Math.abs(this.currentZoneShape.x2 - this.finalZoneShape.x2);
	},

	/**
	 * @function @static
	 * @description Calculates the ratio between the vertical distances of zones
	 */
	calculateVerticalDistancesRatio: function() {
		if (this.topDistance <= 0 || this.bottomDistance <= 0) {
			this.verticalDistancesRatio = 0;
		}
		else {
			const max = Math.max(this.topDistance, this.bottomDistance);
			const min = Math.min(this.topDistance, this.bottomDistance);
			this.verticalDistancesRatio = Math.floor(max / min);
		}
	},

	/**
	 * @function @static
	 * @description Calculates the ratio between the horizontal distances of zones
	 */
	calculateHorizontalDistancesRatio: function() {
		if (this.leftDistance <= 0 || this.rightDistance <= 0) {
			this.horizontalDistancesRatio = 0;
		}
		else {
			const max = Math.max(this.leftDistance, this.rightDistance);
			const min = Math.min(this.leftDistance, this.rightDistance);
			this.horizontalDistancesRatio = Math.floor(max / min);
		}
	},

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @description Fill an area outside the current zone
	 */
	continueCurrentStage: function(location, fillingObject) {
		const shrinkSteps = {
			topStep: 0,
			bottomStep: 0,
			leftStep: 0,
			rightStep: 0
		};

		// Vertical

		this.shrinkVertically(location, fillingObject, shrinkSteps);

		// Horizontal

		this.shrinkHorizontally(location, fillingObject, shrinkSteps);

		// Update currentZoneShape

		this.calculateCurrentZoneShape(shrinkSteps);

		// Check if current zone reaches final zone

		this.checkIsFinalZoneReached();
	},

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @param {object} shrinkSteps Values of shrinks for each side
	 * @description Shrinks location vertically
	 */
	shrinkVertically: function (location, fillingObject, shrinkSteps) {
		const isTopSideReached = (this.currentZoneShape.y1 === this.finalZoneShape.y1);
		const isBottomSideReached = (this.currentZoneShape.y2 === this.finalZoneShape.y2);
		const isCommonStep = (this.verticalStepCount === this.verticalDistancesRatio);

		if (!isTopSideReached && !isBottomSideReached) {
			this.verticalStepCount++;

			if (this.topDistance > this.bottomDistance) {
				shrinkSteps.topStep++;

				for (let i = this.currentZoneShape.x1; i <= this.currentZoneShape.x2; i++) {
					location[i][this.currentZoneShape.y1] = fillingObject;

					if (isCommonStep) {
						location[i][this.currentZoneShape.y2] = fillingObject;
					}
				}

				if (isCommonStep) {
					shrinkSteps.bottomStep++;
					this.verticalStepCount = 0;
				}
			}
			else if (this.topDistance < this.bottomDistance) {
				shrinkSteps.bottomStep++;

				for (let i = this.currentZoneShape.x1; i <= this.currentZoneShape.x2; i++) {
					location[i][this.currentZoneShape.y2] = fillingObject;

					if (isCommonStep) {
						location[i][this.currentZoneShape.y1] = fillingObject;
					}
				}

				if (isCommonStep) {
					shrinkSteps.topStep++;
					this.verticalStepCount = 0;
				}
			}
			else {
				for (let i = this.currentZoneShape.x1; i <= this.currentZoneShape.x2; i++) {
					location[i][this.currentZoneShape.y1] = fillingObject;
					location[i][this.currentZoneShape.y2] = fillingObject;
				}

				shrinkSteps.topStep++;
				shrinkSteps.bottomStep++;
				this.verticalStepCount = 0;
			}
		}
		else if (isTopSideReached && !isBottomSideReached) {
			this.verticalStepCount++;

			for (let i = this.currentZoneShape.x1; i <= this.currentZoneShape.x2; i++) {
				location[i][this.currentZoneShape.y2] = fillingObject;
			}

			shrinkSteps.bottomStep++;
		}
		else if (!isTopSideReached && isBottomSideReached) {
			this.verticalStepCount++;

			for (let i = this.currentZoneShape.x1; i <= this.currentZoneShape.x2; i++) {
				location[i][this.currentZoneShape.y1] = fillingObject;
			}

			shrinkSteps.topStep++;
		}

		if (this.currentZoneShape.side === 1 && this.lastZoneSide < 1) {
			location[this.currentZoneShape.x1][this.currentZoneShape.y1] = fillingObject;
		}
	},

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @param {*} fillingObject Object to fill an area outside the zone
	 * @param {object} shrinkSteps Values of shrinks for each side
	 * @description Shrinks location horizontally
	 */
	shrinkHorizontally: function(location, fillingObject, shrinkSteps) {
		const isLeftSideReached = (this.currentZoneShape.x1 === this.finalZoneShape.x1);
		const isRightSideReached = (this.currentZoneShape.x2 === this.finalZoneShape.x2);
		const isCommonStep = (this.horizontalStepCount === this.horizontalDistancesRatio);

		if (!isLeftSideReached && !isRightSideReached) {
			this.horizontalStepCount++;

			if (this.leftDistance > this.rightDistance) {
				shrinkSteps.leftStep++;

				for (let i = this.currentZoneShape.y1; i <= this.currentZoneShape.y2; i++) {
					location[this.currentZoneShape.x1][i] = fillingObject;

					if (isCommonStep) {
						location[this.currentZoneShape.x2][i] = fillingObject;
					}
				}

				if (isCommonStep) {
					shrinkSteps.rightStep++;
					this.horizontalStepCount = 0;
				}
			}
			else if (this.leftDistance < this.rightDistance) {
				shrinkSteps.rightStep++;

				for (let i = this.currentZoneShape.y1; i <= this.currentZoneShape.y2; i++) {
					location[this.currentZoneShape.x2][i] = fillingObject;

					if (isCommonStep) {
						location[this.currentZoneShape.x1][i] = fillingObject;
					}
				}

				if (isCommonStep) {
					shrinkSteps.leftStep++;
					this.horizontalStepCount = 0;
				}
			}
			else {
				for (let i = this.currentZoneShape.y1; i <= this.currentZoneShape.y2; i++) {
					location[this.currentZoneShape.x1][i] = fillingObject;
					location[this.currentZoneShape.x2][i] = fillingObject;
				}

				shrinkSteps.leftStep++;
				shrinkSteps.rightStep++;
				this.horizontalStepCount = 0;
			}
		}
		else if (isLeftSideReached && !isRightSideReached) {
			this.horizontalStepCount++;

			for (let i = this.currentZoneShape.y1; i <= this.currentZoneShape.y2; i++) {
				location[this.currentZoneShape.x2][i] = fillingObject;
			}

			shrinkSteps.rightStep++;
		}
		else if (!isLeftSideReached && isRightSideReached) {
			this.horizontalStepCount++;

			for (let i = this.currentZoneShape.y1; i <= this.currentZoneShape.y2; i++) {
				location[this.currentZoneShape.x1][i] = fillingObject;
			}

			shrinkSteps.leftStep++;
		}
	},

	/**
	 * @function @static
	 * @param {object} shrinkSteps Values of shrinks for each side
	 * @description Calculate parameters of the current zone
	 */
	calculateCurrentZoneShape: function (shrinkSteps) {
		this.currentZoneShape.x1 += shrinkSteps.leftStep;
		this.currentZoneShape.y1 += shrinkSteps.topStep;
		this.currentZoneShape.x2 -= shrinkSteps.rightStep;
		this.currentZoneShape.y2 -= shrinkSteps.bottomStep;
		this.currentZoneShape.calculateSide();
	},

	/**
	 * @function @static
	 * @description Check if the current zone reaches the final zone
	 */
	checkIsFinalZoneReached: function() {
		if (
			this.currentZoneShape.x1 === this.finalZoneShape.x1
			&& this.currentZoneShape.y1 === this.finalZoneShape.y1
			&& this.currentZoneShape.side === this.finalZoneShape.side
		) {
			this.isNewStage = true;
		}
	},

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @description Fills border cells of the final zone with given object
	 */
	drawZoneBorderline : function(location, borderFillingObject) {
		for (let i = this.finalZoneShape.x1; i <= this.finalZoneShape.x2; i++) {
			location[i][this.finalZoneShape.y1] = borderFillingObject;
			location[i][this.finalZoneShape.y2] = borderFillingObject;
		}
		for (let i = this.finalZoneShape.y1; i <= this.finalZoneShape.y2; i++) {
			location[this.finalZoneShape.x1][i] = borderFillingObject;
			location[this.finalZoneShape.x2][i] = borderFillingObject;
		}
	},

	/**
	 * @function @static
	 * @param {array} location Game location for processing
	 * @description Removes the drawn border of the final zone
	 */
	clearBorder: function(location, cleanerObject) {
		for (let i = this.finalZoneShape.x1; i <= this.finalZoneShape.x2; i++) {
			location[i][this.finalZoneShape.y1] = cleanerObject;
			location[i][this.finalZoneShape.y2] = cleanerObject;
		}
		for (let i = this.finalZoneShape.y1; i <= this.finalZoneShape.y2; i++) {
			location[this.finalZoneShape.x1][i] = cleanerObject;
			location[this.finalZoneShape.x2][i] = cleanerObject;
		}
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