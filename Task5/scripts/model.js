const Model = {
	monthShift: 0,

	currentDate: new Date(),

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

	getDate: function() {
		return new Date(this.getCurrentYear(), this.getCurrentMonth() + this.monthShift);
	},

	getMonth: function() {
		return this.getDate().getMonth();
	},

	getYear: function() {
		return this.getDate().getFullYear();
	},

	getFirstDayOfWeek: function() {
		return this.getDate().getDay();
	}
};