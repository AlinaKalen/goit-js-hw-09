
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
      targetDate = selectedDate; 
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
    let formattedTime = `${date.days} Days\n${date.hours} Hours\n${date.minutes} Minutes\n${date.seconds} Seconds`;
    timerElement.textContent = formattedTime; 
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  

    const days = Math.floor(ms / day);
   
    const hours = Math.floor((ms % day) / hour);
    
    const minutes = Math.floor(((ms % day) % hour) / minute);
   
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  