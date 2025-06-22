
function toggleMusic() {
  const isPaused = AUDIO_STARTSCREEN.paused;
  isPaused ? AUDIO_STARTSCREEN.play() : AUDIO_STARTSCREEN.pause();
  setMusicIcon(!isPaused);
}

/**
 * Aktualisiert das Icon basierend auf dem Musikstatus.
 * @param {boolean} isPlaying - true = Musik läuft, false = pausiert
 */
function setMusicIcon(isPlaying) {
  const icon = document.getElementById("music-toggle-icon");
  if (!icon) return;
  icon.src = isPlaying ? "assets/icons/mute.svg" : "assets/icons/unmute.svg";
}

/**
 * Stoppt die Startscreen-Musik und spielt die Level-Musik.
 * Sollte beim Start des Spiels aufgerufen werden.
 * @param {Level} level - Die aktuelle Level-Instanz mit Audio-Objekten
 */
function playGameMusic(level) {
  if (!level) return;

  level.AUDIO_STARTSCREEN.pause();
  level.AUDIO_STARTGAME.currentTime = 0;
  level.AUDIO_STARTGAME.play();
  level.AUDIO_STARTGAME.loop = true;
  level.AUDIO_STARTGAME.volume = 0.1;
}




  /**
   * Initializes the music controls for the application.
   * 
   * This function sets up event listeners for music playback and control:
   * - Plays music on the first click anywhere on the document.
   * - Toggles music playback when the "music-toggle" button is clicked.
   * - Skips to the next track when the "skip-track" button is clicked.
   * - Automatically plays the next track when the current track ends.
   * 
   * Dependencies:
   * - Requires an `AUDIO_backgroundMusic` object to handle audio playback.
   */
  function setupMusicControls() {
    document.addEventListener("click", playMusic, { once: true });
    document.getElementById("music-toggle").addEventListener("click", () => playMusic());
    document.getElementById("skip-track").addEventListener("click", () => playMusic(true));
    AUDIO_backgroundMusic.addEventListener("ended", nextTrack);
  }
  
  /**
   * Advances to the next track in the playlist and starts playing it.
   * Updates the `AUDIO_backgroundMusic` source to the next track in the `soundtracks` array.
   * Loops back to the first track if the end of the playlist is reached.
   */
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % soundtracks.length;
    AUDIO_backgroundMusic.src = soundtracks[currentTrackIndex];
    AUDIO_backgroundMusic.play();
  }