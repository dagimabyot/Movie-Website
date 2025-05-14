class MoviePlayer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.player = null;
        this.isFullscreen = false;
    }

    createPlayer(videoUrl, posterUrl) {
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create video element
        this.player = document.createElement('video');
        this.player.className = 'movie-player';
        this.player.controls = true;
        this.player.poster = posterUrl || '';
        
        // Add source
        const source = document.createElement('source');
        source.src = videoUrl;
        source.type = 'video/mp4';
        this.player.appendChild(source);
        
        // Create player controls wrapper
        const controlsWrapper = document.createElement('div');
        controlsWrapper.className = 'custom-controls';
        
        // Add custom controls
        const playButton = document.createElement('button');
        playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        playButton.onclick = () => this.togglePlay();
        
        const fullscreenButton = document.createElement('button');
        fullscreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>';
        fullscreenButton.onclick = () => this.toggleFullscreen();
        
        const volumeControl = document.createElement('input');
        volumeControl.type = 'range';
        volumeControl.min = 0;
        volumeControl.max = 1;
        volumeControl.step = 0.1;
        volumeControl.value = 1;
        volumeControl.onchange = (e) => this.setVolume(e.target.value);
        
        controlsWrapper.appendChild(playButton);
        controlsWrapper.appendChild(volumeControl);
        controlsWrapper.appendChild(fullscreenButton);
        
        // Add elements to container
        this.container.appendChild(this.player);
        this.container.appendChild(controlsWrapper);
        
        // Add event listeners
        this.player.addEventListener('play', () => {
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        });
        
        this.player.addEventListener('pause', () => {
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        });
    }
    
    togglePlay() {
        if (this.player.paused) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }
    
    setVolume(value) {
        this.player.volume = value;
    }
    
    toggleFullscreen() {
        if (!this.isFullscreen) {
            if (this.container.requestFullscreen) {
                this.container.requestFullscreen();
            } else if (this.container.webkitRequestFullscreen) {
                this.container.webkitRequestFullscreen();
            } else if (this.container.msRequestFullscreen) {
                this.container.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        this.isFullscreen = !this.isFullscreen;
    }
}

// Initialize player when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.moviePlayer = new MoviePlayer('movie-player-container');
});