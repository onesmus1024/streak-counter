import StreakCounter from "./classes/streakCounter.js";
import BestDoneTask from "./classes/bestDoneTask.js";
import Days from "./classes/days.js";
import Task from "./classes/task.js";



let addBtn = document.querySelector("#add-btn")!;
let modal = document.querySelector('#my-modal')! as HTMLDivElement;
let modalContent = document.querySelector('.modal-content')! as HTMLDivElement;
let taskContainer = document.querySelector('.task-container')! as HTMLDivElement;
// let body = document.querySelector('body')! as HTMLBodyElement;

// let taskTemplateContainer:string = `<div class="container task-container"></div>`


let streakCounter = new StreakCounter();
let task1 = new Task("Stop smoking", "https://images.unsplash.com/photo-1674900199166-a60564143d30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", "2020-11-10");
let task2 = new Task("Bike riding", "https://images.unsplash.com/photo-1674900199166-a60564143d30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", "2020-10-10");
streakCounter.tasks.push(task1);
streakCounter.tasks.push(task2);
let bestDoneTask = new BestDoneTask(streakCounter);

taskContainer.addEventListener("click", (e) => {
    console.log(e.target);
    // check if the target is the delete button
    let target = e.target as HTMLElement;
    if (target.className == "task") {
        showSingle(Number(target.id));
    }
    if (target.className == "delete-btn") {
        deleteTask(Number(target.id));
    }
        
})

modalContent.addEventListener("click", (e) => {
    let target = e.target as HTMLElement;
    if (target.className == "delete-btn") {
        deleteTask(Number(target.id));
    }
})




let formTemplate: string = `
        <span class="close">&times;</span>
        <div class="form-group">
            <h1>Add task</h1>
            <form >
                <div class="input-group">
                    <label for="name">Task Name</label>
                    <input type="text" name="name" id="name" placeholder="name">
                </div>
                <div class="input-group">
                    <label for="task-icon">images</label>
                    <input type="text" name="task-icon" id="task-icon" placeholder="image url">
                </div>
                <div class="input-group">
                    <label for="date">Start Date</label>
                    <input type="date" name="date" id="date">
                </div>
                <button type="submit" id="submit-btn">Add task</button>
            </form>
        </div>`





const validateForm = (): void => {
    let submitBtn = document.querySelector('#submit-btn')! as HTMLButtonElement;
    let formGroup = document.querySelector('.form-group')!;
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let taskName = document.querySelector('#name')! as HTMLInputElement;
        let taskIcon = document.querySelector('#task-icon')! as HTMLInputElement;
        let taskDate = document.querySelector('#date')! as HTMLInputElement;

        if (taskName.value == "" || taskIcon.value == "" || taskDate.value == "") {
            let error = document.querySelector('.error')! as HTMLParagraphElement;
            if (error) {
                error.remove();
            }
            formGroup.insertAdjacentHTML("afterbegin", `<p class="error">Please fill all the fields</p>`)
            let taskName = document.querySelector('#name')! as HTMLInputElement;
            let taskIcon = document.querySelector('#task-icon')! as HTMLInputElement;
            let taskDate = document.querySelector('#date')! as HTMLInputElement;
            if (taskName.value == "") {
                taskName.style.border = "1px solid red";
            }
            if (taskIcon.value == "") {
                taskIcon.style.border = "1px solid red";
            }
            if (taskDate.value == "") {
                taskDate.style.border = "1px solid red";
            }
            setTimeout(() => {
                let error = document.querySelector('.error')! as HTMLParagraphElement;
                if (error) {
                    error.remove();
                }
                taskName.style.border = "1px solid #ccc";
                taskIcon.style.border = "1px solid #ccc";
                taskDate.style.border = "1px solid #ccc";
            },5000)


        }
        else {
            let task = new Task(taskName.value, taskIcon.value, taskDate.value);
            streakCounter.tasks.push(task);
            renderTasks();
            modal.style.display = "none";
        }

    })
}

const closeModal = (): void => {
    let closeBtn = document.querySelector('.close')! as HTMLSpanElement;
    let task = document.querySelector('.task-well-done')! as HTMLDivElement;
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        let formGroup = document.querySelector('.form-group')!;
        if (formGroup) {
            formGroup.remove();
        }
        if (task) {
            task.remove();
        }
    })
}


addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    modalContent.innerHTML = "";
    modalContent.innerHTML = formTemplate;
    closeModal();
    validateForm();


}
)


const deleteTask = (id: number) => {
    let task = streakCounter.tasks.find((task) => task.id == id);
    let index = streakCounter.tasks.indexOf(task!);
    streakCounter.tasks.splice(index,1);
    renderTasks();
    modal.style.display = "none";
} 
const showSingle = (id: number) => {
    let task = streakCounter.tasks.find((task) => task.id == id);
    modalContent.innerHTML = "";
    modal.style.display = "flex";
    let singleTaskTemplate = `
    <span class="close">&times;</span>
    <div class="task">
        <img src="${task?.imageUrl}" alt="task">
        <p class="date">${task?.date}</p>
        <p class="days">Days: ${Days.create(task!).getDays()}</p>
        <!-- task name -->
        <p class="task-name">${task!.name}</p>
        <div class="modal-btn">
        <button id="modal-close-btn" onclick="let modal = document.querySelector('#my-modal');modal.style.display = 'none'">Close</button>
            <button class="delete-btn" id="${task!.id}">Delete</button>
        </div>
    </div>`
    
    if (task){
        modalContent.innerHTML = singleTaskTemplate;
        closeModal();
    }
    else{
        modalContent.innerHTML = "<p>Task not found</p>"
    }

}


const renderTasks = (): void => {
    taskContainer.innerHTML = "";
    streakCounter.tasks.forEach((task) => {
        let taskTemplate = `
        <div class="task" id="${task.id}">
            <img src="${task.imageUrl}" alt="${task.name}">
            <p class="date">${task.date}</p>
            <p>Days done: ${Days.create(task).getDays()}</p>
            <p class="task-name">${task.name}</p>
        </div>
        
        `
        taskContainer.insertAdjacentHTML("afterbegin", taskTemplate);
    }
    )
}


setTimeout(() => {
    let task = bestDoneTask.getBest()
    streakCounter.tasks.push(task);
    modal.style.display = "flex";
    modalContent.innerHTML = "";
    let singleTaskTemplate = `
    <span class="close">&times;</span>
    <div class='task-well-done'>
    <p>Congratulations! Task well done</p>
    <div class="task">
   
        <img src="${task.imageUrl}" alt="task">
        <p class="date">${task.date}</p>
        <p class="days"> ${Days.create(task).getDays()} days ago</p>
        <p class="task-name">${task.name}</p>
        <div class="modal-btn">
        <button id="modal-close-btn" onclick="let modal = document.querySelector('#my-modal');modal.style.display = 'none'">Close</button>
        <button class="delete-btn" id="${task!.id}">Delete</button>
        </div>
    </div>
    </div>`
    modalContent.innerHTML += singleTaskTemplate;
    closeModal();
},5000)