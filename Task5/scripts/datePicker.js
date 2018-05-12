function DatePicker() {
}

DatePicker.prototype = {
	constructor: DatePicker,

	getPreviousMonth: function() {
		this.modelComponent.monthShift -= 1;
		this.updateView();
	},

	getNextMonth: function() {
		this.modelComponent.monthShift += 1;
		this.updateView();
	},

	render: function(datePickerContainer, currentDate, localization = ENGLISH) {
    this.viewComponent = new View(datePickerContainer, localization);
    this.modelComponent = new Model(currentDate);

		this.viewComponent.render({
			previousMonth: this.getPreviousMonth.bind(this),
			nextMonth: this.getNextMonth.bind(this)
		});

		this.updateView();
	},

	updateView: function() {
		const year = this.modelComponent.getShiftedYear();
		const month = this.modelComponent.getShiftedMonth();

		this.viewComponent.fillData({
			year: year,
			month: month,
			firstDayOfWeek: this.modelComponent.getFirstDayOfWeek(),
			currentDate: this.modelComponent.getCurrentDate(),
			totalDays: new Date(year, month + 1, 0).getDate()
		});
	}
};