function Model(currentDate) {
	this.currentDate = currentDate;
}

Model.prototype = {
	constructor: Model,

	monthShift: 0,

	getCurrentDate: function() {
		if (this.monthShift !== 0)
			return null;
		return this.currentDate.getDate();
	},

	getCurrentMonth: function() {
		return this.currentDate.getMonth();
	},

	getCurrentYear: function() {
		return this.currentDate.getFullYear();
	},

	getShiftedDate: function() {
		return new Date(this.getCurrentYear(), this.getCurrentMonth() + this.monthShift);
	},

	getShiftedMonth: function() {
		return this.getShiftedDate().getMonth();
	},

	getShiftedYear: function() {
		return this.getShiftedDate().getFullYear();
	},

	getFirstDayOfWeek: function() {
		return this.getShiftedDate().getDay();
	}
};