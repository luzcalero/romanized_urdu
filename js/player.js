// YouTube IFrame API Controller
// Handles iframe initialization, playback control, time updates, and seeking.

class YouTubeController {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.player = null;
    this.isReady = false;
    this.isPlaying = false;
    this.pollInterval = null;
    this.onTimeUpdate = options.onTimeUpdate || (() => {});
    this.onStateChange = options.onStateChange || (() => {});
    this.onReadyCallback = options.onReady || (() => {});
  }

  init(videoId) {
    this.videoId = videoId;
    if (window.YT && window.YT.Player) {
      this.createPlayer();
    } else {
      // Load YouTube IFrame API script dynamically if not already loaded
      window.onYouTubeIframeAPIReady = () => this.createPlayer();
      if (!document.getElementById("yt-api-script")) {
        const tag = document.createElement("script");
        tag.id = "yt-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }
  }

  createPlayer() {
    this.player = new YT.Player(this.containerId, {
      videoId: this.videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        fs: 1
      },
      events: {
        onReady: (event) => this.handleReady(event),
        onStateChange: (event) => this.handleStateChange(event)
      }
    });
  }

  handleReady(event) {
    this.isReady = true;
    this.onReadyCallback(event);
  }

  handleStateChange(event) {
    // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    if (event.data === YT.PlayerState.PLAYING) {
      this.isPlaying = true;
      this.startTimePolling();
    } else {
      this.isPlaying = false;
      this.stopTimePolling();
    }
    this.onStateChange(event.data);
  }

  startTimePolling() {
    this.stopTimePolling();
    this.pollInterval = setInterval(() => {
      if (this.player && this.player.getCurrentTime) {
        const currentTime = this.player.getCurrentTime();
        this.onTimeUpdate(currentTime);
      }
    }, 100);
  }

  stopTimePolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  play() {
    if (this.player && this.player.playVideo) {
      this.player.playVideo();
    }
  }

  pause() {
    if (this.player && this.player.pauseVideo) {
      this.player.pauseVideo();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seekTo(seconds) {
    if (this.player && this.player.seekTo) {
      this.player.seekTo(Math.max(0, seconds), true);
    }
  }

  setSpeed(speed) {
    if (this.player && this.player.setPlaybackRate) {
      this.player.setPlaybackRate(speed);
    }
  }

  getCurrentTime() {
    if (this.player && this.player.getCurrentTime) {
      return this.player.getCurrentTime();
    }
    return 0;
  }
}

if (typeof window !== "undefined") {
  window.YouTubeController = YouTubeController;
}
