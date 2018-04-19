const Controller = {
	getPreviousMonth: function() {
		Model.monthShift -= 1;
		this.updateView();
	},

	getNextMonth: function() {
		Model.monthShift += 1;
		this.updateView();
	},

	initialize: function() {
		View.render({
			previousMonth: this.getPreviousMonth.bind(this),
			nextMonth: this.getNextMonth.bind(this)
		});

		this.updateView();
	},

	updateView: function() {
		const year = Model.getShiftedYear();
		const month = Model.getShiftedMonth();

		View.fillData({
			year: year,
			month: month,
			firstDayOfWeek: Model.getFirstDayOfWeek(),
			currentDate: Model.getCurrentDate(),
			totalDays: new Date(year, month + 1, 0).getDate()
		});
	}
};