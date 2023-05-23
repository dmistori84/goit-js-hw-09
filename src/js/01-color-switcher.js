const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
};
const attribute = 'disabled';
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

function onStartClick() {
    timerId = setInterval(() => refs.body.style.backgroundColor = getRandomHexColor(), 1000);
    if (timerId) refs.start.setAttribute(attribute, '');
    refs.stop.removeAttribute(attribute);
}

function onStopClick() {
    if (timerId) {
        clearInterval(timerId);
        refs.start.removeAttribute(attribute);
        refs.stop.setAttribute(attribute, '')
    }
}