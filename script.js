const formInput = document.getElementById("formInput");
const formUpdate = document.getElementById("formUpdate");
const input = document.getElementById("taskName");
const addTask = document.getElementById("addTask");
const inputWrapper = document.getElementById("inputWrapper");  
const updateInput = document.getElementById("updateTaskName");
const cancelUpdateTask = document.getElementById("cancelUpdateTask");
const updateTask = document.getElementById("updateTask");
const inputWrapperUpdate = document.getElementById("inputWrapperUpdate");  
const taskListContainer = document.getElementById("toDoContent");
const inputandErrorMessage = document.getElementById("inputandErrorMessage");  
const errorMessage = document.createElement("p");

const editIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M11.2411 2.99101L12.3658 1.86568C12.6002 1.63123 12.9182 1.49951 13.2498 1.49951C13.5813 1.49951 13.8993 1.63123 14.1338 1.86568C14.3682 2.10013 14.4999 2.41811 14.4999 2.74968C14.4999 3.08124 14.3682 3.39923 14.1338 3.63368L4.55442 13.213C4.20197 13.5653 3.76733 13.8242 3.28976 13.9663L1.49976 14.4997L2.03309 12.7097C2.17527 12.2321 2.43418 11.7975 2.78642 11.445L11.2418 2.99101H11.2411ZM11.2411 2.99101L12.9998 4.74968" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> </svg>`;

const deleteIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;

input.addEventListener("focus", function(){
  formInput.classList.add("focus");
    formInput.classList.remove("is-error");
    errorMessage.style.display = "none";


})

input.addEventListener("input", function(){
    formInput.classList.add("focus");
    formInput.classList.remove("is-error");
    errorMessage.style.display = "none";
    input.style.backgroundColor = "transparent"; 


})

input.addEventListener("blur", function () {
  formInput.classList.remove("focus");
})

input.addEventListener("paste", function () { 
  input.style.backgroundColor = "transparent"; 
});

let tasks = [];

// Collecting data
formInput.addEventListener("submit", function (event) {
  event.preventDefault();

  // Validate input field

  if (input.value == "") {
    errorMessage.textContent = `You need to add a task title!`;
    errorMessage.setAttribute("class", "errorMessage");
    errorMessage.setAttribute("id", "errorMessage");
    errorMessage.style.display = "block";
    inputandErrorMessage.appendChild(errorMessage);
    formInput.classList.add("is-error");
  } else {
    let taskName = input.value;

    let taskObject = {
      taskTitle: taskName,
    };

    tasks.push(taskObject);
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    formInput.reset();
    fromLocalStorage();
  }
});

function fromLocalStorage() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  postToUI()
}

// Initialize from localStorage
fromLocalStorage();


function postToUI(){
  
  taskListContainer.innerHTML = ``;

  tasks.forEach((item, index) => {
    const taskItem = document.createElement("div");
    taskItem.setAttribute("class", "task-wrapper");
    taskListContainer.appendChild(taskItem);

    const taskHeading = document.createElement("div");
    taskHeading.setAttribute("class", "task-heading");
    taskItem.appendChild(taskHeading);

    const checkIcon = document.createElement("div");
    checkIcon.setAttribute("class", "check-icon");
    taskHeading.appendChild(checkIcon);

    const nameOfTask = document.createElement("h3");
    nameOfTask.setAttribute("class", "nameOfAct");
    taskHeading.appendChild(nameOfTask);
    nameOfTask.textContent = item.taskTitle;

    // if(item.taskTitle.length > 40){
    // nameOfTask.textContent = `${item.taskTitle.slice(0, 38)}...`;
    // } else {
    //   nameOfTask.textContent = item.taskTitle;
    // }

    taskHeading.addEventListener("click", function () {
      nameOfTask.classList.toggle("strikeOut");
      nameOfTask.classList.fontWeight = "400";
      checkIcon.classList.toggle("checked")
    });

    const actions = document.createElement("div");
    actions.setAttribute("class", "actions");
    taskItem.appendChild(actions);

    const editIconWrapper = document.createElement("div");
    editIconWrapper.setAttribute("class", "editIcon");
    actions.appendChild(editIconWrapper);
    editIconWrapper.innerHTML = editIcon;


    // Add event listener for edit icon  
    editIconWrapper.addEventListener("click", function () {
      editTaskAction(index);
    });

    const deleteIconWrapper = document.createElement("div");
    deleteIconWrapper.setAttribute("class", "deleteIcon");
    actions.appendChild(deleteIconWrapper);
    deleteIconWrapper.innerHTML = deleteIcon;

    // Add event listener for delete icon
    deleteIconWrapper.addEventListener("click", function () {
      deleteItem(index);
    });
  });

  
}

 function deleteItem (index) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      fromLocalStorage();
    }


function editTaskAction(index) {
  formInput.style.display = "none";
  formUpdate.style.display = "flex";
  errorMessage.style.display = "none";
  const updatedTask = tasks[index];  
  updateInput.value = updatedTask.taskTitle; 
  currentTaskIndex = index;
}

function cancelUpdateButton(){
  formInput.style.display = "flex";
  formUpdate.style.display = "none"; 
  formUpdate.reset();

}


formUpdate.addEventListener("submit", function(e){
  e.preventDefault()

  const newTaskTitle = updateInput.value;


  tasks[currentTaskIndex].taskTitle = newTaskTitle;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  formUpdate.reset();
 
  formInput.style.display = "flex";
  formUpdate.style.display = "none";
 
  fromLocalStorage();


})

let currentTaskIndex;

updateInput.addEventListener("focus", function(){
  formUpdate.classList.add("focus");
  formUpdate.classList.remove("is-error");
  errorMessage.style.display = "none";


})

updateInput.addEventListener("input", function(){
  formUpdate.classList.add("focus");
  formUpdate.classList.remove("is-error");
  errorMessage.style.display = "none";
  updateInput.style.backgroundColor = "transparent"; 


})

updateInput.addEventListener("blur", function () {
  formUpdate.classList.remove("focus");
})

updateInput.addEventListener("paste", function () { 
  updateInput.style.backgroundColor = "transparent"; 
});
