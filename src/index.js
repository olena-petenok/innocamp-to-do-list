import './styles/style.sass';

// onClick -> stop propagation
// p.getBy.onClick = function (e) {e.stopPropagation(); do smth}

// Sort all saved items by Done/Undone first and then by priority
// Add possibility to search by any text in the To-Do item (by hiding items that do not match)

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

function onItemEditButtonClicked(event) {
  let data = event.target.parentElement.parentElement;
  if (data.childNodes[4].innerText == "DONE") { alert("Already done"); }
  else { showModalWindowToEditItem(data); }
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

function collectFormDataForEditing() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  const id = parseInt(document.querySelector(`#modal-window .modal-title`).innerText.split(' ')[2]);

  return {
    id: id,
    name: name ? name : '',
    description: description ? description : '',
    priority: priority ? priority : '',
    deadline: deadline ? deadline : '',
    isDone: false
  };
}

function onModalWindowEditButtonClicked() {
  const data = collectFormDataForEditing();

  let currentList = JSON.parse(locallyStoredData.getItem("toDoListData"));
  for (let item of currentList) {
    if (item.id == data.id) {
      if (data.description) { item.description = data.description; }
      else { item.description = "No description"; }

      if (data.deadline) { item.deadline = data.deadline; }
      else { item.deadline = "No deadline"; }

      item.name = data.name;
      item.priority = data.priority;
      item.isDone = false;
      break;
    }
  }
  locallyStoredData.setItem("toDoListData", JSON.stringify(currentList));

  const edited = document.querySelector(`.to-do-items-list .grid`).childNodes[data.id];
  edited.childNodes[0].innerText = data.name;
  if (data.description && (data.description != "No description")) { edited.childNodes[1].innerText = data.description; }
  if (data.deadline && (data.deadline != "No deadline")) { edited.childNodes[3].innerText = data.deadline; }
  edited.childNodes[4].innerText = "TO DO";
  edited.childNodes[2].innerText = "Priority: ";
  let span = document.createElement("span");
  span.classList.add(`priority-` + data.priority);
  span.innerText = data.priority;
  edited.childNodes[2].append(span);

  setFormToDefault();
  hideModalWindow();
}

function onItemDeleteButtonClicked(event) {
  const data = event.target.parentElement.parentElement;
  let splice = 0;

  let parent = data.parentElement;
  for (let item of parent.children) {
    if (item.id == data.id) {
      parent.removeChild(item);
      break;
    }
    splice++;
  }

  let currentList = JSON.parse(locallyStoredData.getItem("toDoListData"));
  currentList.splice(splice, 1);
  locallyStoredData.setItem("toDoListData", JSON.stringify(currentList));
}

function onItemMarkAsReadButtonClicked(event) {
  const data = event.target.parentElement.parentElement;

  let currentList = JSON.parse(locallyStoredData.getItem("toDoListData"));
  for (let item of currentList) {
    if (item.id == data.id) { item.isDone = true; break; }
  }
  locallyStoredData.setItem("toDoListData", JSON.stringify(currentList));

  data.childNodes[4].innerText = "DONE";
}

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
  const currentList = JSON.parse(locallyStoredData.getItem("toDoListData"));
  for (let item in currentList) {
    renderToDoItem(currentList[item]);
  }
}

function collectFormData() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  const id = parseInt(locallyStoredData.getItem("id"));
  locallyStoredData.setItem("id", ("" + (id + 1)));

  return {
    id: id,
    name: name ? name : '',
    description: description ? description : '',
    priority: priority ? priority : '',
    deadline: deadline ? deadline : '',
    isDone: false
  };
}

function onSubmitClicked(event) {
  const data = collectFormData();
  hideModalWindow();
  let currentList = JSON.parse(locallyStoredData.getItem("toDoListData"));
  currentList.push(data);
  locallyStoredData.setItem("toDoListData", JSON.stringify(currentList));
  renderToDoItem(data);
  setFormToDefault();
  event.preventDefault();
}

function onSortButtonClicked() {
  console.log("sort");
}

// control panel
const createButton = document.getElementById("control-panel-create-button");
const sortButton = document.getElementById("control-panel-sort-button");
const searchField = document.getElementById("control-panel-search");
createButton.addEventListener("click", showModalWindowToCreateItem, false);
sortButton.addEventListener("click", onSortButtonClicked, false);
// searchField.addEventListener();

// close modal window buttons
const closeIcone = document.querySelector(`#modal-window .modal-close-icon`);
const createItemWindowCancelButton = document.getElementById("create-item-window-cancel-button");
const editItemWindowCancelButton = document.getElementById("edit-item-window-cancel-button");
closeIcone.addEventListener("click", hideModalWindow, false);
createItemWindowCancelButton.addEventListener("click", hideModalWindow, false);
editItemWindowCancelButton.addEventListener("click", hideModalWindow, false);

// modal window buttons (create as submit, edit)
const modalWindowEditButton = document.getElementById("edit-item-window-edit-button");
modalWindowEditButton.addEventListener("click", onModalWindowEditButtonClicked, false);
// submit
const form = document.getElementById("form");
form.addEventListener('submit', onSubmitClicked);

// local storage
let locallyStoredData = window.localStorage;
// locallyStoredData.clear();
if (locallyStoredData.getItem("toDoListData") === null) {
  const defaultData = [{
    id: 1,
    name: "Create stuff",
    description: "Description of the stuff",
    priority: "high",
    deadline: "2019-10-17T07:08",
    isDone: false
  },{
    id: 2,
    name: "Create",
    description: "Description of the stuff",
    priority: "middle",
    deadline: "2019-10-17T07:08",
    isDone: false
  },{
    id: 3,
    name: "Create",
    description: "Description of the stuff",
    priority: "low",
    deadline: "2020-10-17T07:08",
    isDone: false
  }];

  locallyStoredData.setItem("toDoListData", JSON.stringify(defaultData));
  locallyStoredData.setItem("id", "4");
}

// first render of the list
renderToDoList();
