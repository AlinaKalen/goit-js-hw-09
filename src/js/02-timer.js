
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector("[data-start]");
const timerElement = document.querySelector(".timer"); 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.removeAttribute("disabled");
      targetDate = selectedDate; // Set the targetDate when a valid date is selected
    }
  }
};

const datePicker = flatpickr("#datetime-picker", options);

let countdownInterval;
let targetDate;

startButton.addEventListener("click", function() {
  if (!targetDate) {
    alert("Please select a date first.");
    return;
  }

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  updateTimer();
  
  countdownInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
    const now = new Date();
    const timeRemaining = targetDate - now;
    let date = convertMs(timeRemaining);
    let formattedTime = date.days + " Days" + date.hours + " Hours" + date.minutes + " Minutes" + date.seconds + " Seconds";
    timerElement.textContent = formattedTime; 
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  