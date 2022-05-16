const videoContainer = document.querySelector('.video-container');
const media = document.querySelector('video');
const playButton = document.querySelector('#play-stop');
const muteButton = document.querySelector('#mute-button');
const volumeSlider = document.querySelector('#volume-slider');
const fullScreenButton = document.querySelector('#fullscreen-button');
const progressSlider = document.querySelector('#progress-slider');
const snapshotButton = document.querySelector('#snapshot-button');
const videoTitle = document.querySelector('#video-player > h1');
const mp4VideoFile = document.querySelector('#mp4File');
const webMVideoFile = document.querySelector('#webmFile');

const playlistContainer = document.querySelector('.video-list');

initializePlayer();

const videos = [
  {
    title: 'React Global Summit 2022 2',
    description: 'Video de presentación para React Global Summit 2022',
    mp4File: './public/videos/mock-video-2.mp4',
    webMFile: './public/videos/mock-video-2.webm',
    thumbnail: './public/images/image-video-2.png',
  },
  {
    title: 'React Global Summit 2022',
    description: 'Video de presentación para React Global Summit 2022',
    mp4File: './public/videos/mock-video-2.mp4',
    webMFile: './public/videos/mock-video-2.webm',
    thumbnail: './public/images/image-video-2.png',
  },
  {
    title: 'React Global Summit 2022 3',
    description: 'Video de presentación para React Global Summit 2022',
    mp4File: './public/videos/mock-video-2.mp4',
    webMFile: './public/videos/mock-video-2.webm',
    thumbnail: './public/images/image-video-2.png',
  },
  {
    title: 'React Global Summit 2022 4',
    description: 'Video de presentación para React Global Summit 2022',
    mp4File: './public/videos/mock-video-2.mp4',
    webMFile: './public/videos/mock-video-2.webm',
    thumbnail: './public/images/image-video-2.png',
  },
];

const currentVideo = videos[0];

function initializePlayer() {
  playButton.addEventListener('click', playPausePlayer);
  muteButton.addEventListener('click', muteUnmutePlayer);
  volumeSlider.addEventListener('change', setVolume);
  fullScreenButton.addEventListener('click', setUnsetFullScreen);
  progressSlider.addEventListener('change', setProgress);
  snapshotButton.addEventListener('click', takeSnapshot);
}

function setVideos() {
  setCurrentVideo();
  setPlayList();
}

function setCurrentVideo () {
  videoTitle.textContent = currentVideo.title;
  mp4VideoFile.src = currentVideo.mp4File;
  webMVideoFile.src = currentVideo.webMFile;
}

function setPlayList () {
  videos.forEach(video => {
    const videoCard = createVideoCard(video);
    playlistContainer.appendChild(videoCard);
  });
}

function createVideoCard (cardInfo) {
  const videoTitle = document.createElement('h1');
  const videoDescription = document.createElement('p');

  videoTitle.textContent = cardInfo.title;
  videoDescription.textContent = cardInfo.description;

  const infoContainer = document.createElement('article');
  infoContainer.appendChild(videoTitle);
  infoContainer.appendChild(videoDescription);

  const image = document.createElement('img');
  image.src = cardInfo.thumbnail;

  const cardContainer = document.createElement('div');
  cardContainer.classList.add("video-card");
  cardContainer.appendChild(image);
  cardContainer.appendChild(infoContainer);
  return cardContainer;
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
  media.currentTime = progressVideoValue;
}

function takeSnapshot () {
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 450;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(media, 0, 0, canvas.width, canvas.height);
  const dataURI = canvas.toDataURL('image/png');
  window.open(dataURI, '_blank')
}
