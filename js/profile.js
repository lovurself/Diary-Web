// profile images
const profileImg = document.querySelector('.profile .img_box');
const profileArr = [
    "profile_01.png",
    "profile_02.png",
    "profile_03.png", 
    "profile_04.png", 
    "profile_05.png"
];

const chosenImg = profileArr[Math.floor(Math.random() * profileArr.length)];
const img = document.createElement('img');
img.src = `images/${chosenImg}`;

profileImg.appendChild(img);


// introduce
const introForm = document.querySelector('.introduce');
const introTextarea = document.querySelector('.introduce textarea');
const introSubmitBtn = document.querySelector('.introduce input');
const introText = document.querySelector('.intro');
const introTextBox = document.querySelector('.introduce_txt');

const paintIntro = (intro) => {
    introText.innerText = intro;
    introTextBox.classList.remove(HIDDEN_CLASSNAME);
}

const onIntroSubmit = (e) => {
    e.preventDefault();
    
    if (introTextarea.value === '') {
        alert('자기소개글을 적지 않았어요! 자유롭게 자신을 표현해보세요 ^O^');
    } else {
        introForm.classList.add(HIDDEN_CLASSNAME);
        const intro = introTextarea.value;
        localStorage.setItem('intro', intro);
        paintIntro(intro);
    }
}

const savedIntro = localStorage.getItem('intro');

if (savedIntro === null) {
    introForm.classList.remove(HIDDEN_CLASSNAME);
    introSubmitBtn.addEventListener('click', onIntroSubmit);
} else {
    introForm.classList.add(HIDDEN_CLASSNAME);
    paintIntro(savedIntro);
}

// introduce editing
const introEditBtn = document.querySelector('.introduce_txt img');

const introEditing = (e) => {
    e.preventDefault();
    introTextBox.classList.add(HIDDEN_CLASSNAME);
    introForm.classList.remove(HIDDEN_CLASSNAME);
    localStorage.removeItem('intro');
}

introEditBtn.addEventListener('click', introEditing);