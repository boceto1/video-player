const videoContainer = document.querySelector('.video-container');
const media = document.querySelector('video');
const playButton = document.querySelector('#play-stop');
const muteButton = document.querySelector('#mute-button');
const volumeSlider = document.querySelector('#volume-slider');
const fullScreenButton = document.querySelector('#fullscreen-button');
const progressSlider = document.querySelector('#progress-slider');

initializePlayer();

function initializePlayer() {
  playButton.addEventListener('click', playPausePlayer);
  muteButton.addEventListener('click', muteUnmutePlayer);
  volumeSlider.addEventListener('change', setVolume);
  fullScreenButton.addEventListener('click', setUnsetFullScreen);
  progressSlider.addEventListener('change', setProgress);
}

function playPausePlayer() {
  if (media.paused) {
    playButton.textContent = "Stop";
    media.play();
    progressLoop();
  } else {
    playButton.textContent = "Play";
    media.pause();
  }
}

function muteUnmutePlayer () {
  if (media.muted) {
    muteButton.textContent = "Mute";
    media.volume = 0.5;
    volumeSlider.value = 50;
    media.muted = false;
  } else {
    muteButton.textContent = "Unmute";
    console.log(volumeSlider);
    volumeSlider.value = 0;
    media.muted = true;
  }
}

function changeSpeedRate(speedRate) {
  media.playbackRate = speedRate;
}

function setVolume(volume) {
  media.volume = (volume.target.value) / 100;

  if (media.volume === 0) {
    muteButton.textContent = "Unmute";
    media.muted = true;
  }

  if (media.volume !== 0 && muteButton.textContent !== "Mute") {
    muteButton.textContent = "Mute";
    media.muted = false;
  }
}

function setUnsetFullScreen () {
  const isFullScreen = document.fullscreenElement ||
  document.mozFullScreenElement ||
  document.webkitFullscreenElement ||
  document.msFullscreenElement
  
  if (isFullScreen) {
    exitFullscreen();
  } else {
    launchIntoFullscreen(videoContainer);
  }

}

function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function updateProgressBar() {
  progressSlider.value = Math.round((media.currentTime / media.duration) * 100);
}

function progressLoop() {
  setInterval(updateProgressBar);
}

function setProgress (progress) {
  const progressValue = progress.target.value;
  
  const progressVideoValue = (progressValue * media.duration) / 100;
  console.log(progressValue);
  media.currentTime = progressVideoValue;
}
