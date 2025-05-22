import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
let userSelectedDate;
const daysEle = document.querySelector("span[data-days]");
const hoursEle = document.querySelector("span[data-hours]");
const minutesEle = document.querySelector("span[data-minutes]");
const secondsEle = document.querySelector("span[data-seconds]");
const datepicker = document.querySelector("#datatime-picker");

const button = document.querySelector('button[data-start]')
button.disabled = true;

const datapickerOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onOpen() { // to disable button if user didnt click it and want to pick another date
        button.disabled = true
    },
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const diff = userSelectedDate - new Date();
        diff > 0 ? button.disabled = false : window.alert("Please pick date in future");        
    },
};

const fp = flatpickr(datepicker, datapickerOptions);

let timerId = null
button.addEventListener("click", startCountdown)

const calcDiff = () => {
    const currentDate = new Date();
    const currentDiff = userSelectedDate - currentDate
    return currentDiff
}

function convertMs(ms) { // outside code from task
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
const addingZeroIfLessThenDobleDigits = (value) => {
    return String(value).padStart(2, "0")
}

function startCountdown() {
  if (timerId !== null) {   
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    const diff = calcDiff();

    if (diff <= 0) {
      clearInterval(timerId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    daysEle.textContent = addingZeroIfLessThenDobleDigits(days);
    hoursEle.textContent = addingZeroIfLessThenDobleDigits(hours);
    minutesEle.textContent = addingZeroIfLessThenDobleDigits(minutes);
    secondsEle.textContent = addingZeroIfLessThenDobleDigits(seconds);
  }, 1000);
}




