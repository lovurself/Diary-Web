const profileImg = document.querySelector('.profile .img');
const profileArr = [
    "profile_01.png",
    "profile_02.png",
    "profile_03.png", 
    "profile_04.png", 
    "profile_05.png", 
    "profile_06.png", 
    "profile_07.png", 
    "profile_08.png", 
    "profile_09.png", 
    "profile_10.png", 
    "profile_11.png", 
    "profile_12.png", 
    "profile_13.png"
];

const chosenImg = profileArr[Math.floor(Math.random() * profileArr.length)];
const img = document.createElement('img');
img.src = `images/${chosenImg}`;

profileImg.appendChild(img);