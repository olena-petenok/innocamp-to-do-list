import { getTodoListFromLocalStorage, setTodoListToLocalStorage } from './localStorage.js';
import { onItemEditButtonClicked, onItemDeleteButtonClicked, onItemMarkAsReadButtonClicked } from './eventListeners.js';

function renderToDoItem(data) {
  const container = document.querySelector(`.to-do-items-list .grid`);
  const itemDiv = document.createElement("div");
  const title = document.createElement("p");
  const description = document.createElement("p");
  const priority = document.createElement("p");
  const prioritySpan = document.createElement("span");
  const deadline = document.createElement("p");
  const isDone = document.createElement("p");
  const deleteButton = document.createElement("input");
  const editButton = document.createElement("input");
  const markAsReadButton = document.createElement("input");
  const buttonsWrapper = document.createElement("div");

  itemDiv.setAttribute("id", data.id);

  title.innerText = data.name;
  priority.innerText = "Priority: ";
  prioritySpan.innerText = data.priority;

  if (data.description) { description.innerText = data.description; }
  else { description.innerText = "No description" }

  if (data.deadline) { deadline.innerText = data.deadline; }
  else { deadline.innerText = "No deadline"; }

  if (data.isDone) { isDone.innerText = "DONE"; }
  else { isDone.innerText = "TO DO"; }

  deleteButton.value = "Delete";
  editButton.value = "Edit";
  markAsReadButton.value = "Mark as done";
  deleteButton.type = "button";
  editButton.type = "button";
  markAsReadButton.type = "button";

  title.classList.add("title");
  description.classList.add("text");
  priority.classList.add("text");
  deadline.classList.add("text");
  isDone.classList.add("text");
  prioritySpan.classList.add(`priority-` + data.priority);
  itemDiv.classList.add("item");
  deleteButton.classList.add("negative");
  editButton.classList.add("positive");
  markAsReadButton.classList.add("positive");
  buttonsWrapper.classList.add("buttons-wrapper");

  deleteButton.addEventListener("click", onItemDeleteButtonClicked, false);
  editButton.addEventListener("click", onItemEditButtonClicked, false);
  markAsReadButton.addEventListener("click", onItemMarkAsReadButtonClicked, false);

  buttonsWrapper.append(deleteButton);
  buttonsWrapper.append(editButton);
  buttonsWrapper.append(markAsReadButton);
  priority.append(prioritySpan);
  itemDiv.append(title);
  itemDiv.append(description);
  itemDiv.append(priority);
  itemDiv.append(deadline);
  itemDiv.append(isDone);
  itemDiv.append(buttonsWrapper);
  container.append(itemDiv);
}

function renderToDoList() {
  const currentList = getTodoListFromLocalStorage();
  for (let item in currentList) {
    renderToDoItem(currentList[item]);
  }
}

function hideModalWindow() {
  document.getElementById("modal-window").classList.add("hidden");
  document.querySelector(`#modal-window .form-elements-block`).classList.add("hidden");
  document.getElementById("create-item-window").classList.add("hidden");
  document.getElementById("edit-item-window").classList.add("hidden");
}

function showModalWindowToCreateItem() {
  document.querySelector(`#modal-window .form-elements-block`).classList.remove("hidden");
  document.getElementById("create-item-window").classList.remove("hidden");
  document.getElementById("modal-window").classList.remove("hidden");
}

function showModalWindowToEditItem(data) {
  let name = document.getElementById("name");
  let description = document.getElementById("description");
  let priority = document.getElementById("priority");
  let deadline = document.getElementById("deadline");
  let title = document.querySelector(`#modal-window .modal-title`);

  name.value = data.childNodes[0].innerText;
  if ("No description" != data.childNodes[1].innerText) {
    description.value = data.childNodes[1].innerText;
  }
  priority.value = data.childNodes[2].innerText.split(' ')[1];
  if ("No deadline" != data.childNodes[3].innerText) {
    deadline.value = data.childNodes[3].innerText;
  }
  title.innerText = "Edited item: " + data.id;

  document.querySelector(`#modal-window .form-elements-block`).classList.remove("hidden");
  document.getElementById("edit-item-window").classList.remove("hidden");
  document.getElementById("modal-window").classList.remove("hidden");
}

function setFormToDefault() {
  let name = document.getElementById("name");
  let description = document.getElementById("description");
  let priority = document.getElementById("priority");
  let deadline = document.getElementById("deadline");
  let title = document.querySelector(`#modal-window .modal-title`);
  name.value = "";
  description.value = "";
  priority.value = "";
  deadline.value = "";
  title.innerText = "Create new item";
}

function rerenderToDoItem(actualId, data) {
  const edited = document.querySelector(`.to-do-items-list .grid`).childNodes[actualId +1];

  edited.childNodes[0].innerText = data.name;
  if (data.description && (data.description != "No description")) { edited.childNodes[1].innerText = data.description; }
  if (data.deadline && (data.deadline != "No deadline")) { edited.childNodes[3].innerText = data.deadline; }
  edited.childNodes[4].innerText = "TO DO";
  edited.childNodes[2].innerText = "Priority: ";

  let span = document.createElement("span");
  span.classList.add(`priority-` + data.priority);
  span.innerText = data.priority;
  edited.childNodes[2].append(span);
}

function collectFormData() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  const id = parseInt(window.localStorage.getItem("id"));
  window.localStorage.setItem("id", ("" + (id + 1)));

  return {
    id: id,
    name: name ? name : "Nameless",
    description: description ? description : "No description",
    priority: priority ? priority : "No priority",
    deadline: deadline ? deadline : "No deadline",
    isDone: false
  };
}

function collectFormDataForEditing() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  const id = parseInt(document.querySelector(`#modal-window .modal-title`).innerText.split(' ')[2]);

  return {
    id: id,
    name: name ? name : false,
    description: description ? description : false,
    priority: priority ? priority : false,
    deadline: deadline ? deadline : false
  };
}

export { renderToDoItem, renderToDoList, hideModalWindow, showModalWindowToCreateItem,
         showModalWindowToEditItem, setFormToDefault, rerenderToDoItem, collectFormData,
         collectFormDataForEditing };
