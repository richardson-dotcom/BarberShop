// DOM ELEMENTS
const calendarGrid = document.getElementById("calendarGrid");
const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const selectedDateText = document.getElementById("selectedDateText");
const timeSlots = document.getElementById("timeSlots");
const bookingForm = document.getElementById("bookingForm");
const customerName = document.getElementById("customerName");
const customerService = document.getElementById("customerService");
const selectedTimeInput = document.getElementById("selectedTimeInput");
const bookingMessage = document.getElementById("bookingMessage");

// TODAY'S DATE
const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null; //no date has been selected when the page first loads.
let selectedTime = ""; //no appointment time has been selected yet

// WEEKDAY TIME ARRAY
const weekdaySlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM"
];

const saturdaySlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM"
];

const bookedAppointments = {
    "2026-07-28": ["10:00 AM", "2:00PM"],
    "2026-07-29": []
};

// HELPER FUNCTIONS
// getMonthName function
const getMonthName = (monthIndex) => {
    const monthNames = [
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
        "December"
    ];
    return monthNames[monthIndex];
};

// formatDateKey Function
const formatDateKey = (year,month,day) => {
    const safeMonth = String(month + 1).padStart(2, "0");
    const safeDay = String(day).padStart(2, "0");
    return `${year}-${safeMonth}-${safeDay}`;
};

//formatReadableDate Function
const formatReadableDate = (year,month,day) => {
    const date = new Date(year,month,day);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    })
};

//isPastDate FUNCTION
const isPastDate = (year,month,day) => {
    const compareDate = new Date(year,month,day);
    compareDate.setHours(0,0,0,0);
    const todayOnly = new Date();
    todayOnly.setHours(0,0,0,0);

    if (compareDate < todayOnly) {
        return true;
    } else {
        return false;
    }
};

//isClosedDay FUNCTION
const isClosedDay = (year,month,day) => {
    const date = new Date(year,month,day);
    const weekday = date.getDay();
    if (weekday === 0) {
        return true;
    } else {
        return false;
    }
};

//getSlotsForDate Function (ask Martin about it!)
const getSlotsForDate = (year,month,day) => {
    const date = new Date(year,month,day);
    const weekday = date.getDay();
    if (weekday === 6) {
        return saturdaySlots;
    };
    if (weekday === 0) {
        return [];
    };
    return weekdaySlots;
};

