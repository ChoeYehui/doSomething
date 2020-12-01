/*Todo Widget*/
const todoForm = document.querySelector(".js-toDoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];
function deleteTodo(event)
{
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter((todo)=>{
        return todo.id !==parseInt(li.id);
    }); 
    toDos = cleanToDos;
    saveToDos();
}
function saveToDos()
{
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}
function paintTodo(text)
{
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText= "❌";
    delBtn.addEventListener("click",deleteTodo);
    const span = document.createElement("span");
    const newId = toDos.length+1;

    
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;       
    todoList.appendChild(li);
    const todoObj ={
        text : text,
        id:newId,
    }
    toDos.push(todoObj);
    saveToDos();
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value ="";
}
function loadToDos()
{
     const loadedToDos = localStorage.getItem(TODOS_LS)
     if(loadedToDos !== null)
     {
         const parseTodos = JSON.parse(loadedToDos);
         parseTodos.forEach((todo) => {
             paintTodo(todo.text);
         })
     }
}
function init()
{
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
}
init();