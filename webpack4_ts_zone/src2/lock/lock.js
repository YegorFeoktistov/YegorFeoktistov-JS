/**
 * @static @class
 * @description Represents coordinate point
 */
export class Lock {
	//#region Functions for making private fields

	/**
	 * @function @static
	 * @param {*} object Target object
	 * @description Sets "writable" and "enumerable" attributes to "false"
	 */
	static lockAllFields(object) {
		for (let property in object) {
			if (property[0] === "_") {
				Object.defineProperty(object, property, {
					enumerable: false,
					writable: false
				});
			}
		}
	}

	/**
	 * @function @static
	 * @param {*} object Target object
	 * @param {*} field Target field
	 * @description Sets "writable" attribute of field to "false"
	 */
	static lockObjectField(object, field) {
		Object.defineProperty(object, field, {
			writable: false
		});
	}

	/**
	 * @function @static
	 * @param {*} object Target object
	 * @param {*} field Target field
	 * @description Sets "writable" attribute of field to "true"
	 */
	static unlockObjectField(object, field) {
		Object.defineProperty(object, field, {
			writable: true
		});
	}

	//#endregion
}