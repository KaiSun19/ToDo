
// create function to check or uncheck to do using toggle depending on object.status
// if object.status is delete then todo item is deleted
// create function reloadStorage --> when reload button is clicked localStorage is refreshed

const dateText = document.querySelector(".date")

const addItem = document.querySelector("#item")
const toDoList =  document.querySelector("#list")
let LIST = JSON.parse(localStorage.getItem("TODOLIST")) || [];
let refresh = document.querySelector("#refreshButton")
let id = 0;

function save(key,value){
    localStorage.setItem(key,JSON.stringify(value))
}

function loadDate(){
    let options = { weekday: "long", month : "short", year:"numeric"}
    let date = new Date()
    dateText.innerHTML = date.toLocaleDateString("en-US",options)
}

loadDate();




function createToDoItem(text){

    let item =  `
                <li class = "toDoItem">
                    <i class="co far fa-circle" id = "emptyCheck" job = "complete"></i>
                    <p class = "todoText"> ${text}</p>
                    <i class = "de fa fa-trash-o" job = "delete"></i>
                </li>
                `
    
    id = LIST.length; 

    let itemObject = {
        item : item,
        ID: id
    }

    return itemObject;
}

function renderList(array,event){
    toDoList.innerHTML = ""
    array.forEach(element => {
        let listDiv = document.createElement("div")
        listDiv.innerHTML = element.item
        toDoList.appendChild(listDiv)
    });
}

function clearStorage(){
    localStorage.clear()
    toDoList.innerHTML = ""
    window.location.reload()
    console.log(LIST)

    
}

refresh.addEventListener("click",clearStorage)

renderList(LIST)




let checkIcon = document.getElementsByClassName("co")
let deleteIcon = document.getElementsByClassName("de")


//localStorage.clear()

console.log(checkIcon)


function toggleComplete(){
    Array.from(checkIcon).forEach(icon =>(
        icon.addEventListener("click",()=>{
            if(icon.classList.contains("fa-circle")){
                icon.classList.remove("fa-circle")
                icon.classList.add("fa-check-circle")
            }
            else if(icon.classList.contains("fa-check-circle")){
                        icon.classList.add("fa-circle")
                        icon.classList.remove("fa-check-circle")
            }
        }
        )
    ))
}

function changeTaskColor(){
    Array.from(checkIcon).forEach(icon =>(
        icon.addEventListener("click",function(event){
            if(icon.classList.contains("fa-check-circle")){
                icon.style.color = "#b8b8b8"
                event.target.parentNode.style.color = "#b8b8b8"
                event.target.parentNode.style.textDecoration =  "line-through"
            }
            else if(icon.classList.contains("fa-circle")){
                icon.style.color = "black"
                event.target.parentNode.style.color = "black"
                event.target.parentNode.style.textDecoration =  "none"
            }
        }
        )
    ))
}

function deleteTask(event){
    Array.from(deleteIcon).forEach(icon =>{
        icon.addEventListener("click",function(event){
            let ind = Array.from(deleteIcon).indexOf(event.target)
            console.log(ind)
            LIST.splice(ind,1)
            save("TODOLIST",LIST)
            renderList(LIST)
            toggleComplete()
            changeTaskColor()
            deleteTask(event)

        })
    })
}

toggleComplete()
changeTaskColor()


document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        if(addItem.value){
            todoText = addItem.value;
            todoObject = createToDoItem(todoText);
            LIST.push(todoObject)
            save("TODOLIST",LIST)
            renderList(LIST)
        }
        toggleComplete()
        changeTaskColor()
        let deleteIcon = document.getElementsByClassName("de")
        deleteTask(event)
        addItem.value = ""
    }})

window.onbeforeunload = (event) =>{
    toggleComplete()
    changeTaskColor()
    let deleteIcon = document.getElementsByClassName("de")
    deleteTask(event)
}