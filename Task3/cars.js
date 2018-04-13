//#region
/*
	Functions for making private fields
*/

/**
 *
 * sets "writable" and "enumerable" attributes to "false"
 * @param {*} object
 * target object
 */
function lockAllFields(object) {
	for (property in object) {
		if (property[0] === "_") {
			Object.defineProperty(object, property, {
				enumerable: false,
				writable: false
			});
		}
	}
}
/**
 *
 * sets "writable" attribute of field to "false"
 * @param {*} object
 * target object
 * @param {*} field
 * target field
 */
function lockObjectField(object, field) {
	Object.defineProperty(object, field, {
		writable: false
	});
}
/**
 *
 * sets "writable" attribute of field to "true"
 * @param {*} object
 * target object
 * @param {*} field
 * target field
 */
function unlockObjectField(object, field) {
	Object.defineProperty(object, field, {
		writable: true
	});
}

//#endregion

/*
	Validation function
*/

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

/*
	Exceptions declaration
*/

const InvalidNumberError = new Error("Numeric value is expected. Number must be greater than 0.");
const InvalidStringError = new Error("String value is expected. Value must not be empty.");

//#region
/*
	Classes declaration
*/

const Car = {
	constructor: function(
		model,
		number,
		owner,
		weight,
		maxSpeed,
		mileage,
		wheelsAmount,
		yearOfAssembly
	) {
		this._model = model;
		this._number = number;
		this._owner = owner;
		this._weight = weight;
		this._maxSpeed = maxSpeed;
		this._mileage = mileage;
		this._wheelsAmount =  wheelsAmount;
		this._yearOfAssembly = yearOfAssembly;
		return this;
	},

	get model() {
		return this._model;
	},
	set model(value) {
		unlockObjectField(this, "_model");
		if (!value) {
			throw InvalidStringError;
		}
		else {
			this._model = value + "";
		}
		lockObjectField(this, "_model");
	},

	get number() {
		return this._number;
	},
	set number(value) {
		unlockObjectField(this, "_number");
		if (!value) {
			throw InvalidStringError;
		}
		else {
			this._number = value + "";
		}
		lockObjectField(this, "_number");
	},

	get owner() {
		return this._owner;
	},
	set owner(value) {
		unlockObjectField(this, "_owner");
		if (!value) {
			throw InvalidStringError;
		}
		else {
			this._owner = value + "";
		}
		lockObjectField(this, "_owner");
	},

	get weight() {
		return this._weight;
	},
	set weight(value) {
		unlockObjectField(this, "_weight");
		if (isNumeric(value) && value > 0) {
			this._weight = +value;
		}
		else {
			throw InvalidNumberError;
		}
		lockObjectField(this, "_weight");
	},

	get maxSpeed() {
		return this._maxSpeed;
	},
	set maxSpeed(value) {
		unlockObjectField(this, "_maxSpeed");
		if (isNumeric(value) && value > 0) {
			this._maxSpeed = +value;
		}
		else {
			throw InvalidNumberError;
		}
		lockObjectField(this, "_maxSpeed");
	},

	get mileage() {
		return this._mileage;
	},
	set mileage(value) {
		unlockObjectField(this, "_mileage");
		if (isNumeric(value) && value > 0) {
			this._mileage = +value;
		}
		else {
			throw InvalidNumberError;
		}
		lockObjectField(this, "_mileage");
	},

	get wheelsAmount() {
		return this._wheelsAmount;
	},
	set wheelsAmount(value) {
		unlockObjectField(this, "_wheelsAmount");
		if (isNumeric(value) && value > 0) {
			this._wheelsAmount = +value > 99 ? 99 : +value;
		}
		else {
			throw InvalidNumberError;
		}
		lockObjectField(this, "_wheelsAmount");
	},

	get yearOfAssembly() {
		return this._yearOfAssembly;
	},
	set yearOfAssembly(value) {
		unlockObjectField(this, "_yearOfAssembly");
		if (isNumeric(value) && value > 1000 && value <= 9999) {
			this._yearOfAssembly = +value;
		}
		else {
			throw InvalidNumberError + " The valid value of the year is from 1000 to 9999";
		}
		lockObjectField(this, "_yearOfAssembly");
	},

	getSignal: function() { return this._model + " BEEP!"; },

	getAbout: function() {
		return "Car info:\n"
			+ "\tNumber - " + this._number + "\n"
			+ "\tModel - " + this._model + "\n"
			+ "\tOwner - " + this._owner + "\n"
			+ "\tYear of assembly - " + this._yearOfAssembly + "\n"
			+ "\tMileage - " + this._mileage + "\n"
			+ "\tWeight - " + this._weight + "\n"
			+ "\tMaximum speed - " + this._maxSpeed + "\n"
			+ "\tAmount of wheels - " + this._wheelsAmount + "\n";
	}
};

/* Passengers Car */

const PassengersCar = Object.create(Car);
PassengersCar.constructor = function(
	model,
	number,
	owner,
	weight,
	maxSpeed,
	mileage,
	wheelsAmount,
	yearOfAssembly,
	passengersSeatsAmount
) {
	Car.constructor.apply(this, arguments);
	this._passengersSeatsAmount = passengersSeatsAmount;
	lockAllFields(this);
	return this;
};

Object.defineProperty(PassengersCar, "passengersSeatsAmount", {
	get: function () {
		return this._passengersSeatsAmount;
	},
	set: function (value) {
		unlockObjectField(this, "_passengersSeatsAmount");
		if (isNumeric(value) && value > 0) {
			this._passengersSeatsAmount = +value;
		}
		else {
			throw InvalidNumberError;
		}
		lockObjectField(this, "_passengersSeatsAmount");
	}
});

