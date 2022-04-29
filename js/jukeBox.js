let currentMusic = 0;

const music = document.querySelector("#music");

// music 정보
const coverImg = document.querySelector('.cover_img');
const musicName = document.querySelector('.music_name');
const artist = document.querySelector('.artist');

// 재생시간
const musicBar = document.querySelector('.music_bar');
const currentTime = document.querySelector('.current_time');
const musicDuration = document.querySelector('.music_duration');

// controls
const play = document.querySelector('.play');
const playBtn = document.querySelector('.play_btn');
const pauseBtn = document.querySelector('.pause_btn');
const forwardBtn = document.querySelector('.forward_btn');
const backwardBtn = document.querySelector('.backward_btn');

play.addEventListener('click', () => {
  playMusic();
});

// setup music
const setMusic = (i) => {
  musicBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  coverImg.style.background = `url(${song.cover}) center no-repeat`;
  coverImg.style.backgroundSize = '100% auto';
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
const formatTime = time => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min < 10 ? '0' + min : min} : ${sec < 10 ? '0' + sec : sec}`;
}

// music bar
setInterval(() => {
  musicBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(musicBar.max)) {
    forwardBtn.click();
  }
}, 500);

musicBar.addEventListener('change', () => {
  music.currentTime = musicBar.value;
});

const playMusic = () => {
  if (play.className.includes('pause')) {
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    music.play();
  } else {
    playBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    music.pause();
  }
  play.classList.toggle('pause');
};

// controls
forwardBtn.addEventListener('click', () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});

backwardBtn.addEventListener('click', () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});