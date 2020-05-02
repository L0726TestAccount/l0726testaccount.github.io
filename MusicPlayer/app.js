const musicContainer = document.getElementById("music-container"),
  playBtn = document.getElementById("play"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  audio = document.getElementById("audio"),
  progress = document.getElementById("progress"),
  progressContainer = document.getElementById("progress-container"),
  title = document.getElementById("title"),
  cover = document.getElementById("cover"),
  second_gear = document.getElementById("second-gear"),
  wavy = document.getElementById("wavy"),
  body = document.getElementsByTagName("body");

//歌曲名稱
const songs = ["Bastille-Pompeii", "Just-a-Day", "Brand-New-World"];

//紀錄現在是哪首歌在播
let songIndex = 0;
//載入歌曲
loadSong(songs[songIndex]);

//更新歌曲資訊
function loadSong(song) {
  if (song === "Just-a-Day") {
    body[0].style.backgroundImage =
      "linear-gradient(0deg, #394359 23.8%, #303242 92%)";
    audio.volume = 0.1;
  } else if (song === "Brand-New-World") {
    body[0].style.backgroundImage =
      "linear-gradient(0deg, #00818a 23.8%, #216583 92%)";
    audio.volume = 0.5;
  } else {
    body[0].style.backgroundImage =
      "linear-gradient(223.88deg, #848484 8.89%, #000000 94.31%)";
    audio.volume = 0.5;
  }
  title.innerText = song;

  audio.src = `${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  textAnimation(song);
}

function textAnimation(song) {
  const songAni = song
    .split("")
    .map(
      (letter, index) =>
        `<span style="--i:${index + 1};margin-left:5px;">${letter}</span>`
    )
    .join("");
  wavy.innerHTML = songAni;
}

//播放歌曲
function playSong() {
  musicContainer.classList.add("play");
  wavy.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

//暫停歌曲
function pauseSong() {
  musicContainer.classList.remove("play");
  wavy.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

//前一首歌
function prevSong() {
  songIndex--;
  //要是是第一首的話就往最後一首播
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//前一首歌
function nextSong() {
  songIndex++;
  //要是是最後一首的話就第一首
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//更新播放條
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  if (e.path[1].innerText === "Brand-New-World" && currentTime > 28) {
    second_gear.style.display = "block";
    if (currentTime > 33) {
      second_gear.style.display = "none";
    }
  } else {
    second_gear.style.display = "none";
  }
}

//點擊播放條後直接跳到點擊的段落
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//監聽 是不是正在播放
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//改變歌曲 (上 下一首)
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//更新播放條
audio.addEventListener("timeupdate", updateProgress);

//點擊播放條
progressContainer.addEventListener("click", setProgress);

//歌曲結束時自動播放下一首
audio.addEventListener("ended", nextSong);
