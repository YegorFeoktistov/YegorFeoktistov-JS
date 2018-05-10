function View(datePickerContainer, localization) {
	this.datePickerContainer = datePickerContainer;
	this.localization = localization;
}

View.prototype = {
	constructor: View,

	renderDays: function() {
		this.daysContainerElement = document.createElement("div");
		this.daysContainerElement.className = "date-picker__days-container";
	},

	renderDaysOfWeek: function() {
		this.daysOfWeekElement = document.createElement("div");
		this.daysOfWeekElement.className = "date-picker__days-of-week";
		this.daysOfWeekElementsArray = [];

		for (let i = 0; i < this.localization.DAYS_OF_WEEK.length; i++) {
			const day = this.localization.DAYS_OF_WEEK[i];
			this.daysOfWeekElementsArray[i] = document.createElement("span");
			this.daysOfWeekElementsArray[i].className = "date-picker__day-of-week";
			this.daysOfWeekElement.appendChild(this.daysOfWeekElementsArray[i]);
		}
	},

	renderMonthOfYear: function(navigationLinks) {
		this.monthsOfYearElement = document.createElement("div");
		this.monthsOfYearElement.className = "date-picker__months";

		this.monthElement = document.createElement("span");
		this.monthElement.className = "date-picker__month-name";

		this.yearElement = document.createElement("span");
		this.yearElement.className = "date-picker__year-number";

		this.monthsOfYearContainerElement = document.createElement("div");
		this.monthsOfYearContainerElement.className = "date-picker__month-of-year-container";

		this.leftArrow = document.createElement("span");
		this.leftArrow.className = "date-picker__left-arrow";
		this.leftArrow.addEventListener("click", navigationLinks.previousMonth);
		this.rightArrow = document.createElement("span");
		this.rightArrow.className = "date-picker__right-arrow";
		this.rightArrow.addEventListener("click", navigationLinks.nextMonth);

		this.monthsOfYearElement.appendChild(this.leftArrow);
		this.monthsOfYearContainerElement.appendChild(this.monthElement);
		this.monthsOfYearContainerElement.appendChild(this.yearElement);
		this.monthsOfYearElement.appendChild(this.monthsOfYearContainerElement);
		this.monthsOfYearElement.appendChild(this.rightArrow);
	},

	render: function(navigationLinks) {
		this.container = document.querySelector(this.datePickerContainer);

		this.datePickerInput = document.createElement("input");
		this.datePickerInput.setAttribute("type", "text");
		this.datePickerInput.className = "date-picker-input";


		this.datePickerWrapper = document.createElement("div");
		this.datePickerWrapper.className = "date-picker-wrapper";

		this.datePicker = document.createElement("div");
		this.datePicker.className = "date-picker";
		this.datePicker.classList.add("date-picker_border-style");

		this.datePickerContent = document.createElement("div");
		this.datePickerContent.className = "date-picker__content";

		this.renderMonthOfYear(navigationLinks);
		this.renderDaysOfWeek();
		this.renderDays();

		this.datePickerContent.appendChild(this.monthsOfYearElement);
		this.datePickerContent.appendChild(this.daysOfWeekElement);
		this.datePickerContent.appendChild(this.daysContainerElement);

		this.datePicker.appendChild(this.datePickerContent);
		this.datePickerWrapper.appendChild(this.datePicker);
		this.container.appendChild(this.datePickerInput);
		this.container.appendChild(this.datePickerWrapper);

		this.datePickerInput.addEventListener("click", (e) => {
			if (this.datePicker.classList.contains("date-picker_visible")) {
				this.hideDatePicker();
			}
			else {
				this.showDatePicker();
			}
		})
	},

	fillData: function(customDate) {
		for (let i = 0; i < this.daysOfWeekElementsArray.length; i++) {
			this.daysOfWeekElementsArray[i].textContent = this.localization.DAYS_OF_WEEK[i];
		}

		this.monthElement.textContent = this.localization.MONTHS[customDate.month];
		this.yearElement.textContent = customDate.year;

		this.daysContainerElement.innerHTML = "";
		const firstDayIndex = customDate.firstDayOfWeek === 0 ? 6 : customDate.firstDayOfWeek - 1;
		for (let i = 0; i < customDate.totalDays + firstDayIndex; i++) {
			const dayElement = document.createElement("span");
			dayElement.className = "date-picker__day";

			if (i < firstDayIndex) {
				dayElement.classList.add("date-picker__day_hidden");
				dayElement.textContent = 0;
			}
			else {
				if (customDate.currentDate - 1 === i - firstDayIndex) {
					dayElement.classList.add("date-picker__day_current");
					currentDateInfo = {
						day: i - firstDayIndex + 1,
						month: customDate.month,
						year: customDate.year
					};
				}
				dayElement.textContent = i - firstDayIndex + 1;
				dayElement.addEventListener("click", (e) => {
					const selectedDate = new Date(customDate.year, customDate.month, dayElement.textContent);
					this.datePickerInput.value = selectedDate.toLocaleDateString();
					this.hideDatePicker();
				});
			}

			this.daysContainerElement.appendChild(dayElement);
		}
	},

	showDatePicker: function() {
		this.datePicker.classList.add("date-picker_visible");
	},

	hideDatePicker: function() {
		this.datePicker.classList.remove("date-picker_visible");
	}
};