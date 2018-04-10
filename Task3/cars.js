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

/*
	Classes declaration
*/

let Car = {
	constructor: function(model, number, owner, weight, maxSpeed, mileage, wheelsAmount, yearOfAssembly) {
		this._model = model || "unknown model";
		this._number = number || "unknown number";
		this._owner = owner || "unknown owner";
		this._weight = weight || 0;
		this._maxSpeed = maxSpeed || 0;
		this._mileage = mileage || 0;
		this._wheelsAmount =  wheelsAmount || 0;
		this._yearOfAssembly = yearOfAssembly || "unknown year";
		return this;
	},

	get model() {
		return this._model;
	},
	set model(value) {
		unlockObjectField(this, "_model");
		this._model = !value ? this._model : /\W/.test(value) ? this._model : /\d/.test(value) ? this._model : value;
		lockObjectField(this, "_model");
	},

	get number() {
		return this._number;
	},
	set number(value) {
		unlockObjectField(this, "_number");
		this._number = !value ? this._number : /\W/.test(value) ? this._number : value.toString();
		lockObjectField(this, "_number");
	},

	get owner() {
		return this._owner;
	},
	set owner(value) {
		unlockObjectField(this, "_owner");
		this._owner = !value ? this._owner : /\d/.test(value) ? this._owner : value;
		lockObjectField(this, "_owner");
	},

	get weight() {
		return this._weight;
	},
	set weight(value) {
		unlockObjectField(this, "_weight");
		this._weight = !value ? this._weight : isNaN(+value) ? this._weight : +value;
		lockObjectField(this, "_weight");
	},

	get maxSpeed() {
		return this._maxSpeed;
	},
	set maxSpeed(value) {
		unlockObjectField(this, "_maxSpeed");
		this._maxSpeed = !value ? this._maxSpeed : isNaN(+value) ? this._maxSpeed : +value;
		lockObjectField(this, "_maxSpeed");
	},

	get mileage() {
		return this._mileage;
	},
	set mileage(value) {
		unlockObjectField(this, "_mileage");
		this._mileage = !value ? this._mileage : isNaN(+value) ? this._mileage : +value;
		lockObjectField(this, "_mileage");
	},

	get wheelsAmount() {
		return this._wheelsAmount;
	},
	set wheelsAmount(value) {
		unlockObjectField(this, "_wheelsAmount");
		this._wheelsAmount = !value ? this._wheelsAmount : isNaN(+value) ? this._wheelsAmount : /\d{3,}/.test(value) ? this._wheelsAmount : +value;
		lockObjectField(this, "_wheelsAmount");
	},

	get yearOfAssembly() {
		return this._yearOfAssembly;
	},
	set yearOfAssembly(value) {
		unlockObjectField(this, "_yearOfAssembly");
		this._yearOfAssembly = !value ? this._yearOfAssembly :
		/\D/.test(value) ? this._yearOfAssembly :
		/\d{5,}/.test(value) ? this._yearOfAssembly :
		/\d{4}/.test(value) ? value.toString() : this._yearOfAssembly;
		lockObjectField(this, "_yearOfAssembly");
	},

	beep: function() { console.log(this._model + " BEEP!"); },

	about: function() {
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

let PassengersCar = Object.create(Car);
PassengersCar.constructor = function(model, number, owner, weight, maxSpeed, mileage, wheelsAmount, yearOfAssembly, passengersSeatsAmount) {
	Car.constructor.apply(this, arguments);
	this._passengersSeatsAmount = passengersSeatsAmount || 0;
	lockAllFields(this);
	Object.seal(this);
	return this;
};

Object.defineProperty(PassengersCar, "passengersSeatsAmount", {
	get: function () {
		return this._passengersSeatsAmount;
	},
	set: function (value) {
		unlockObjectField(this, "_passengersSeatsAmount");
		this._passengersSeatsAmount = !value ? this._passengersSeatsAmount : isNaN(+value) ? this._passengersSeatsAmount : value;
		lockObjectField(this, "_passengersSeatsAmount");
	}
});

PassengersCar.about = function() {
	return Car.about.call(this) + "\tAmount of passengers seats - " + this._passengersSeatsAmount + "\n";
};

/* Autotruck */

let Autotruck = Object.create(Car);
Autotruck.constructor = function(model, number, owner, weight, maxSpeed, mileage, wheelsAmount, yearOfAssembly, maxCargoWeight) {
	Car.constructor.apply(this, arguments);
	this._maxCargoWeight = maxCargoWeight || 0;
	lockAllFields(this);
	Object.seal(this);
	return this;
};

Object.defineProperty(Autotruck, "maxCargoWeight", {
	get: function () {
		return this._maxCargoWeight;
	},
	set: function (value) {
		unlockObjectField(this, "_maxCargoWeight");
		this._maxCargoWeight = !value ? this._maxCargoWeight : isNaN(+value) ? this._maxCargoWeight : +value;
		lockObjectField(this, "_maxCargoWeight");
	}
});

Autotruck.about = function() {
	return Car.about.call(this) + "\tMaximum cargo weight - " + this._maxCargoWeight + "\n";
};

/* SportCar */

let SportCar = Object.create(Car);
SportCar.constructor = function(model, number, owner, weight, maxSpeed, mileage, wheelsAmount, yearOfAssembly, racingType) {
	Car.constructor.apply(this, arguments);
	this._racingType = racingType || "unknown racing type";
	lockAllFields(this);
	Object.seal(this);
	return this;
};

Object.defineProperty(SportCar, "racingType", {
	get: function () {
		return this._racingType;
	},
	set: function (value) {
		unlockObjectField(this, "_racingType");
		this._racingType = !value ? this._racingType : /\W/.test(value) ? this._racingType : value;
		lockObjectField(this, "_racingType");
	}
});

SportCar.about = function() {
	return Car.about.call(this) + "\tRacing type - " + this._racingType + "\n";
};

/*
	Objects declaration
*/

let uazik = Object.create(PassengersCar).constructor("UAZ", "0000PB5", "Old Bobby", 3500, 160, 15000, 4, 1970, 5);
uazik.beep();
console.log(uazik.about());

let truck = Object.create(Autotruck).constructor("Mersedes", "0550PB4", "Bobby Singer", 10000, 130, 75000, 10, 2012, 10000);
truck.beep();
console.log(truck.about());

let paganiZondaF = Object.create(SportCar).constructor("Pagani", "6666PB6", "Gachimuchi", 2000, 400, 3000, 4, 2015, "LeMan");
paganiZondaF.beep();
console.log(paganiZondaF.about());

//----------TESTING-----------
// uazik.model = "wfwe wefwef";
// console.log(uazik.model);
// uazik.number = "0000PB5";
// console.log(uazik.number);
// uazik.owner = "Old Bobby";
// console.log(uazik.owner);
// uazik.weight = 3500;
// console.log(uazik.weight);
// uazik.maxSpeed = 160;
// console.log(uazik.maxSpeed);
// uazik.mileage = 15000;
// console.log(uazik.mileage);
// uazik.wheelsAmount = 4;
// console.log(uazik.wheelsAmount);
// uazik.yearOfAssembly = "1980";
// console.log(uazik.yearOfAssembly);
// uazik.passengersSeatsAmount = 5;
// console.log(uazik.passengersSeatsAmount);

/* НЕПОНЯТНАЯ (уже более или менее понятная) ХРЕНЬ!!! В одном месте beep не считается функцией, в другом считается */

/* let Car = {
	constructor: (model, owner) => {
		this.model = model;
		this.owner = owner;
		return this;
	},
	beep: () => { return this.model + " BEEP!"; }
};

let ef = Object.create(Car).constructor();
// console.log(ef.beep());

let LightCar = Object.create(Car);
LightCar.constructor = function(model, owner) {
	Car.constructor.apply(this, arguments);
	return this;
};

let carObject = Object.create(LightCar).constructor("Mers", "John");
console.log(carObject.beep()); */