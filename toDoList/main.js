const addBtn = document.getElementById('add-btn');
const todoList = document.createElement("ul");
todoList.setAttribute("id", "items");
const content = document.querySelector("#content");
content.appendChild(todoList);

addBtn.addEventListener("click", addToDo);
todoList.addEventListener("click", delItem);


function addToDo(e) {
    e.preventDefault();
    const inputText = document.getElementById('add-input');
    if (inputText.value != "") {
    let item = document.createElement("li");
    item.setAttribute("class", "item");
    let text = document.createElement("h2");
    text.innerText = inputText.value;
    let delBtn = document.createElement("button");
    delBtn.setAttribute("id", "del-btn");
    delBtn.innerText = "Delete";
    let completedBtn = document.createElement("button");
    completedBtn.setAttribute("id", "completed-btn");
    completedBtn.innerText = "Completed";
    item.appendChild(text);
    item.appendChild(completedBtn);
    item.appendChild(delBtn);
    items.appendChild(item);
    inputText.value = "";
    }
}

function delItem(self) {
    const toDo = self.target;
    if (self.target.id == "del-btn") {
        if (confirm("The item will be deleted! Are you Sure? ")) {
            toDo.parentElement.classList.add("deleted");
            toDo.addEventListener("transitionend", function(){
                toDo.parentElement.remove();
            })
        };
    } else if (self.target.id == "completed-btn") {
        toDo.parentElement.classList.toggle("completed");
    }
}