PassengersCar.getAbout = function() {
	return Car.getAbout.call(this) + "\tAmount of passengers seats - " + this._passengersSeatsAmount + "\n";
};

/* Autotruck */

const Autotruck = Object.create(Car);
Autotruck.constructor = function(
	model,
	number,
	owner,
	weight,
	maxSpeed,
	mileage,
	wheelsAmount,
	yearOfAssembly,
	maxCargoWeight
) {
	Car.constructor.apply(this, arguments);
	this._maxCargoWeight = maxCargoWeight;
	lockAllFields(this);
	return this;
};

Object.defineProperty(Autotruck, "maxCargoWeight", {
	get: function () {
		return this._maxCargoWeight;
	},
	set: function (value) {
		unlockObjectField(this, "_maxCargoWeight");
		if (isNumeric(value) && value > 0) {
			this._maxCargoWeight = +value;
		}
		else {
			throw InvalidNumberError;
		}
		lockObjectField(this, "_maxCargoWeight");
	}
});

Autotruck.getAbout = function() {
	return Car.getAbout.call(this) + "\tMaximum cargo weight - " + this._maxCargoWeight + "\n";
};

/* SportCar */

const SportCar = Object.create(Car);
SportCar.constructor = function(
	model,
	number,
	owner,
	weight,
	maxSpeed,
	mileage,
	wheelsAmount,
	yearOfAssembly,
	racingType
) {
	Car.constructor.apply(this, arguments);
	this._racingType = racingType;
	lockAllFields(this);
	return this;
};

Object.defineProperty(SportCar, "racingType", {
	get: function () {
		return this._racingType;
	},
	set: function (value) {
		unlockObjectField(this, "_racingType");
		if (!value) {
			throw InvalidStringError;
		}
		else {
			this._racingType = value + "";
		}
		lockObjectField(this, "_racingType");
	}
});

SportCar.getAbout = function() {
	return Car.getAbout.call(this) + "\tRacing type - " + this._racingType + "\n";
};

/**
 * Factory method for creating Car objects
 * @param {*} car
 * car type
 * @param {*} model
 * car model
 * @param {*} number
 * car number
 * @param {*} owner
 * car owner
 * @param {*} weight
 * car weight
 * @param {*} maxSpeed
 * car maximum speed
 * @param {*} mileage
 * car total mileage
 * @param {*} wheelsAmount
 * amount of wheels
 * @param {*} yearOfAssembly
 * year of car assembly
 * @param {*} other
 * specific parameters of needed type of car
 *{
 *
 * 	PassengersCar : passengers seats amount
 *
 * 	Autotruck : maximum cargo weight
 *
 * 	PassengersCar : racing type
 *
 * }
 */
const CarFactory = function(car) {
	switch (car) {
		case "Passengers car": {
			return Object.create(PassengersCar).constructor(
				arguments[1],
				arguments[2],
				arguments[3],
				arguments[4],
				arguments[5],
				arguments[6],
				arguments[7],
				arguments[8],
				arguments[9]
			);
			break;
		}
		case "Autotruck": {
			return Object.create(Autotruck).constructor(
				arguments[1],
				arguments[2],
				arguments[3],
				arguments[4],
				arguments[5],
				arguments[6],
				arguments[7],
				arguments[8],
				arguments[9]
			);
			break;
		}
		case "Sport car": {
			return Object.create(SportCar).constructor(
				arguments[1],
				arguments[2],
				arguments[3],
				arguments[4],
				arguments[5],
				arguments[6],
				arguments[7],
				arguments[8],
				arguments[9]
			);
			break;
		}
		default: {
			return Object.create(Car).constructor(
				"unknown model",
				"unknown number",
				"unknown owner",
				0,
				0,
				0,
				0,
				"unknown year"
			);
			break;
		}
	}
};
//#endregion

/*
	Objects declaration
*/

let uazik = CarFactory("Passengers car", "UAZ", "0000PB5", "Old Bobby", 3500, 160, 15000, 4, 1970, 5);
console.log(uazik.getSignal());
console.log(uazik.getAbout());

let truck = CarFactory("Autotruck", "Mersedes", "0550PB4", "Bobby Singer", 10000, 130, 75000, 10, 2012, 10000);
console.log(truck.getSignal());
console.log(truck.getAbout());

let pagani = CarFactory("Sport car", "Pagani", "6666PB6", "Gachimuchi", 2000, 400, 3000, 4, 2015, "Le Man");
console.log(pagani.getSignal());
console.log(pagani.getAbout());

let unknownCar = CarFactory();
console.log(unknownCar.getSignal());
console.log(unknownCar.getAbout());

//----------TESTING-----------
// uazik.model = "awd";
// console.log(uazik.model);
// uazik.number = "0000PB5";
// console.log(uazik.number);
// uazik.owner = "Old Bobby";
// console.log(uazik.owner);
// uazik.weight = 500;
// console.log(uazik.weight);
// uazik.maxSpeed = 160;
// console.log(uazik.maxSpeed);
// uazik.mileage = 15000;
// console.log(uazik.mileage);
// uazik.wheelsAmount = "120";
// console.log(uazik.wheelsAmount);
// uazik.yearOfAssembly = "20d00";
// console.log(uazik.yearOfAssembly);
// uazik.passengersSeatsAmount = 5;
// console.log(uazik.passengersSeatsAmount);