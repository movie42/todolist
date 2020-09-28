import "./styles.css";

const date = document.querySelector(".date");
const userForm = document.querySelector(".userForm");
const userName = userForm.querySelector(".userName");
const todoForm = document.querySelector(".todoForm");
const input = todoForm.querySelector(".todoName");
const todoList = document.querySelector(".todoList");
const greeting = document.querySelector(".greetingUser");
const weather = document.querySelector(".weather");

const todoKey = "TODO_LIST";
const USER_NAME = "users";
const COORDS = "coords";
const API_KEY = "d0b507ffc26b0ba87bc5af7c9d1fb0e5";

let todoSaveList = [];

const imgObj = {
  img1:
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  img2:
    "https://images.unsplash.com/photo-1587997573803-5df279e30716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1763&q=80",
  img3:
    "https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80",
  img4:
    "https://images.unsplash.com/photo-1588618670195-620f6dde8368?ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80",
  img5:
    "https://images.unsplash.com/photo-1526035266069-fc237c5baddd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80",
};

function randomBackGround(value) {
  let keys = Object.keys(value);
  return value[keys[(keys.length * Math.random()) << 0]];
}

function changeBackgroundImage() {
  const app = document.getElementById("app");
  app.style.backgroundImage = `url(${randomBackGround(imgObj)})`;
}

function randomNumber() {
  const number = Math.floor(Math.random() * 10000000000);
  return number;
}

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

function saveToDoList() {
  localStorage.setItem(todoKey, JSON.stringify(todoSaveList));
}

function delTodoList(event) {
  const nodeTarget = event.target;
  const li = nodeTarget.parentNode;
  todoList.removeChild(li);
  const clean = todoSaveList.filter((value) => value.id !== +li.id);
  todoSaveList = clean;
  saveToDoList();
}

function writeToDoList(value) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const id = randomNumber();
  span.innerText = value;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delTodoList);
  li.id = id;
  li.appendChild(span);
  li.appendChild(delBtn);
  todoList.appendChild(li);
  const todoObj = {
    text: value,
    id,
  };
  todoSaveList.push(todoObj);
  saveToDoList();
}

function handleSubmit(event) {
  event.preventDefault();
  const toDoValue = input.value;
  writeToDoList(toDoValue);
  input.value = "";
}

function getLocalStorageItem() {
  const localItem = localStorage.getItem(todoKey);
  if (localItem !== null) {
    const parsedTodo = JSON.parse(localItem);
    parsedTodo.forEach((value) => writeToDoList(value.text));
  }
}

function resetUserName(event) {
  const button = event.target;
  button.remove();
  userForm.classList.add("showing");
  todoForm.classList.remove("showing");
  localStorage.clear(USER_NAME);
  greeting.innerText = "몇시간이나 남았죠?";
}

function paintUserName() {
  const getUserName = localStorage.getItem(USER_NAME);
  if (getUserName !== null) {
    userForm.classList.remove("showing");
    todoForm.classList.add("showing");
    greeting.innerText = `${getUserName}님, 너무 조급해하지 마세요 ㅎㅎ`;
    const button = document.createElement("button");
    button.className = "rewrite_btn";
    button.innerText = `${getUserName}님이 아니신가요?`;
    button.addEventListener("click", resetUserName);
    greeting.after(button);
  }
}

function getUserName(event) {
  event.preventDefault();
  const userText = userName.value;
  localStorage.setItem(USER_NAME, userText);
  paintUserName();
}

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (json) {
      return json.json();
    })
    .then(function (json) {
      const temperatur = json.main.temp;
      weather.innerText = `오늘의 기온은 ${
        temperatur > 30 ? `${temperatur}도로 존나 덥습니다.` : temperatur
      }입니다.`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude);
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("I CAN NOT");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  setInterval(getDate, 1000);
  userForm.addEventListener("submit", getUserName);
  todoForm.addEventListener("submit", handleSubmit);
  getLocalStorageItem();
  paintUserName();
  changeBackgroundImage();
  loadCoords();
}

init();
