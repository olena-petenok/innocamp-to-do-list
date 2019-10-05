import './styles/style.sass';


function hideModalWindow() {
  document.getElementById("modal-window").classList.add("hidden");
  document.querySelector(`#modal-window .form-elements-block`).classList.add("hidden");
  document.querySelector(`#modal-window .saved-to-do-item`).classList.add("hidden");
  document.getElementById("create-item-window").classList.add("hidden");
  document.getElementById("edit-item-window").classList.add("hidden");
  document.getElementById("action-on-item-window").classList.add("hidden");
}

function showModalWindowToCreateItem() {
  document.querySelector(`#modal-window .form-elements-block`).classList.remove("hidden");
  document.getElementById("create-item-window").classList.remove("hidden");
  document.getElementById("modal-window").classList.remove("hidden");
}

function showModalWindowToEditItem() {
  document.querySelector(`#modal-window .saved-to-do-item`).classList.remove("hidden");
  document.getElementById("edit-item-window").classList.remove("hidden");
  document.getElementById("modal-window").classList.remove("hidden");
}

function onEditButtonClicked() {
  // choose an item from the list in a bit different window, after that do the stuff below
  showModalWindowToEditItem();
}

function onDeleteButtonClicked() {
  alert("delete");
}

function onSortButtonClicked() {
  alert("sort");
}

function onCreateItemWindowCreateButtonClicked() {
  alert("created");
}

function onEditItemWindowEditButtonClicked() {
  alert("clicked");
}

function onActionOnItemWindowDeleteButtonClicked() {
  alert("clicked");
}

function onActionOnItemWindowEditButtonClicked() {
  alert("clicked");
}

function onActionOnItemWindowMarkAsReadButtonClicked() {
  alert("clicked");
}

let createButton = document.getElementById("control-panel-create-button");
let editButton = document.getElementById("control-panel-edit-button");
let deleteButton = document.getElementById("control-panel-delete-button");
let sortButton = document.getElementById("control-panel-sort-button");

let closeIcone = document.querySelector(`#modal-window .modal-close-icon`);
let createItemWindowCancelButton = document.getElementById("create-item-window-cancel-button");
let createItemWindowCreateButton = document.getElementById("create-item-window-create-button");
let editItemWindowCancelButton = document.getElementById("edit-item-window-cancel-button");
let editItemWindowEditButton = document.getElementById("edit-item-window-edit-button");
let actionOnItemWindowDeleteButton = document.getElementById("action-on-item-window-delete-button");
let actionOnItemWindowEditButton = document.getElementById("action-on-item-window-edit-button");
let actionOnItemWindowMarkAsReadButton = document.getElementById("action-on-item-window-mark-as-read-button");

createButton.addEventListener("click", showModalWindowToCreateItem, false);
editButton.addEventListener("click", onEditButtonClicked, false);
deleteButton.addEventListener("click", onDeleteButtonClicked, false);
sortButton.addEventListener("click", onSortButtonClicked, false);

closeIcone.addEventListener("click", hideModalWindow, false);
createItemWindowCancelButton.addEventListener("click", hideModalWindow, false);
createItemWindowCreateButton.addEventListener("click", onCreateItemWindowCreateButtonClicked, false);
editItemWindowCancelButton.addEventListener("click", hideModalWindow, false);
editItemWindowEditButton.addEventListener("click", onEditItemWindowEditButtonClicked, false);
actionOnItemWindowDeleteButton.addEventListener("click", onActionOnItemWindowDeleteButtonClicked, false);
actionOnItemWindowEditButton.addEventListener("click", onActionOnItemWindowEditButtonClicked, false);
actionOnItemWindowMarkAsReadButton.addEventListener("click", onActionOnItemWindowMarkAsReadButtonClicked, false);
