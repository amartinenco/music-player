const image = document.querySelector('img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playButton = document.getElementById('play');
const music = document.querySelector('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');


const songs = [
    {
        name: 'bensound-anewbeginning',
        displayName: 'A New Beginning',
        artist: 'www.bensound.com',
        albumImage: 'anewbeginning'
    },
    {
        name: 'bensound-creativeminds',
        displayName: 'Creative Minds',
        artist: 'www.bensound.com',
        albumImage: 'creativeminds'
    },
    {
        name: 'bensound-jazzyfrenchy',
        displayName: 'Jazzy Frenchy',
        artist: 'www.bensound.com',
        albumImage: 'jazzyfrenchy'
    },
];

let currentSongIndex = 0;
let isPlaying = false;
let isReady = false;

function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

function loadSong(song) {
    image.src = `img/${song.albumImage}.jpg`;
    music.src = `music/${song.name}.mp3`;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
}

function previousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgressBar(currentTime, duration) {    
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    const songProgress = (currentTime * 100) / duration;
    progress.style.width = `${songProgress}%`; 

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    currentTimeElement.textContent = `${minutes}:${seconds}`;
}

function updateProgress(event) {
    if (isPlaying) {
        const { currentTime, duration } = event.srcElement;
        updateProgressBar(currentTime, duration);
    }
}

function setProgressBar(event) {
    const { duration } = music;
    music.currentTime = (duration * event.offsetX) / this.clientWidth;
    updateProgressBar(music.currentTime, duration);
}

music.addEventListener('loadedmetadata', () => {
    const durationMinutes = Math.floor(music.duration / 60); 
    let durationSeconds = Math.floor(music.duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    
    durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
});

prevButton.addEventListener('click', previousSong);
nextButton.addEventListener('click', nextSong);
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgressBar);

loadSong(songs[currentSongIndex]);