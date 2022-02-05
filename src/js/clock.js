import "./styles.css";

const date = document.querySelector(".date");

function getDate() {
  const today = new Date();
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const untilHour = 24 - hour;
  console.log(untilHour);
  const untilMinutes = 60 - minutes;
  const untilSeconds = 60 - seconds;
  date.innerText = `${untilHour > 10 ? untilHour : `0${untilHour}`}시간 ${
    untilMinutes > 10 ? untilMinutes : `0${untilMinutes}`
  }분 ${untilSeconds > 10 ? untilSeconds : `0${untilSeconds}`}초`;
}