// BUILDING THE CALENDAR
// renderCalendar Function
const renderCalendar = () => {
    if (!calendarGrid || !calendarMonthLabel) {
        return;
    }
    // DISPLAY THE MONTH AND YEAR
    calendarMonthLabel.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
    // CLEAR THE OLD CALENDAR
    calendarGrid.innerHTML = "";
    
    // FINDING FIRST DAY OF THE MONTH
    const firstDayOfMonth = new Date(currentYear , currentMonth, 1).getDay();
    // Call the getDay attached to 

    // FINDING NUMBER OF DAYS IN THE MONTH
    const daysInMonth = new Date (currentYear, currentMonth + 1, 0).getDate();

    // CREATING EMPTY CELLS LOOP
    for (let i=0; i < firstDayOfMonth; i++) {
        // CREATE EACH EMPTY CELL
        const emptyCell = document.createElement("div");
        emptyCell.className = "calendar-empty"
        calendarGrid.append(emptyCell); //Append emptyCell to calendarGrid
    };

    // CREATING DAY LOOP
    for (let day = 1; day <= daysInMonth; day++) {
        // CREATING A DAY BUTTON
        const dayButton = document.createElement("button");
        // ADD DAY BUTTON
        dayButton.textContent = day;
        // ADD DEFAULT DAY CLASS
        dayButton.className = "calendar-day";
        // CREATE DATE KEY FOR THE BUTTON
        const dateKey = formatDateKey(currentYear,currentMonth, day);
        // CHECK WHETHER THE BUTTON IS TODAY
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayButton.classList.add("today");
        }
        // CHECK FOR UNAVAILABLE DATES
        if (isPastDate(currentYear, currentMonth, day) === true || isClosedDay(currentYear, currentMonth, day) === true) {
            // ADD THE DISABLED CLASS
            dayButton.classList.add("disabled");
        }
        // CHECK FOR SELECTED DATE
        if (selectedDate && selectedDate.year === currentYear && selectedDate.month === currentMonth && selectedDate.day === day) {
            // ADD THE SELECTED CLASS
            dayButton.classList.add("selected");
        }

        // ADD CLICK EVENT TO THE DAY BUTTON
        dayButton.addEventListener("click", () => {
            // BLOCK PAST DATE CLICKS
            if (isPastDate(currentYear, currentMonth, day) === true) {
                return;
            }
            // BLOCK CLOSED DAY CLICKS
            if (isClosedDay(currentYear, currentMonth, day) === true) {
                return;
            }
            // SAVE THE SELECTED DATE
            selectedDate = {year: currentYear, month: currentMonth, day: day, key: dateKey}
            // CLEAR THE OLD SELECTED TIME
            selectedTime = "";
            selectedTimeInput.value = "";
            // DISPLAY THE READABLE DATE
            selectedDateText.textContent = formatReadableDate(currentYear, currentMonth, day);
            // RENDER THE UDPATED CALENDAR
            renderCalendar();
            // DISPLAY THE TIME SLOTS
            renderTimeSlots();
            // CLEAR THE OLD BOOKING MESSAGE
            bookingMessage.textContent = "";
            bookingMessage.className = "booking-message";
        });
        // APPEND THE DAY BUTTON
        calendarGrid.append(dayButton);
    };
};
// CHECKPOINT 5
// renderCalendar(); 
// Check if the current month, current year, day buttons, empty spaces before the first day

