const formActionTextInput = document.getElementById("form-action-text-input");
const choiceTypeSelectInput = document.getElementById("choice-type-select-input");
const radiobuttons = document.getElementsByName("choices");
const radiobuttonsContainer = document.querySelector(".subscribe-form__radiobutton-container");
const paragraphCheckboxInput = document.getElementById("paragraph-checkbox-input");
const formActionData = document.querySelector(".subscribe-form__form-action-data");

const clearRadiobutton = (function(){
	const radiobuttonClearElements = document.querySelectorAll(".subscribe-form__radiobutton-clear");

	for (let i = 0; i < radiobuttonClearElements.length; i++){
		radiobuttonClearElements[i].addEventListener("click", clear);
	}

	function clear(){
		const input = document.getElementById(this.getAttribute("for"));
		input.checked = false;
	}
}());

const submitBehavior = (function() {
	const form = document.getElementById("visitor-subscribe-form");

	form.addEventListener("submit", function(e){
		e.preventDefault();

		clearState();
		alert("Data has been sent!");
	});
}());

formActionTextInput.addEventListener("change", function(e) {
	localStorage.setItem("formActionTextInputValue", formActionTextInput.value);
	formActionData.innerHTML = formActionTextInput.value;
});

choiceTypeSelectInput.addEventListener("change", function(e) {
	localStorage.setItem("choiceTypeSelectInputValue", choiceTypeSelectInput.value);
});

radiobuttonsContainer.addEventListener("click", function(e) {
	for (let i = 0; i < radiobuttons.length; i++) {
		if (radiobuttons[i].checked) {
			localStorage.setItem("radiobuttonValue", radiobuttons[i].value);
		}
	}
});

paragraphCheckboxInput.addEventListener("change", function(e) {
	localStorage.setItem("paragraphCheckboxInputIsChecked", paragraphCheckboxInput.checked);
});

const clearState = function() {
	localStorage.removeItem("formActionTextInputValue");
	localStorage.removeItem("choiceTypeSelectInputValue");
	localStorage.removeItem("radiobuttonValue");
	localStorage.removeItem("paragraphCheckboxInputIsChecked");
};

const updateState = function() {
	if (performance.navigation.type === 1) {
		clearState();
	}
	formActionTextInput.value = localStorage.getItem("formActionTextInputValue") || "";
	formActionData.innerHTML = localStorage.getItem("formActionTextInputValue") || "";
	choiceTypeSelectInput.value = localStorage.getItem("choiceTypeSelectInputValue");
	document.querySelector("input[value=" + localStorage.getItem("radiobuttonValue") + "]").checked = true;
	paragraphCheckboxInput.checked = localStorage.getItem("paragraphCheckboxInputIsChecked") === "true" ? true : false;
};

window.addEventListener("load", updateState());