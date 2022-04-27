let currentMusic = 0;

const music = document.querySelector("#music");

// music 정보
const musicBar = document.querySelector(".music_bar");
const musicName = document.querySelector(".music_name");
const artist = document.querySelector(".artist");

// 재생시간
const currentTime = document.querySelector(".current_time");
const musicDuration = document.querySelector(".music_duration");

// controls
const playBtn = document.querySelector(".play_btn");
const forwardBtn = document.querySelector(".forward_btn");
const backwardBtn = document.querySelector(".backward_btn");

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playBtn.classList.toggle("pause");
});

// setup music
const setMusic = (i) => {
  musicBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  musicName.innerHTML = song.name;
  artist.innerHTML = song.artist;

  currentTime.innerHTML = `00:00`;

  setTimeout(() => {
    musicBar.max = music.duration;
    musicDuration.innerText = formatTime(music.duration);
  }, 300);
};

setMusic(0);

// 
function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

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
  music.play();
  playBtn.classList.remove("pause");
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