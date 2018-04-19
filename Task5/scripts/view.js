const View = {
	daysOfWeek: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],

	months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

	renderDays: function() {
		this.daysContainerElement = document.createElement("div");
		this.daysContainerElement.className = "calendar__days-container";
	},

	renderDaysOfWeek: function() {
		this.daysOfWeekElement = document.createElement("div");
		this.daysOfWeekElement.className = "calendar__days-of-week";
		this.daysOfWeekElementsArray = [];

		for (let i = 0; i < this.daysOfWeek.length; i++) {
			const day = this.daysOfWeek[i];
			this.daysOfWeekElementsArray[i] = document.createElement("span");
			this.daysOfWeekElementsArray[i].className = "calendar__day-of-week";
			this.daysOfWeekElement.appendChild(this.daysOfWeekElementsArray[i]);
		}
	},

	renderMonthOfYear: function(navigationLinks) {
		this.monthsOfYearElement = document.createElement("div");
		this.monthsOfYearElement.className = "calendar__months";

		this.monthElement = document.createElement("span");
		this.monthElement.className = "calendar__month-name";

		this.yearElement = document.createElement("span");
		this.yearElement.className = "calendar__year-number";

		this.monthsOfYearContainerElement = document.createElement("div");
		this.monthsOfYearContainerElement.className = "calendar__month-of-year-container";

		this.leftArrow = document.createElement("span");
		this.leftArrow.className = "calendar__left-arrow";
		this.leftArrow.addEventListener("click", navigationLinks.previousMonth);
		this.rightArrow = document.createElement("span");
		this.rightArrow.className = "calendar__right-arrow";
		this.rightArrow.addEventListener("click", navigationLinks.nextMonth);

		this.monthsOfYearElement.appendChild(this.leftArrow);
		this.monthsOfYearContainerElement.appendChild(this.monthElement);
		this.monthsOfYearContainerElement.appendChild(this.yearElement);
		this.monthsOfYearElement.appendChild(this.monthsOfYearContainerElement);
		this.monthsOfYearElement.appendChild(this.rightArrow);
	},

	render: function(navigationLinks) {
		this.wrapper = document.createElement("div");
		this.wrapper.className = "calendar-wrapper";

		this.calendar = document.createElement("div");
		this.calendar.className = "calendar";
		this.calendar.classList.add("calendar_border-style");

		this.calendarContent = document.createElement("div");
		this.calendarContent.className = "calendar__content";

		this.renderMonthOfYear(navigationLinks);
		this.renderDaysOfWeek();
		this.renderDays();

		this.calendarContent.appendChild(this.monthsOfYearElement);
		this.calendarContent.appendChild(this.daysOfWeekElement);
		this.calendarContent.appendChild(this.daysContainerElement);

		this.calendar.appendChild(this.calendarContent);

		this.wrapper.appendChild(this.calendar);

		document.body.appendChild(this.wrapper);
	},

	fillData: function(customDate) {
		for (let i = 0; i < this.daysOfWeekElementsArray.length; i++) {
			this.daysOfWeekElementsArray[i].textContent = this.daysOfWeek[i];
		}

		this.monthElement.textContent = this.months[customDate.month];
		this.yearElement.textContent = customDate.year;

		this.daysContainerElement.innerHTML = "";
		const firstDayIndex = customDate.firstDayOfWeek === 0 ? 6 : customDate.firstDayOfWeek - 1;

		for (let i = 0; i < customDate.totalDays + firstDayIndex; i++) {
			if (i < firstDayIndex) {
				const dayElement = document.createElement("span");
				dayElement.className = "calendar__day calendar__day_hidden";
				dayElement.textContent = 0;
				this.daysContainerElement.appendChild(dayElement);
			}
			else {
				const dayElement = document.createElement("span");
				dayElement.className = "calendar__day";
				if (customDate.currentDate - 1 === i) {
					dayElement.classList.add("calendar__day_current");
				}
				dayElement.textContent = i - firstDayIndex + 1;
				this.daysContainerElement.appendChild(dayElement);
			}
		}
	}
};