import './styles/style.sass';

// function CreateHeaderForModalWindow() {
//   let modalHeader = document.createElement("section");
//   let modalTitle = document.createElement("h5");
//   let modalCloseIcon = document.createElement("div");
//
//   modalTitle.innerText = "Title";
//   modalHeader.append(modalTitle);
//   modalHeader.append(modalCloseIcon);
//
//   return modalHeader;
// }
//
// function ShowModalWindow() {
//   const modalHeader = CreateHeaderForModalWindow();
//
//   const modalWindow = document.getElementById("modal-window");
//   modalWindow.append(modalHeader);
// }

// onClick -> stop propagation
// p.getBy.onClick = function (e) {e.stopPropagation(); do smth}

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
  // let name = document.getElementById("name").innerText();
  // alert(name);

}

function onEditItemWindowEditButtonClicked() {
  alert("clicked");
}

// function onActionOnItemWindowDeleteButtonClicked() {
//   alert("clicked");
// }
//
// function onActionOnItemWindowEditButtonClicked() {
//   alert("clicked");
// }
//
// function onActionOnItemWindowMarkAsReadButtonClicked() {
//   alert("clicked");
// }

// let modalWindow = document.getElementById("modal-window");
// modalWindow.addEventListener("click", hideModalWindow, true);

function collectFormData() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  return {
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
  console.log(JSON.parse(locallyStoredData.getItem("toDoListData")));
  event.preventDefault();
}

// control panel
const createButton = document.getElementById("control-panel-create-button");
const editButton = document.getElementById("control-panel-edit-button");
const deleteButton = document.getElementById("control-panel-delete-button");
const sortButton = document.getElementById("control-panel-sort-button");
createButton.addEventListener("click", showModalWindowToCreateItem, false);
editButton.addEventListener("click", onEditButtonClicked, false);
deleteButton.addEventListener("click", onDeleteButtonClicked, false);
sortButton.addEventListener("click", onSortButtonClicked, false);

// close modal window buttons
const closeIcone = document.querySelector(`#modal-window .modal-close-icon`);
const createItemWindowCancelButton = document.getElementById("create-item-window-cancel-button");
const editItemWindowCancelButton = document.getElementById("edit-item-window-cancel-button");
closeIcone.addEventListener("click", hideModalWindow, false);
createItemWindowCancelButton.addEventListener("click", hideModalWindow, false);
editItemWindowCancelButton.addEventListener("click", hideModalWindow, false);

// modal window buttons
const editItemWindowEditButton = document.getElementById("edit-item-window-edit-button");
editItemWindowEditButton.addEventListener("click", onEditItemWindowEditButtonClicked, false);
// const createItemWindowCreateButton = document.getElementById("create-item-window-create-button");
// const actionOnItemWindowDeleteButton = document.getElementById("action-on-item-window-delete-button");
// const actionOnItemWindowEditButton = document.getElementById("action-on-item-window-edit-button");
// const actionOnItemWindowMarkAsReadButton = document.getElementById("action-on-item-window-mark-as-read-button");
// createItemWindowCreateButton.addEventListener("click", onCreateItemWindowCreateButtonClicked, false);
// actionOnItemWindowDeleteButton.addEventListener("click", onActionOnItemWindowDeleteButtonClicked, false);
// actionOnItemWindowEditButton.addEventListener("click", onActionOnItemWindowEditButtonClicked, false);
// actionOnItemWindowMarkAsReadButton.addEventListener("click", onActionOnItemWindowMarkAsReadButtonClicked, false);

// form submit
const form = document.getElementById("form");
form.addEventListener('submit', onSubmitClicked);

// local storage
let locallyStoredData = window.localStorage;
// let defaultData = [{
//     name: "name1",
//     description: "description1",
//     priority: "priority1",
//     deadline: "deadline1",
//     isDone: false
//   },{
//     name: "name2",
//     description: "description2",
//     priority: "priority2",
//     deadline: "deadline2",
//     isDone: false
//   },{
//     name: "name3",
//     description: "description3",
//     priority: "priority3",
//     deadline: "deadline3",
//     isDone: false
// }];
//
// locallyStoredData.setItem("toDoListData", JSON.stringify(defaultData));
