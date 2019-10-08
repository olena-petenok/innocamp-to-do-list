function getTodoListFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem("toDoListData"));
}

function setTodoListToLocalStorage(data) {
  window.localStorage.setItem("toDoListData", JSON.stringify(data));
}

function editItemInLocalStorage(data) {
  let currentList = getTodoListFromLocalStorage();
  let actualId = 0;

  for (let item of currentList) {
    if (item.id == data.id) {
      if (data.description) { item.description = data.description; }
      if (data.deadline) { item.deadline = data.deadline; }
      if (data.name) { item.name = data.name; }
      if (data.priority) { item.priority = data.priority; }
      break;
    }
    actualId++;
  }
  setTodoListToLocalStorage(currentList);

  return actualId;
}

function deleteItemInLocalStorage(data) {
  let splice = 0;
  let parent = data.parentElement;

  for (let item of parent.children) {
    if (item.id == data.id) {
      parent.removeChild(item);
      break;
    }
    splice++;
  }

  return splice;
}

// data = sortByIsDone(data);
function sortByIsDone(data) {
  return data.sort ((a, b) => { return (a.isDone === b.isDone) ? 0 : a.isDone ? -1 : 1; });
}

function sortByPriority(data) {
  return data.sort ((a, b) => {
    if (a.priority === "high") { return -1; }

    else if (a.priority === "middle") {
      if (b.priority === "high") { return 1; }
      else if (b.priority === "middle") { return 0; }
      else if (b.priority === "low") { return -1; }
    }

    else if (a.priority === "low") { return 1; }
  });
}

function sortLocalStorage() {
  let currentList = getTodoListFromLocalStorage();
  let donePrioritisedList = sortByPriority(currentList.filter(item => item.isDone === true));
  let todoPrioritisedList = sortByPriority(currentList.filter(item => item.isDone === false));
  let sortedList = donePrioritisedList.concat(todoPrioritisedList);
  setTodoListToLocalStorage(sortedList);
}

export { getTodoListFromLocalStorage, setTodoListToLocalStorage, editItemInLocalStorage, deleteItemInLocalStorage, sortLocalStorage };
