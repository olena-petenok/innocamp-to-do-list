import './styles/style.sass';

import { onItemEditButtonClicked, onModalWindowEditButtonClicked, onItemDeleteButtonClicked,
         onItemMarkAsReadButtonClicked, onSubmitClicked, onSortButtonClicked,
         onSearchButtonClicked } from './eventListeners.js';
import { renderToDoList, hideModalWindow, showModalWindowToCreateItem,
         showModalWindowToEditItem } from './domModifications.js';

const createButton = document.getElementById("control-panel-create-button");
const sortButton = document.getElementById("control-panel-sort-button");
const searchField = document.getElementById("control-panel-search");
const closeIcone = document.querySelector(`#modal-window .modal-close-icon`);
const createItemWindowCancelButton = document.getElementById("create-item-window-cancel-button");
const editItemWindowCancelButton = document.getElementById("edit-item-window-cancel-button");
const modalWindowEditButton = document.getElementById("edit-item-window-edit-button");
const form = document.getElementById("form");

createButton.addEventListener("click", showModalWindowToCreateItem, false);
sortButton.addEventListener("click", onSortButtonClicked, false);
searchField.addEventListener("input", onSearchButtonClicked, false);
closeIcone.addEventListener("click", hideModalWindow, false);
createItemWindowCancelButton.addEventListener("click", hideModalWindow, false);
editItemWindowCancelButton.addEventListener("click", hideModalWindow, false);
modalWindowEditButton.addEventListener("click", onModalWindowEditButtonClicked, false);
form.addEventListener('submit', onSubmitClicked, false);

window.localStorage.clear();
if (window.localStorage.getItem("toDoListData") === null) {
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
    isDone: true
  },{
    id: 3,
    name: "Create",
    description: "Description of the stuff",
    priority: "low",
    deadline: "2020-10-17T07:08",
    isDone: false
  },{
    id: 4,
    name: "Create",
    description: "Description of the stuff",
    priority: "middle",
    deadline: "2019-10-17T07:08",
    isDone: true
  },{
    id: 5,
    name: "Create",
    description: "Description of the stuff",
    priority: "low",
    deadline: "2020-10-17T07:08",
    isDone: false
  }];

  window.localStorage.setItem("toDoListData", JSON.stringify(defaultData));
  window.localStorage.setItem("id", "6");
}

renderToDoList();
