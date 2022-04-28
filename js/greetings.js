const greetingsPage = document.querySelector('.greetings');
const greeting = document.querySelector('.greeting')
const loginForm = document.querySelector('.login_form');
const loginInput = document.querySelector('.login_form input');
const welcomeGreeting = document.querySelector('#welcomeGreeting');

// 메인영역의 프로필부분
const name = document.querySelector('.name');

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const paintGreetings = (username) => {
    welcomeGreeting.innerText = `어서와요! ${username}님`;
    welcomeGreeting.classList.remove(HIDDEN_CLASSNAME);
    // welcomeGreeting 글자 타이핑 효과
    new TypeIt("#welcomeGreeting", {
    }).go();

    setTimeout(() => {
        greetingsPage.classList.add(HIDDEN_CLASSNAME);
    }, 3000);

    name.innerText = `${username} 님`;
}

const onLoginSubmit = (e) => {
    e.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    greeting.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);    
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    loginForm.classList.add(HIDDEN_CLASSNAME);
    greeting.classList.add(HIDDEN_CLASSNAME);
    paintGreetings(savedUsername);
}