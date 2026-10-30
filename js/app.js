// Bol Urdu - Application Controller

(function () {
  // Current App State
  const state = {
    currentSong: null,
    currentLineIndex: -1,
    currentMode: "translate", // "translate" | "fill" | "karaoke"
    autoPause: false,
    revealedTranslation: false,
    hasAutoPausedForLine: false,
    score: 0,
    solvedLines: new Set()
  };

  let player = null;

  // DOM Elements
  const el = {
    playerContainer: document.getElementById("yt-player"),
    activeCard: document.getElementById("active-card"),
    activeModeTag: document.getElementById("active-mode-tag"),
    activeSinger: document.getElementById("active-singer"),
    activeRomanText: document.getElementById("active-roman-text"),
    activeUrduScript: document.getElementById("active-urdu-script"),
    interactiveArea: document.getElementById("interactive-area"),
    vocabSection: document.getElementById("vocab-section"),
    vocabChips: document.getElementById("vocab-chips"),
    lyricsList: document.getElementById("lyrics-list"),
    songTitle: document.getElementById("song-title"),
    songMeta: document.getElementById("song-meta"),
    scoreBadge: document.getElementById("score-badge"),
    btnPlayPause: document.getElementById("btn-play-pause"),
    btnPrevLine: document.getElementById("btn-prev-line"),
    btnNextLine: document.getElementById("btn-next-line"),
    btnReplayLine: document.getElementById("btn-replay-line"),
    toggleAutoPause: document.getElementById("toggle-autopause"),
    speedSelect: document.getElementById("speed-select"),
    modeButtons: document.querySelectorAll(".mode-btn")
  };

  // Initialize Application
  function initApp() {
    if (!window.SONGS || window.SONGS.length === 0) {
      console.error("No songs found in data.js");
      return;
    }

    state.currentSong = window.SONGS[0]; // Default to Pasoori
    renderSongMetadata();
    renderLyricsTimeline();
    setupEventListeners();

    // Initialize YouTube Controller
    player = new YouTubeController("yt-player", {
      onReady: () => {
        console.log("YouTube Player is ready");
      },
      onStateChange: (playerState) => {
        handlePlayerStateChange(playerState);
      },
      onTimeUpdate: (currentTime) => {
        handleTimeUpdate(currentTime);
      }
    });

    player.init(state.currentSong.youtubeId);
  }

  // Render song details in header
  function renderSongMetadata() {
    el.songTitle.textContent = state.currentSong.title;
    el.songMeta.textContent = `${state.currentSong.artist} • ${state.currentSong.album}`;
  }

  // Render full lyrics in right-hand column
  function renderLyricsTimeline() {
    el.lyricsList.innerHTML = "";
    state.currentSong.lines.forEach((line, index) => {
      const item = document.createElement("div");
      item.className = "lyric-item";
      item.dataset.index = index;

      const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
      };

      item.innerHTML = `
        <div class="lyric-item-header">
          <span class="timestamp-pill">${formatTime(line.start)} - ${formatTime(line.end)}</span>
          <span class="timestamp-pill">${line.singer || ""}</span>
        </div>
        <div class="lyric-roman-text">${line.roman}</div>
        <div class="lyric-eng-text">${line.english}</div>
      `;

      item.addEventListener("click", () => {
        seekToLine(index);
      });

      el.lyricsList.appendChild(item);
    });
  }

  // Handle periodic time update from YouTube API
  function handleTimeUpdate(currentTime) {
    const lines = state.currentSong.lines;

    // Check if we are before first line (Intro)
    if (currentTime < lines[0].start) {
      if (state.currentLineIndex !== -1) {
        state.currentLineIndex = -1;
        renderIntroState();
      }
      return;
    }

    // Find active line matching current playback time
    let activeIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (currentTime >= lines[i].start && currentTime < lines[i].end) {
        activeIndex = i;
        break;
      }
    }

    // If currentTime falls slightly between lines, keep previous or nearest line
    if (activeIndex === -1 && state.currentLineIndex !== -1) {
      const current = lines[state.currentLineIndex];
      if (currentTime >= current.start && currentTime <= current.end + 0.5) {
        activeIndex = state.currentLineIndex;
      }
    }

    // Line transition
    if (activeIndex !== -1 && activeIndex !== state.currentLineIndex) {
      state.currentLineIndex = activeIndex;
      state.revealedTranslation = (state.currentMode === "karaoke");
      state.hasAutoPausedForLine = false;
      renderActiveCard();
      highlightTimelineItem(activeIndex);
    }

    // Auto-pause check: when near end of line
    if (state.autoPause && activeIndex !== -1 && !state.hasAutoPausedForLine) {
      const current = lines[activeIndex];
      if (currentTime >= current.end - 0.35) {
        state.hasAutoPausedForLine = true;
        player.pause();
      }
    }
  }

  // Render when player is in intro/instrumental
  function renderIntroState() {
    el.activeCardTag.textContent = "🎵 INSTRUMENTAL INTRO";
    el.activeSinger.textContent = state.currentSong.artist;
    el.activeRomanText.textContent = "Music playing... Vocals begin soon!";
    el.activeUrduScript.textContent = "";
    el.interactiveArea.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 1rem;">
        Get ready to read & translate Romanized Urdu
      </div>
    `;
    el.vocabSection.style.display = "none";
  }

  // Render main active card according to mode
  function renderActiveCard() {
    if (state.currentLineIndex < 0 || state.currentLineIndex >= state.currentSong.lines.length) return;

    const line = state.currentSong.lines[state.currentLineIndex];

    el.activeSinger.textContent = line.singer || state.currentSong.artist;
    el.activeUrduScript.textContent = line.urduScript || "";

    if (state.currentMode === "translate") {
      renderTranslateMode(line);
    } else if (state.currentMode === "fill") {
      renderFillMode(line);
    } else if (state.currentMode === "karaoke") {
      renderKaraokeMode(line);
    }

    renderVocabulary(line.vocab);
  }

  // Mode 1: Read & Translate Mode
  function renderTranslateMode(line) {
    el.activeCardTag.textContent = "📖 READ & TRANSLATE";
    el.activeRomanText.textContent = line.roman;

    if (state.revealedTranslation) {
      el.interactiveArea.innerHTML = `
        <div class="translation-revealed-text">
          <strong>English:</strong> ${line.english}
        </div>
      `;
    } else {
      el.interactiveArea.innerHTML = `
        <div class="translation-hidden-prompt" id="btn-reveal-translation" role="button" tabindex="0">
          <div class="prompt-title">👁 Reveal English Translation</div>
          <div class="prompt-hint">Read the Romanized Urdu above, translate in your mind, then click or press Space</div>
        </div>
      `;

      const revealBtn = document.getElementById("btn-reveal-translation");
      if (revealBtn) {
        revealBtn.addEventListener("click", () => {
          state.revealedTranslation = true;
          renderTranslateMode(line);
        });
      }
    }
  }

  // Mode 2: Fill in the Blank Mode
  function renderFillMode(line) {
    el.activeCardTag.textContent = "✍️ FILL IN THE BLANK";

    const targetWord = (line.blankWord || "").toLowerCase();
    const isSolved = state.solvedLines.has(line.id);

    // Replace the blank word in Roman text with input or solved word
    const words = line.roman.split(/\s+/);
    const romanHtml = words.map(w => {
      const cleanWord = w.replace(/[.,?!]/g, "").toLowerCase();
      if (cleanWord === targetWord) {
        if (isSolved) {
          return `<span style="color: var(--success); font-weight: 800; text-decoration: underline;">${w}</span>`;
        } else {
          return `<span class="blank-input-wrapper"><input type="text" id="blank-input" class="blank-input" placeholder="____" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" /></span>`;
        }
      }
      return w;
    }).join(" ");

    el.activeRomanText.innerHTML = romanHtml;

    el.interactiveArea.innerHTML = `
      <div class="translation-revealed-text" style="margin-bottom: 0.75rem;">
        <strong>Translation Hint:</strong> ${line.english}
      </div>
      <div class="blank-actions-bar">
        <div class="quiz-feedback" id="quiz-feedback">
          ${isSolved ? "✨ Correctly solved!" : "Type the missing Romanized Urdu word"}
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button id="btn-hint" class="control-btn" ${isSolved ? "disabled" : ""}>💡 Hint</button>
          <button id="btn-give-up" class="control-btn" ${isSolved ? "disabled" : ""}>Reveal</button>
          <button id="btn-check-blank" class="control-btn primary" ${isSolved ? "disabled" : ""}>Check ↵</button>
        </div>
      </div>
    `;

    const input = document.getElementById("blank-input");
    const feedback = document.getElementById("quiz-feedback");
    const checkBtn = document.getElementById("btn-check-blank");
    const hintBtn = document.getElementById("btn-hint");
    const giveUpBtn = document.getElementById("btn-give-up");

    if (input) {
      input.focus();
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          validateAnswer();
        }
      });
    }

    if (checkBtn) {
      checkBtn.addEventListener("click", validateAnswer);
    }

    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        if (input && targetWord) {
          input.value = targetWord.slice(0, 2);
          feedback.textContent = `💡 Hint: starts with "${targetWord.slice(0, 2)}"`;
          feedback.className = "quiz-feedback hint";
          input.focus();
        }
      });
    }

    if (giveUpBtn) {
      giveUpBtn.addEventListener("click", () => {
        if (input) {
          input.value = targetWord;
          state.solvedLines.add(line.id);
          feedback.textContent = `Word revealed: ${targetWord}`;
          feedback.className = "quiz-feedback hint";
          setTimeout(() => renderFillMode(line), 900);
        }
      });
    }

    function validateAnswer() {
      if (!input) return;
      const val = input.value.trim().toLowerCase();
      if (!val) return;

      if (val === targetWord) {
        input.classList.remove("incorrect");
        input.classList.add("correct");
        feedback.textContent = "🎉 Shabash! Correct spelling!";
        feedback.className = "quiz-feedback success";
        state.solvedLines.add(line.id);
        state.score += 10;
        updateScoreBadge();

        setTimeout(() => {
          renderFillMode(line);
          // If auto-pause was active, user can resume
          if (state.autoPause) {
            player.play();
          }
        }, 800);
      } else {
        input.classList.add("incorrect");
        feedback.textContent = "❌ Not quite right. Try again!";
        feedback.className = "quiz-feedback error";
        setTimeout(() => input.classList.remove("incorrect"), 500);
      }
    }
  }

  // Mode 3: Synced Lyrics (Karaoke) Mode
  function renderKaraokeMode(line) {
    el.activeCardTag.textContent = "🎵 SYNCED LYRICS";
    el.activeRomanText.textContent = line.roman;
    el.interactiveArea.innerHTML = `
      <div class="translation-revealed-text">
        <strong>English:</strong> ${line.english}
      </div>
    `;
  }

  // Render vocabulary pill chips
  function renderVocabulary(vocabList) {
    if (!vocabList || vocabList.length === 0) {
      el.vocabSection.style.display = "none";
      return;
    }
    el.vocabChips.innerHTML = "";
    vocabList.forEach(item => {
      const chip = document.createElement("div");
      chip.className = "vocab-chip";
      chip.innerHTML = `
        <span class="vocab-chip-word">${item.word}</span>
        <span class="vocab-chip-meaning">→ ${item.meaning}</span>
      `;
      el.vocabChips.appendChild(chip);
    });
    el.vocabSection.style.display = "block";
  }

  // Highlight active row in timeline and auto-scroll
  function highlightTimelineItem(index) {
    const items = el.lyricsList.querySelectorAll(".lyric-item");
    items.forEach(it => it.classList.remove("active"));

    const activeItem = el.lyricsList.querySelector(`.lyric-item[data-index="${index}"]`);
    if (activeItem) {
      activeItem.classList.add("active");
      activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Jump player to line
  function seekToLine(index) {
    const line = state.currentSong.lines[index];
    if (line) {
      state.currentLineIndex = index;
      state.revealedTranslation = (state.currentMode === "karaoke");
      state.hasAutoPausedForLine = false;
      player.seekTo(line.start);
      player.play();
      renderActiveCard();
      highlightTimelineItem(index);
    }
  }

  function updateScoreBadge() {
    el.scoreBadge.style.display = "inline-block";
    el.scoreBadge.textContent = `Score: ${state.score}`;
  }

  // Player state listener for Play/Pause button synchronization
  function handlePlayerStateChange(playerState) {
    if (playerState === 1) { // Playing
      el.btnPlayPause.textContent = "⏸ Pause";
      el.btnPlayPause.classList.add("primary");
    } else {
      el.btnPlayPause.textContent = "▶ Play";
    }
  }

  // Event Listeners setup
  function setupEventListeners() {
    // Mode Switcher buttons
    el.modeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        el.modeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.currentMode = btn.dataset.mode;
        
        if (state.currentMode === "fill") {
          el.scoreBadge.style.display = "inline-block";
        } else if (state.score === 0) {
          el.scoreBadge.style.display = "none";
        }

        renderActiveCard();
      });
    });

    // Play / Pause button
    el.btnPlayPause.addEventListener("click", () => {
      player.togglePlay();
    });

    // Replay Line button
    el.btnReplayLine.addEventListener("click", () => {
      if (state.currentLineIndex >= 0) {
        seekToLine(state.currentLineIndex);
      } else {
        player.seekTo(0);
        player.play();
      }
    });

    // Previous Line button
    el.btnPrevLine.addEventListener("click", () => {
      const prevIdx = Math.max(0, state.currentLineIndex - 1);
      seekToLine(prevIdx);
    });

    // Next Line button
    el.btnNextLine.addEventListener("click", () => {
      const nextIdx = Math.min(state.currentSong.lines.length - 1, state.currentLineIndex + 1);
      seekToLine(nextIdx);
    });

    // Auto Pause toggle
    el.toggleAutoPause.addEventListener("change", (e) => {
      state.autoPause = e.target.checked;
    });

    // Speed selector
    el.speedSelect.addEventListener("change", (e) => {
      const speed = parseFloat(e.target.value);
      player.setSpeed(speed);
    });

    // Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      // Ignore if user is currently typing in an input
      const activeTagName = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (activeTagName === "input" || activeTagName === "textarea") {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        // In Translate mode, if translation isn't revealed yet, reveal it!
        if (state.currentMode === "translate" && !state.revealedTranslation && state.currentLineIndex >= 0) {
          state.revealedTranslation = true;
          renderActiveCard();
        } else {
          player.togglePlay();
        }
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        const prevIdx = Math.max(0, state.currentLineIndex - 1);
        seekToLine(prevIdx);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        const nextIdx = Math.min(state.currentSong.lines.length - 1, state.currentLineIndex + 1);
        seekToLine(nextIdx);
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        if (state.currentLineIndex >= 0) {
          seekToLine(state.currentLineIndex);
        }
      }
    });
  }

  // Start app on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