// BUILD THE TIME SLOT BUTTONS
const renderTimeSlots = () => {
    // CHECK FOR THE TIME SLOT CONTAINER
    if (!timeSlots) {
        return;
    }
    // CLEAR THE OLD TIME BUTTONS
    timeSlots.innerHTML = "";
    // CHECK WHETHER A DATE WAS SELECTED
    if(!selectedDate) {
        timeSlots.innerHTML = '<p class = "selected-date-text">Choose a date first.</p>'
        // STOP THE FUNCTION
        return;
    }
    // GET THE CORRECT TIME ARRAY
    const slots = getSlotsForDate(selectedDate.year, selectedDate.month, selectedDate.day)
    // GET THE BOOKED TIMES
    const bookedForDay = bookedAppointments[selectedDate.key] || [];
    // CHECK FOR NO AVAILABLE SCHEDULE
    if (slots.length === 0 ) {
        // DISPLAY THE NO-APPOINTMENTS MESSAGE
        timeSlots.innerHTML = '<p class = "selected-date-text"> No appointments available for this date.</p>'
        return;
    }
    // LOOP THROUGH THE TIME SLOTS
    for (let i = 0; i < slots.length; i++) {
        // GET CURRENT TIME SLOT
        const slot = slots[i];
        // CREATE THE TIME BUTTON
        const slotBtn = document.createElement("button");
        // SET THE BUTTON TYPE
        slotBtn.type = "button";
        // DISPLAY THE TIME
        slotBtn.textContent = slot;
        // ADD THE DEFAULT TIME BUTTON CLASS
        slotBtn.className = "time-slot-btn";
        // CHECK WHETHER THE TIME IS BOOKED
        if (bookedForDay.includes(slot)) {
            // DISABLE A BOOKED TIME
            slotBtn.classList.add("disabled");
            slotBtn.disabled = true;
            // CHANGED THE BOOKED BUTTON TEXT
            slotBtn.textContent = `${slot} - Booked`;
        };
        // CHECK FOR THE SELECTED TIME
        if (selectedTime === slot) {
            // ADD THE SELECTED TIME CLASS
            slotBtn.classList.add("selected");
        };
        // ADD THE TIME BUTTON CLICK EVENT
        slotBtn.addEventListener("click", () => {
            // SAVE THE SELECTED TIME
            selectedTime = slot;
            selectedTimeInput.value = slot;
            // RENDER THE TIME BUTTONS AGAIN
            renderTimeSlots();
        });
        // APPEND TIME BUTTON
        timeSlots.append(slotBtn);
    };
};
// PART 7: ADD MONTH NAVIGATION
// CHECK FOR THE PREVIOUS BUTTON
if (prevMonthBtn) {
    // ADD THE PREVIOUS BUTTON EVENT
    prevMonthBtn.addEventListener("click", () => {
        // DECREASE THE MONTH
        currentMonth--;
        // HANDLE MOVING BEFORE JANUARY
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        // RENDER THE PREVIOUS MONTH
        renderCalendar();
    })
};
// CHECK FOR THE NEXT BUTTON
if (nextMonthBtn) {
    // ADD THE NEXT BUTTON EVENT
    nextMonthBtn.addEventListener("click", () => {
        // INCREASE THE MONTH
        currentMonth++;
        // HANDLE THE MOVING PAST DECEMBER
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        };
        // RENDER THE NEXT MONTH
        renderCalendar();
    });
};
// PART 8: HANDLE THE BOOKING FORM
if (bookingForm) {
    // ADD THE SUBMIT EVENT
    bookingForm.addEventListener("submit", (event) => {
        // PREVENT PAGE REFRESH
        event.preventDefault();
        // GET THE CUSTOMER NAME
        const nameValue = customerName.value.trim(); // removes the extra spaces from the beginning and end of the name
        // GET THE SELECTED SERVICE
        const serviceValue = customerService.value
        // GET THE SELECTED SERVICE
        const timeValue = selectedTimeInput.value
        // START THE FORM VALIDATION
        if (nameValue === "" || serviceValue === "" || !selectedDate || timeValue === "") {
            // DISPLAY THE VALIDATION ERROR
            bookingMessage.textContent = 'Please choose a date, time, name, and service.'
            // ADD THE ERROR CLASS
            bookingMessage.className = "booking-message error";
            // STOP THE SUBMIT EVENT
            return;
        }
        // CHECK THE DATE ARRAY
        if (!bookedAppointments[selectedDate.key]) {
            bookedAppointments[selectedDate.key] = [];
        }
        // CHECK WHETHER THE TIME IS ALREADY BOOKED
        if(selectedDate.includes(timeValue)) {
            // DISPLAY THE DUPLICATE BOOKING ERROR
            bookingMessage.textContent = 'That time was just taken. Please choose another.'
            // ADD THE ERROR CLASS
            bookingMessage.className = "booking-message error";
            // UPDATE THE TIME BUTTONS
            renderTimeSlots();
            return;
        };
        // SAVE THE NEW APPOINTMENT
        bookedAppointments[selectedDate.key].push(timeValue);
        // CREATE THE SUCCESS MESSAGE
        bookingMessage.textContent = 
        // PASS THE SELECTED DATE INTO THE FUNCTION
        // FORMAT THE FULL MESSAGE
        `${nameValue}, your ${serviceValue} appointment is booked for ${formatReadableDate(selectedDate.year, selectedDate.month, selectedDate.day)} at ${timeValue}`
        // ADD THE SUCCESS CLASS
        bookingMessage.className = "booking-message success";
        // RESET THE FORM
        bookingForm.reset();
        // CLEAR THE SELECTED TIME
        selectedTime = "";
        selectedTimeInput.value = "";
        // UPDATE THE TIME BUTTONS
        renderTimeSlots();
    });
};
// PART 9: START THE APPLICATION
// RENDER THE CALENDAR
renderCalendar();
// RENDER THE FIRST TIME-SLOTS MESSAGE
renderTimeSlots();