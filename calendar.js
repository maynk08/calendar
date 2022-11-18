const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
]

const days = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
];



/////////////////////////////////////////////////////////////

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



const calendarFrontEnd = (calendar) =>{

    const weekDaysMarkUp = days.map(
        (day) => `<div class="day-cell">${day} </div> `
    );

 //console.log(weekDaysMarkUp)
    const weeksMarkup = calendar.map((week) => {
        const daysMarkup = week.map((day) => {
          return `<div id="day-${day ? day : ""}" class="day-cell"> ${
            day ? `<span> ${day}</span>` : ""
          } </div>`;
        });

       // console.log(daysMarkup)
       
        return `
                      <div class="week-row">
                          ${daysMarkup.join("")}
                      </div>
                  `;
                  
      });
     // console.log(daysMarkUp)
weeksMarkup.unshift(`<div class="week-row">${weekDaysMarkUp.join("")}</div`)
//console.log(weeksMarkup)
let htmlMarkUp = weeksMarkup.join("")
console.log("htmlMarkUp", htmlMarkUp);
document.getElementById("our-calendar").innerHTML = htmlMarkUp
      
};

const toggleHighLightDate = (date) => {
    const dayCell = document.getElementById(`day-${date}`)

    if(dayCell){
        if(dayCell.className.indexOf("active")>-1){
            dayCell.className += "day-cell"
        } else dayCell.className += "active"
    }
};

const handleChange =(month,year) => {
    const daysInMonth =noOfDayInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    const calendar = createCalendar(daysInMonth, firstDay);
  //  console.log("calander", calander);
    calendarFrontEnd(calendar);
  };

  const calendarByDefault = () => {
    const monthOpts = months.map(
        (month,count) => `<option value="${count+1}">${month}</option>`
    ).join("");


    let yearsOpts = ""
     
     for(let yr = 1900;yr<2050;yr++){
        yearsOpts += `<option value="${yr}">${yr}</option>`
     }

     document.getElementById("select-year").innerHTML = yearsOpts;
     document.getElementById("select-months").innerHTML = monthOpts;


     const presentYear = new Date().getFullYear();
     const presentMonth = new Date().getMonth() + 1;
     const presentDate = new Date().getDate()

     document.getElementById("select-year").value = presentYear;
     document.getElementById("select-months").value = presentMonth;

     handleChange(presentMonth, presentYear)
     toggleHighLightDate(presentDate)

     window.selectedMonth = presentMonth;
     window.selectedYear = presentYear;
  };

  calendarByDefault();

  document.getElementById("enter-btn").addEventListener("click",()=>{
    const val = document.getElementById("select-date").value;
    if(val && !isNaN(val)) toggleHighLightDate(val)
    
  })


  document.getElementById("select-months").addEventListener("change",(event)=>{
    window.selectedMonth = event.target.value;
    handleChange(window.selectedMonth,window.selectedYear)
  })

  document.getElementById("select-year").addEventListener("change",(event)=>{
    window.selectedYear = event.target.value;
    handleChange(window.selectedMonth,window.selectedYear)
  })