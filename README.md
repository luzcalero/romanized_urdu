# Bol Urdu (بول اردو) 🎵 📖

> Learn Romanized Urdu through South Asian music, synchronized line-by-line with YouTube.

**Bol Urdu** is a client-side web application designed to accelerate Urdu language acquisition for English speakers and heritage learners. By synchronizing Romanized Urdu lyrics with YouTube videos, learners can read phonetic lyrics, test their comprehension against line-by-line English translations, and practice spelling with fill-in-the-blank cloze tests.

---

## ✨ Key Features

1. **📖 Read & Translate Mode (Active Comprehension)**
   - Displays prominent Romanized Urdu lyrics synchronized in real-time.
   - Lets you read and guess the English meaning in your mind before clicking (or pressing `Space`) to reveal the verified English translation.
   - Includes vocabulary chips breaking down root words and individual definitions.

2. **✍️ Fill-in-the-Blank Mode (Active Recall & Spelling)**
   - Tests spelling and vocabulary retention by masking target Romanized words (`[ ____ ]`).
   - Case-insensitive answer validation with instant visual feedback and score tracking.
   - Built-in "💡 Hint" (reveals initial letters) and "Reveal" fallbacks.

3. **🎵 Synced Lyrics (Karaoke Stream)**
   - Seamless, uninterrupted listening mode with simultaneous dual-subtitles (Romanized Urdu + English translation) and automatic scroll highlighting.

4. **⏸ Smart Auto-Pause**
   - Toggle **"Auto-pause line"** to automatically halt playback at the end of each lyric segment, giving you all the time you need to study, translate, or type before proceeding.

5. **⚡ Practice Tools**
   - **Playback Rate Adjustment:** Slow down vocals (0.75x, 0.9x, 1.0x, 1.25x) to catch rapid pronunciations.
   - **Interactive Timeline:** Click any line in the right-hand lyrics panel to seek directly to that exact moment.
   - **Keyboard Navigation:**
     - `Space`: Play/Pause OR Reveal English translation in Translate Mode
     - `R`: Replay current line from start
     - `Left Arrow` / `Right Arrow`: Jump to previous / next line
     - `Enter`: Submit answer in Fill-in-the-Blank mode

---

## 🚀 Live Demo & Deployment

**Live Web App:** [https://luzcalero.github.io/romanized_urdu/](https://luzcalero.github.io/romanized_urdu/)

This project is built with vanilla HTML5, CSS3, and modern JavaScript with **zero build dependencies**. It is hosted 100% free on **GitHub Pages**.

### Enable GitHub Pages
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch: `main` and folder: `/ (root)`.
4. Click **Save**. Your site will be live at:
   `https://<username>.github.io/<repo-name>/`

---

## 💻 Local Development

No Node.js or build steps required. Simply serve the directory with any local static server:

```bash
# Using Python
python3 -m http.server 8000

# Or using npx
npx serve .
```

Then visit `http://localhost:8000` in your web browser.

---

## 🎶 Adding More Songs

Songs are defined in `js/data.js` using a clean structure:

```javascript
{
  id: "song-id",
  title: "Song Title",
  artist: "Artist Name",
  album: "Album / Season",
  youtubeId: "VIDEO_ID_HERE",
  lines: [
    {
      id: 0,
      start: 24.5, // Start timestamp in seconds
      end: 28.0,   // End timestamp in seconds
      roman: "Agg lavan majboori nu",
      english: "Set fire to all compulsions and helplessness",
      urduScript: "اگ لاواں مجبوری نوں", // Optional Nastaliq script
      blankWord: "majboori",             // Word for Fill-in-the-Blank mode
      vocab: [
        { word: "Agg", meaning: "Fire" },
        { word: "Majboori", meaning: "Compulsion" }
      ]
    }
  ]
}
```

---

## 🛠 Tech Stack

- **Frontend:** Semantic HTML5, Custom Responsive CSS (Glassmorphism, Dark UI, CSS Variables).
- **Logic:** Vanilla ES6+ JavaScript.
- **Media Engine:** Official YouTube IFrame Player API.
- **Fonts:** Inter (UI) & Noto Nastaliq Urdu (Urdu script).
