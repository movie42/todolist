import "./styles.css";

const userForm = document.querySelector(".userForm");
const userName = userForm.querySelector(".userName");
const todoForm = document.querySelector(".todoForm");
const input = todoForm.querySelector(".todoName");
const todoList = document.querySelector(".todoList");
const greeting = document.querySelector(".greetingUser");

const todoKey = "TODO_LIST";
const USER_NAME = "users";

let todoSaveList = [];

function randomNumber() {
  const number = Math.floor(Math.random() * 10000000000);
  return number;
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

function init() {
  userForm.addEventListener("submit", getUserName);
  todoForm.addEventListener("submit", handleSubmit);
  getLocalStorageItem();
  paintUserName();
}

init();
