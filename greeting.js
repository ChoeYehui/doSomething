/* What's Your Name? input. 입력완료 후 Greeting 메세지 출력*/

const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser"
const SHOWING_ON = "showing";
function nameSubmit()
{
    event.preventDefault();
    localStorage.setItem(USER_LS,input.value);
    loadName();
}
function askforName()
{
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit",nameSubmit);
    
}
function paintGreeting(text){
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}

function loadName()
{
    const curUser = localStorage.getItem(USER_LS);
    if(curUser===null)
    {
        askforName();
    }
    else{
        paintGreeting(curUser);
    }
}
function init(){

}
loadName();
init();
