import uniPng from '/img/header/uni.webp';

const menuBtnOpn = document.getElementById('hdr-openmenu');
menuBtnOpn.addEventListener('click', onMenuOpenClick);

let closeDelay;
function onMenuOpenClick(evt) {
  setNyan();

  let menu;
  if (evt.target.tagName === 'SPAN') {
    menu = document.querySelector('.hdr-menu');
    closeDelay = setTimeout(() => {
      menu.classList.remove('menu-visible');
    }, 5000);
  } else {
    menu = document.querySelector('.mobile-menu');
    menu.addEventListener('click', onMenuCloseClick);
  }
  menu.classList.toggle('menu-visible');
}

function onMenuCloseClick(evt) {
  if (!evt.target.classList.contains('menu-visible')) {
    evt.currentTarget.classList.remove('menu-visible');
    evt.currentTarget.removeEventListener('click', onMenuCloseClick);
  }
}

// #region Nyan
const logo = document.querySelector('.hdr-nav-logo');
console.dir(logo.firstElementChild);

let srcset;
let nyanStopDelay;
let nyanStarted = false;

function playAudio() {
  logo.classList.add('js-logo');
  let audio = document.getElementById('nyanAudio');
  if (!nyanStarted) {
    logo.addEventListener('mouseout', pauseAudio);
    logo.addEventListener('animationend', goNyan);
    nyanStarted = true;
    audio.currentTime = 1;
  }
  audio.play();
  clearInterval(nyanStopDelay);
}

function pauseAudio() {
  nyanStopDelay = setTimeout(() => {
    let audio = document.getElementById('nyanAudio');
    audio.pause();
    audio.currentTime = 0;
    logo.classList.remove('js-logo');
    logo.firstElementChild.style.animation = '';
    logo.firstElementChild.firstElementChild.srcset = srcset;
    logo.removeEventListener('mouseover', playAudio);
    logo.removeEventListener('mouseout', pauseAudio);
    logo.removeEventListener('animationend', goNyan);
    nyanStarted = false;
  }, 1000);
}
function goNyan() {
  logo.firstElementChild.style.animation = 'nyan 400ms infinite linear';
  srcset = logo.firstElementChild.firstElementChild.srcset;
  logo.firstElementChild.firstElementChild.srcset = uniPng;
}

function setNyan() {
  const isTouchDevice = () =>
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    document.defaultView.innerWidth < 1440;
  if (!isTouchDevice()) {
    logo.removeEventListener('mouseover', playAudio);
    logo.addEventListener('mouseover', playAudio);
  }
}
// #endregion Nyan