import { getTodoListFromLocalStorage, setTodoListToLocalStorage, editItemInLocalStorage,
         deleteItemInLocalStorage, sortLocalStorage, searchInTheLocalStorage } from './localStorage.js';
import { renderToDoItem, renderToDoList, hideModalWindow, showModalWindowToCreateItem,
         showModalWindowToEditItem, setFormToDefault, rerenderToDoItem, collectFormData,
         collectFormDataForEditing } from './domModifications.js';

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
  const data = collectFormData();
  hideModalWindow();
  let currentList = getTodoListFromLocalStorage();
  currentList.push(data);
  setTodoListToLocalStorage(currentList);
  renderToDoItem(data);
  setFormToDefault();
  event.preventDefault();
}

function onSortButtonClicked() {
  sortLocalStorage(); // Sorts all saved items by Done/Todo first and then by priority
  // change dom
}

// search by any text in the To-Do item (hiding items that do not match)
function onSearchButtonClicked(event) {
  // GET DATA FROM EVENT
  let matchingData = searchInTheLocalStorage("Create stuff to");
  console.log(matchingData);
  // if (matchingData.length === 0) -> rerender dom
}

export { onItemEditButtonClicked, onModalWindowEditButtonClicked, onItemDeleteButtonClicked,
         onItemMarkAsReadButtonClicked, onSubmitClicked, onSortButtonClicked, onSearchButtonClicked };
