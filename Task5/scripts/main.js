document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector(".date-picker-container");

  const datePicker = new DatePicker();
  datePicker.render(container, new Date(), ENGLISH);
});