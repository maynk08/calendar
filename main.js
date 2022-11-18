const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const createCalandarObject = function (totalDays, firstDay) {
  const defaultWeekDays = [false, false, false, false, false, false, false];
  const calandarObject = [[...defaultWeekDays]];
  let dayIndex = firstDay;
  let weekIndex = 0;
  for (let day = 0; day < totalDays; day += 1) {
    calandarObject[weekIndex][dayIndex] = day + 1;

    if (dayIndex === 6) {
      calandarObject.push([...defaultWeekDays]);
      weekIndex += 1;
      dayIndex = 0;
    } else {
      dayIndex += 1;
    }
  }
  return calandarObject;
};

// month - value starts from 1 ( january )
const getDaysInMonth = function (month, year) {
  //0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
};

// P.s. in JS Date Type, month starts from zero
const getFirstDayInMonth = function (month, year) {
  return new Date(year, month - 1, 1).getDay(); // 0 - 6
};

/** Constructing the html markup for the calander */
const constructCalanderUI = function (calandar) {
  const weekDaysMarkup = days.map(
    (day) => `<div class="day-cell"> ${day.slice(0, 3).toUpperCase()} </div> `
  );

  const weeksMarkup = calandar.map((week) => {
    const daysMarkup = week.map((day) => {
      return `<div id="day-${day ? day : ""}" class="day-cell"> ${
        day ? `<span> ${day}</span>` : ""
      } </div>`;
    });
    return `
                  <div class="week-row">
                      ${daysMarkup.join("")}
                  </div>
              `;
  });
  weeksMarkup.unshift(`<div class="week-row">${weekDaysMarkup.join("")}</div>`);
  let htmlMarkup = weeksMarkup.join("");
  document.getElementById("calander-root").innerHTML = htmlMarkup;
  console.log("htmlMarkup", htmlMarkup);
};

const toggleHighlightDate = (date) => {
  const dayCell = document.getElementById(`day-${date}`);
  if (dayCell) {
    if (dayCell.className.indexOf("active") > -1) {
      dayCell.className += "day-cell";
    } else dayCell.className += " active";
  }
};

/** Handle change of month and year and show updated calander */
const changeCalanderMonthYear = function (month, year) {
  const totalDaysInMonth = getDaysInMonth(month, year);
  const firstDayInMonth = getFirstDayInMonth(month, year);
  const calander = createCalandarObject(totalDaysInMonth, firstDayInMonth);
  console.log("calander", calander);
  constructCalanderUI(calander);
};

const initiateCalander = () => {
  const monthsOptionsMarkup = months
    .map((month, index) => `<option value="${index + 1}"> ${month} </option>`)
    .join("");

  let yearsOptions = "";
  for (year = 1900; year < 2050; year += 1) {
    yearsOptions += `<option value="${year}">${year}</option>`;
  }
  document.getElementById("year-select").innerHTML = yearsOptions;
  document.getElementById("month-select").innerHTML = monthsOptionsMarkup;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  document.getElementById("year-select").value = currentYear;
  document.getElementById("month-select").value = currentMonth;
  changeCalanderMonthYear(currentMonth, currentYear);
  toggleHighlightDate(currentDate);

  window.selectedMonth = currentMonth;
  window.selectedYear = currentYear;
};

initiateCalander();

document.getElementById("enter-date-btn").addEventListener("click", () => {
  const dateVal = document.getElementById("date-select").value;
  if (dateVal && !isNaN(dateVal)) {
    toggleHighlightDate(dateVal);
  }
});

document.getElementById("month-select").addEventListener("change", (event) => {
  window.selectedMonth = event.target.value;
  changeCalanderMonthYear(window.selectedMonth, window.selectedYear);
});

document.getElementById("year-select").addEventListener("change", (event) => {
  window.selectedYear = event.target.value;
  changeCalanderMonthYear(window.selectedMonth, window.selectedYear);
});
