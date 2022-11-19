const months = [
    "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
]

const days = [
   "SUN","MON","TUE","WED","THU","FRI","SAT"
];



////////////////////////////////////////////////////////////////////////// Creating Calendar ///////////////////////////////////////////////////////////////////////////

const createCalendar = (totalDaysInMonth, firstDayOfMonth) => {
  const weekArr = [false,false,false,false,false,false,false]

  const calendar = [[...weekArr]];

  let dayNo = firstDayOfMonth

  let weekNo = 0

  for(let day = 0;day<totalDaysInMonth;day+=1){
    calendar[weekNo][dayNo] = day+1


    if(dayNo === 6){
        calendar.push([...weekArr])
        weekNo += 1
        dayNo = 0
    }
    else{
        dayNo += 1
    }
  }

  return calendar
} 

const noOfDayInMonth = (month,year) => new Date(year,month,0).getDate();

const firstDayOfMonth = (month,year) => new Date(year,month-1,1).getDay();



///////////////////////////////////////////////////////////////////////////// Creating Calendar InterFace /////////////////////////////////////////////////////////////////////////

const calendarFrontEnd = function (calendar) {
  const weekDaysMarkup = days.map(
    (day) => `<div class="day-cell"> ${day} </div> `
  );

  const weeksMarkup = calendar.map((week) => {

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
  document.getElementById("our-calendar").innerHTML = htmlMarkup;
  console.log("htmlMarkup", htmlMarkup);
};

///////////////////////////////////////////////////////////////////////// Logic for highlighting date ///////////////////////////////////////////////////////////////////////


const hightlighterFunction = (date) => {
  const dayCell = document.getElementById(`day-${date}`);
  if (dayCell) {
    if (dayCell.className.indexOf("active") > -1) {
      dayCell.className += "day-cell";
    } else dayCell.className += " active";
  }
};

/////////////////////////////////////////////////////////////////////////// Handling change ///////////////////////////////////////////////////////////////////////////////////

const handleChange =(month,year) => {

    const daysInMonth =noOfDayInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    const calendar = createCalendar(daysInMonth, firstDay);
  
    calendarFrontEnd(calendar);
  };

  ///////////////////////////////////////////////////////////////////// Creating default Calendar  ////////////////////////////////////////////////////////////////////////
  
  
  const defaultCalendar = () => {
    const monthsOptionsMarkup = months
      .map((month, index) => `<option value="${index + 1}"> ${month} </option>`)
      .join("");
  
    let yearsOptions = "";
    for (year = 1900; year < 3000; year += 1) {
      yearsOptions += `<option value="${year}">${year}</option>`;
    }
    document.getElementById("select-year").innerHTML = yearsOptions;
    document.getElementById("select-months").innerHTML = monthsOptionsMarkup;
  
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
  
    document.getElementById("select-year").value = currentYear;
    document.getElementById("select-months").value = currentMonth;
    handleChange(currentMonth, currentYear);
    hightlighterFunction(currentDate);
  
    window.selectedMonth = currentMonth;
    window.selectedYear = currentYear;
  };

  defaultCalendar();            


  //////////////////////////////////////////////////////////////////////////// Handling different Events //////////////////////////////////////////////////////////////////////////

  document.getElementById("enter-btn").addEventListener("click",()=>{
    const val = document.getElementById("select-date").value;
    if(val) hightlighterFunction(val)
    
  })


  document.getElementById("select-months").addEventListener("change",(event)=>{
    window.selectedMonth = event.target.value;
    handleChange(window.selectedMonth,window.selectedYear)
  })

  document.getElementById("select-year").addEventListener("change",(event)=>{
    window.selectedYear = event.target.value;
    handleChange(window.selectedMonth,window.selectedYear)
  })