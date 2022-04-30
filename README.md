# Diary-Web

[Demo page](heyminah.dothome.co.kr/daily_web)

<br>

**기획**  
노마드 코더 니꼴라스님의 "바닐라 JS로 크롬 앱 만들기" 강의를 통해 기본 지식을 배우고 추가 기능을 넣어 보았습니다.

**기본 사항**

1. 이름 입력 및 저장 기능
2. 저장된 이름 출력 기능
3. 당일 날짜 및 시간 표시
4. 랜덤으로 명언 표시
5. todo list 생성 및 제거 기능
6. 사용자 위치 기반 날씨 표시

**추가 사항**

1. 인사말 타이핑 효과 추가
2. 프로필 사진 랜덤으로 생성 기능
3. 프로필 자기소개 작성 및 저장된 자기소개글 수정 기능
4. todo list 완료 체크 기능
5. 음악 재생 기능
6. 북마크

<br>
<br>

## 사진 및 스크립트

<br>

![daily_web01](https://user-images.githubusercontent.com/98265020/166109300-45a93017-7c88-4446-b9e0-1670209fb2a9.png)

![daily_web02](https://user-images.githubusercontent.com/98265020/166109419-3c4041db-4c4f-4f70-88a7-3d2a644cd871.png)

```js
const greetingsPage = document.querySelector(".greetings");
const greeting = document.querySelector(".greeting");
const loginForm = document.querySelector(".login_form");
const loginInput = document.querySelector(".login_form input");
const welcomeGreeting = document.querySelector("#welcomeGreeting");

// 메인영역의 프로필부분
const name = document.querySelector(".name");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const paintGreetings = (username) => {
  welcomeGreeting.innerText = `어서와요! ${username}님`;
  welcomeGreeting.classList.remove(HIDDEN_CLASSNAME);
  // welcomeGreeting 글자 타이핑 효과
  new TypeIt("#welcomeGreeting", {}).go();

  setTimeout(() => {
    greetingsPage.classList.add(HIDDEN_CLASSNAME);
  }, 3000);

  name.innerText = `${username} 님`;
};

const onLoginSubmit = (e) => {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
};

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  loginForm.classList.add(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);
  paintGreetings(savedUsername);
}
```

<br>
<br>
<br>

![daily_web03](https://user-images.githubusercontent.com/98265020/166109730-de5612f0-75f0-4cb7-bf88-f027be997a5e.png)

=> 본 페이지의 이미지

### header

![daily_web04](https://user-images.githubusercontent.com/98265020/166109737-33631f1e-554f-4a0a-b0a2-97fd1589b327.png)

1. logo는 유니크한 글꼴로 만들었습니다.
2. new Date()를 사용하여 현재 날짜와 시간을 표시해보았습니다. setInterval로 1초마다 새 시간을 가져올 수 있도록 하였고, 시분초를 두자릿수로 표시되도록 설정해주었습니다.

```js
const todayDate = document.querySelector(".today");
const time = document.querySelector(".time");

const showClock = () => {
  const todayClock = new Date();
  const year = todayClock.getFullYear();
  const month = todayClock.getMonth() + 1;
  const date = todayClock.getDate();
  const day = todayClock.getDay();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const hours = String(todayClock.getHours()).padStart(2, "0");
  const minutes = String(todayClock.getMinutes()).padStart(2, "0");
  const seconds = String(todayClock.getSeconds()).padStart(2, "0");
  time.innerText = `${hours} : ${minutes} : ${seconds}`;
  todayDate.innerText = `${year}년 ${month}월 ${date}일 ${week[day]}요일`;
};

showClock();
setInterval(showClock, 1000);
```

3. 날씨 open API를 사용하여 사용자 위치를 기반의 날씨를 표시하는 기능을 구현하였습니다. javascript navigator 객체를 사용하여 사용자의 동의하에 위치의 위도와 경도를 구해 날씨 open API에 적용하여 구현하였습니다.

```js
const API_KEY = "2a28d16895815235bd4b496d7035c0d6";

const onGeoSuccess = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector(".city");
      const weather = document.querySelector(".weather");
      const temp = document.querySelector(".temp");
      city.innerText = data.name;
      weather.innerText = data.weather[0].main;
      temp.innerText = `${parseInt(data.main.temp)}도`;

      // 날씨 아이콘
      const icons = document.querySelectorAll("[data-icon]");
      icons.forEach((icon) => {
        const iconName = icon.dataset.icon;

        if (iconName === data.weather[0].main) {
          icon.classList.remove("hidden");
        }
      });
    });
};

const onGeoError = () => {
  alert("당신의 위치를 찾지 못했어요. 위치에 대한 정보를 동의하시겠어요?");
};

// 사용자 위치 추적
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
```

<br>
<br>
<br>

### profile

![diary_web05](https://user-images.githubusercontent.com/98265020/166110484-a2e3a677-baf1-438c-97cc-3b60c98ed5ab.png)

1. 명언 API를 사용하여 랜덤으로 명언을 표시하는 기능을 구현하고, 랜덤으로 배경색상이 변경되도록 설정하였습니다.

```js
const url = "https://api.adviceslip.com/advice";

fetch(url)
  .then((response) => response.json())
  .then((quote) => {
    const quotes = document.querySelector(".quotes");

    quotes.innerText = `" ${quote.slip.advice} "`;
  });

const quoteBgArr = ["#FFF56D", "#9FB4FF", "#99FFCD", "#FFD36E", "#FFA8A8"];

const quoteBox = document.querySelector(".quote_box");
quoteBox.style.backgroundColor =
  quoteBgArr[Math.floor(Math.random() * quoteBgArr.length)];
```

2. 프로필 사진은 직접 제작해보았고 재미있는 짤들을 본떠서 만들어보았습니다. 다섯가지 프로필 사진을 랜덤으로 표시되도록 기능을 구현해보았습니다.
3. 자기소개글을 작성할 수 있도록 form을 만들었고, 작성 후 저장될 수 있도록 하여 새로고침을 해도 보일 수 있도록 하였습니다. 또한, 작성했던 글을 수정할 수 있도록 edit 아이콘을 추가해주었습니다.

```js
// profile images
const profileImg = document.querySelector(".profile .img_box");
const profileArr = [
  "profile_01.png",
  "profile_02.png",
  "profile_03.png",
  "profile_04.png",
  "profile_05.png",
];

const chosenImg = profileArr[Math.floor(Math.random() * profileArr.length)];
const img = document.createElement("img");
img.src = `images/${chosenImg}`;

profileImg.appendChild(img);

// introduce
const introForm = document.querySelector(".introduce");
const introTextarea = document.querySelector(".introduce textarea");
const introSubmitBtn = document.querySelector(".introduce input");
const introText = document.querySelector(".intro");
const introTextBox = document.querySelector(".introduce_txt");

const paintIntro = (intro) => {
  introText.innerText = intro;
  introTextBox.classList.remove(HIDDEN_CLASSNAME);
};

const onIntroSubmit = (e) => {
  e.preventDefault();

  if (introTextarea.value === "") {
    alert("자기소개글을 적지 않았어요! 자유롭게 자신을 표현해보세요 ^O^");
  } else {
    introForm.classList.add(HIDDEN_CLASSNAME);
    const intro = introTextarea.value;
    localStorage.setItem("intro", intro);
    paintIntro(intro);
  }
};

const savedIntro = localStorage.getItem("intro");

if (savedIntro === null) {
  introForm.classList.remove(HIDDEN_CLASSNAME);
  introSubmitBtn.addEventListener("click", onIntroSubmit);
} else {
  introForm.classList.add(HIDDEN_CLASSNAME);
  paintIntro(savedIntro);
}

// introduce editing
const introEditBtn = document.querySelector(".introduce_txt img");

const introEditing = (e) => {
  e.preventDefault();
  introTextBox.classList.add(HIDDEN_CLASSNAME);
  introForm.classList.remove(HIDDEN_CLASSNAME);
  localStorage.removeItem("intro");
};

introEditBtn.addEventListener("click", introEditing);
```

<br>
<br>
<br>

### todo list

![diary_web06](https://user-images.githubusercontent.com/98265020/166110503-704ae00c-676e-4304-97f3-3e33eaa787e1.png)

1. form 태그와 input태그를 활용하여 할일을 생성할 수 있는 레이아웃을 만들었고 아래 ul에 li를 추가하면서 할일 생성될 수 있도록 구현하였습니다.
2. 휴지통을 클릭하면 저장된 할일을 삭제되도록 구현하였습니다.
3. 완료한 할일은 왼쪽 동그라미를 클릭하면 체크와 line through 되도록 설정하였습니다.

```js
const todoForm = document.querySelector(".todo_form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo_list");

const TODOS_KEY = "todos";
let todos = []; // 원래 빈 배열이지만 저장소에 todos가 있다면 todos의 값이 바뀌어야 하므로 let으로 선언

const saveTodos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos)); // JSON.stringify는 localStorage에 배열처럼 저장할 수 있게 함
};

const plusTodo = (newTodoObj) => {
  const todoItem = document.createElement("li");
  todoItem.id = newTodoObj.id;
  const todoDone = document.createElement("span");
  const todoItemText = document.createElement("span");
  const removeTodo = document.createElement("i");
  removeTodo.classList.add("fas", "fa-trash-alt");
  removeTodo.addEventListener("click", (e) => {
    const li = e.target.parentElement;
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    li.remove();
    saveTodos(); // localStorage의 데이터를 새롭게 저장
  });
  todoItem.appendChild(todoDone);
  todoItem.appendChild(todoItemText); // appendChild는 부모 노드의 마지막 자식 노드 다음에 넣어줄 것을 지정
  todoItem.appendChild(removeTodo);
  todoItemText.innerText = newTodoObj.text;
  todoList.appendChild(todoItem);

  // todo Done
  const checkedBtn = document.createElement("i");
  checkedBtn.classList.add("fas", "fa-check");
  todoDone.appendChild(checkedBtn);

  const onTodoDone = (e) => {
    e.preventDefault();
    todoDone.classList.toggle("done");
  };
  todoDone.addEventListener("click", onTodoDone);
};

const todoSubmit = (e) => {
  e.preventDefault();
  const newTodo = todoInput.value;
  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
  };
  todoInput.value = "";
  todos.push(newTodoObj);
  plusTodo(newTodoObj);
  saveTodos();
};

todoForm.addEventListener("submit", todoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos; // savedTodos가 있다면 빈 배열이었던 todos를 parsedTodos로 변경해서 저장된 todos를 가져옴
  parsedTodos.forEach(plusTodo);
}
```

<br>
<br>
<br>

### music & bookmarks

![diary_web07](https://user-images.githubusercontent.com/98265020/166110799-6a655df9-65a2-45ec-b525-8f05b27ed0b6.png)

1. audio 태그를 사용하여 음악 재생 기능을 추가하였습니다. controls와 music duration bar는 커스텀을 하여 사용하였습니다.
2. music-data 파일에 곡마다의 정보 객체를 가지고 있는 배열을 만들어서 정보를 불러와서 음악이 재생되고 정보가 표시되도록 구현하였습니다.
3. 구글, 유튜브, 네이버를 새 창에 열리도록 설정하였고, 제가 운영하고 있는 블로그와 깃허브 북마크도 추가했습니다.

```js
let currentMusic = 0;

const music = document.querySelector("#music");

// music 정보
const coverImg = document.querySelector(".cover_img");
const musicName = document.querySelector(".music_name");
const artist = document.querySelector(".artist");

// 재생시간
const musicBar = document.querySelector(".music_bar");
const currentTime = document.querySelector(".current_time");
const musicDuration = document.querySelector(".music_duration");

// controls
const play = document.querySelector(".play");
const playBtn = document.querySelector(".play_btn");
const pauseBtn = document.querySelector(".pause_btn");
const forwardBtn = document.querySelector(".forward_btn");
const backwardBtn = document.querySelector(".backward_btn");

play.addEventListener("click", () => {
  playMusic();
});

// setup music
const setMusic = (i) => {
  musicBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  coverImg.style.background = `url(${song.cover}) center no-repeat`;
  coverImg.style.backgroundSize = "100% auto";
  musicName.innerHTML = song.name;
  artist.innerHTML = song.artist;

  currentTime.innerHTML = `00 : 00`;

  setTimeout(() => {
    musicBar.max = music.duration;
    musicDuration.innerText = formatTime(music.duration);
  }, 300);
};

setMusic(0);

// 재생 길이
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`;
};

// music bar
setInterval(() => {
  musicBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(musicBar.max)) {
    forwardBtn.click();
  }
}, 500);

musicBar.addEventListener("change", () => {
  music.currentTime = musicBar.value;
});

const playMusic = () => {
  if (play.className.includes("pause")) {
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    music.play();
  } else {
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
    music.pause();
  }
  play.classList.toggle("pause");
};

// controls
forwardBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});

backwardBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});
```
