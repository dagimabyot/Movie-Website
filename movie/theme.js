// Theme switching functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// YouTube API integration
let player;
window.onYouTubeIframeAPIReady = function() {
    console.log('YouTube API Ready');
};

async function playTrailer(movieTitle, container) {
    try {
        // Search for movie trailer on YouTube
        const searchQuery = `${movieTitle} official trailer`;
        const videoId = await searchYouTubeTrailer(searchQuery);
        
        if (videoId) {
            if (player) {
                player.destroy();
            }
            
            player = new YT.Player(container, {
                height: '390',
                width: '640',
                videoId: videoId,
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'rel': 0
                }
            });
        } else {
            container.innerHTML = '<p>Trailer not found</p>';
        }
    } catch (error) {
        console.error('Error playing trailer:', error);
        container.innerHTML = '<p>Error loading trailer</p>';
    }
}

async function searchYouTubeTrailer(query) {
    // Replace with your YouTube API key
    const API_KEY = 'YOUR_YOUTUBE_API_KEY';
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${API_KEY}&type=video&maxResults=1`);
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId;
    }
    return null;
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Create modal for video player
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div id="video-container"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Handle trailer button clicks
    const trailerButtons = document.querySelectorAll('.watch a');
    trailerButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const movieTitle = this.closest('.black').querySelector('h1').textContent;
            
            // Show modal
            modal.style.display = 'block';
            const videoContainer = modal.querySelector('#video-container');
            
            // Play trailer from YouTube
            await playTrailer(movieTitle, videoContainer);
        });
    });

    // Handle play button clicks
    const playButtons = document.querySelectorAll('.watch i.fa-play');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const movieCard = this.closest('.card');
            const movieTitle = movieCard.querySelector('.name').textContent;
            
            // Show modal with video player
            modal.style.display = 'block';
            const videoContainer = modal.querySelector('#video-container');
            
            // Initialize video player with movie content
            playMovie(movieTitle, videoContainer);
        });
    });

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

function closeModal() {
    const modal = document.querySelector('.video-modal');
    const videoContainer = modal.querySelector('#video-container');
    
    modal.style.display = 'none';
    if (player) {
        player.destroy();
    }
    videoContainer.innerHTML = '';
}

function playMovie(movieTitle, container) {
    // Replace this with your actual video player implementation
    const videoUrl = getVideoUrl(movieTitle);
    container.innerHTML = `
        <video controls autoplay style="width: 100%">
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
}

function getVideoUrl(movieTitle) {
    // Replace this with your actual video URL mapping
    return 'path/to/your/videos/' + movieTitle.toLowerCase().replace(/\s+/g, '-') + '.mp4';
} 