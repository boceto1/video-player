const videoContainer = document.querySelector('.video-container');
const media = document.querySelector('video');
const videoTitle = document.querySelector('#video-player > h1');
const mp4VideoFile = document.querySelector('#mp4File');
const webMVideoFile = document.querySelector('#webmFile');
const playlistContainer = document.querySelector('.video-list');


const playButton = document.querySelector('#play-stop');
const muteButton = document.querySelector('#mute-button');
const volumeSlider = document.querySelector('#volume-slider');
const fullScreenButton = document.querySelector('#fullscreen-button');
const progressSlider = document.querySelector('#progress-slider');
const snapshotButton = document.querySelector('#snapshot-button');
const nextVideoButton = document.querySelector('#next-button');
const previousVideoButton = document.querySelector('#previous-button');
const subtitles = document.querySelectorAll('track');

initializePlayer();

const videos = [
  {
    id: 0,
    title: 'React Global Summit 2022 (Jean Karlo Obando)',
    description: 'Video de presentación para React Global Summit 2022',
    mp4File: './public/videos/video0.mp4',
    webMFile: './public/videos/video0.webm',
    thumbnail: './public/images/video0.png',
    subtitles: {
      es: './public/subtitles/es/video0.es.vtt',
      en: './public/subtitles/en/video0.en.vtt'
    }
  },
  {
    id: 1,
    title: 'Discurso "Fail Big" por Denzel Washinton ',
    description: 'Denzel Washinton presenta discurso sobre arriesgarse en una graduación',
    mp4File: './public/videos/video1.mp4',
    webMFile: './public/videos/video1.webm',
    thumbnail: './public/images/video1.png',
    subtitles: {
      es: './public/subtitles/es/video1.es.vtt',
      en: './public/subtitles/en/video1.en.vtt'
    }
  },
  {
    id: 2,
    title: '¿Cómo estás utilizando tu tiempo?',
    description: 'Video motivacional acerca del uso correcto del tiempo',
    mp4File: './public/videos/video2.mp4',
    webMFile: './public/videos/video2.webm',
    thumbnail: './public/images/video2.png',
    subtitles: {
      es: './public/subtitles/es/video2.es.vtt',
      en: './public/subtitles/en/video2.en.vtt'
    }
  },
  {
    id: 3,
    title: 'En busca del destino (Escena pintura)',
    description: 'Conversación entre Sean y Will acerca de una pintura',
    mp4File: './public/videos/video3.mp4',
    webMFile: './public/videos/video3.webm',
    thumbnail: './public/images/video3.png',
    subtitles: {
      es: './public/subtitles/es/video3.es.vtt',
      en: './public/subtitles/en/video3.en.vtt'
    }
  },
  {
    id: 4,
    title: 'En busca del destino (Escena primer encuentro)',
    description: 'Primer encuentro entre Sean y Will donde conversan de libros',
    mp4File: './public/videos/video4.mp4',
    webMFile: './public/videos/video4.webm',
    thumbnail: './public/images/video4.png',
    subtitles: {
      es: './public/subtitles/es/video4.es.vtt',
      en: './public/subtitles/en/video4.en.vtt'
    }
  },
  {
    id: 5,
    title: '¿Cómo estás viviendo tu vida?',
    description: 'Video motivacional acerca del valor de enfrentar la vida con optimismo',
    mp4File: './public/videos/video5.mp4',
    webMFile: './public/videos/video5.webm',
    thumbnail: './public/images/video5.png',
    subtitles: {
      es: './public/subtitles/es/video5.es.vtt',
      en: './public/subtitles/en/video5.en.vtt'
    }
  },
];

let currentVideo = videos[1];

function initializePlayer() {
  playButton.addEventListener('click', playPausePlayer);
  muteButton.addEventListener('click', muteUnmutePlayer);
  volumeSlider.addEventListener('change', setVolume);
  fullScreenButton.addEventListener('click', setUnsetFullScreen);
  progressSlider.addEventListener('change', setProgress);
  snapshotButton.addEventListener('click', takeSnapshot);
  nextVideoButton.addEventListener('click', setNextVideo);
  previousVideoButton.addEventListener('click', setPreviousVideo);

  media.addEventListener('ended', () => playButton.textContent = "Play")
}

function setVideos() {
  setCurrentVideo(currentVideo);
  setPlayList();
}

function setCurrentVideo (videoInfo, isAutoPlay = false) {
  videoTitle.textContent = videoInfo.title;
  mp4VideoFile.src = videoInfo.mp4File;
  webMVideoFile.src = videoInfo.webMFile;
  media.load();
  
  currentVideo = videoInfo;
  setSubtitles(currentVideo.subtitles);

  if (isAutoPlay) {
    playVideo()
    
  } else {
    playButton.textContent = "Play";
  }
  
}

function setSubtitles (videoSubtitles) {
  const [esSubtitle, enSubtitle] = subtitles;
  esSubtitle.src = videoSubtitles.es;
  enSubtitle.src = videoSubtitles.en;
  media.textTracks[0].mode = "showing";
  media.textTracks[1].mode = "showing"
}

function setNextVideo() {
  const nextVideoIndex =
    currentVideo.id === videos.length - 1 ? 0 : currentVideo.id + 1;
  
  const nextVideo = videos[nextVideoIndex];
  setCurrentVideo(nextVideo, true);
}

function setPreviousVideo() {
  const previousVideoIndex =
    currentVideo.id === 0 ? videos.length - 1 : currentVideo.id - 1;
  
  const previousVideo = videos[previousVideoIndex];
  setCurrentVideo(previousVideo, true);
}

function setPlayList () {
  videos.forEach((video, index) => {
    const videoCard = createVideoCard(video, index);
    playlistContainer.appendChild(videoCard);
  });
}

function createVideoCard (cardInfo, index) {
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

  cardContainer.id = index;
  cardContainer.addEventListener('click', () => selectVideo(index));
  return cardContainer;
}

function selectVideo(videoIndex) {
  const nextVideo = videos[videoIndex];
  setCurrentVideo(nextVideo, true);
}

function playVideo() {
  playButton.textContent = "Stop";
  media.play();
  progressLoop();
}

function playPausePlayer() {
  if (media.paused) {
    playVideo();
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
