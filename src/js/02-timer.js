import Notiflix from "notiflix";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    inputData: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    valueDays: document.querySelector('[data-days]'),
    valueHours: document.querySelector('[data-hours]'),
    valueMinutes: document.querySelector('[data-minutes]'),
    valueSeconds: document.querySelector('[data-seconds]'),
};
const attribute = 'disabled';

refs.btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
           
     if (selectedDates[0] < Date.now()) { 
          refs.btnStart.setAttribute(attribute, '');
          Notiflix.Notify.failure('Please choose a date in the future');
          return;
      }
      
      refs.btnStart.removeAttribute(attribute);
               
      refs.btnStart.addEventListener('click', onClickStartBtn);

      function onClickStartBtn() { 
        refs.btnStart.setAttribute(attribute, '');
          
        const timeWork = setInterval(() => { 
            const differenceTime = selectedDates[0] - Date.now(); 
            const timeComp = convertMs(differenceTime);
            showTime(timeComp);
            if (differenceTime < 1000) {
                Notiflix.Notify.success('time is over!');
                clearInterval(timeWork);
            }
          }, 1000)
      }
    },
 
};

flatpickr(refs.inputData, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function showTime({ days, hours, minutes, seconds }) { 
    refs.valueDays.textContent = `${days}`;
    refs.valueHours.textContent = `${hours}`;
    refs.valueMinutes.textContent = `${minutes}`;
    refs.valueSeconds.textContent = `${seconds}`;
};

function addLeadingZero(value) {
      return String(value).padStart(2, '0');
}