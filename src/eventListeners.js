import { getTodoListFromLocalStorage, setTodoListToLocalStorage, editItemInLocalStorage, deleteItemInLocalStorage, sortLocalStorage } from './localStorage.js';
import { renderToDoItem, renderToDoList, hideModalWindow, showModalWindowToCreateItem, showModalWindowToEditItem, setFormToDefault, rerenderToDoItem, collectFormData, collectFormDataForEditing } from './domModifications.js';

function onItemEditButtonClicked(event) {
  let data = event.target.parentElement.parentElement;
  if (data.childNodes[4].innerText == "DONE") { alert("Already done"); }
  else { showModalWindowToEditItem(data); }
}

function onModalWindowEditButtonClicked() {
  const data = collectFormDataForEditing();
  setFormToDefault();
  const actualId = editItemInLocalStorage(data);
  rerenderToDoItem(actualId, data);
  hideModalWindow();
}

function onItemDeleteButtonClicked(event) {
  const data = event.target.parentElement.parentElement;
  let splice = deleteItemInLocalStorage(data);

  let currentList = getTodoListFromLocalStorage();
  currentList.splice(splice, 1);
  setTodoListToLocalStorage(currentList);
}

function onItemMarkAsReadButtonClicked(event) {
  const data = event.target.parentElement.parentElement;

  let currentList = getTodoListFromLocalStorage();
  for (let item of currentList) {
    if (item.id == data.id) { item.isDone = true; break; }
  }
  setTodoListToLocalStorage(currentList);

  data.childNodes[4].innerText = "DONE";
}

function onSubmitClicked(event) {
  // check validity, then just collect data
  const data = collectFormData();
  hideModalWindow();
  let currentList = getTodoListFromLocalStorage();
  currentList.push(data);
  setTodoListToLocalStorage(currentList);
  renderToDoItem(data);
  setFormToDefault();
  event.preventDefault();
}

// Sort all saved items by Done/Undone first and then by priority
function onSortButtonClicked() {
  sortLocalStorage();
  // change dom
}

export { onItemEditButtonClicked, onModalWindowEditButtonClicked, onItemDeleteButtonClicked, onItemMarkAsReadButtonClicked, onSubmitClicked, onSortButtonClicked };
