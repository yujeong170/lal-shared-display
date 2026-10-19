
"use strict";

// ========================================
// 1. BASIC SETTINGS
// ========================================

const app = document.getElementById("app");

const ROOMS = [
  { id: "balcony", name: "Balcony", cols: 6, rows: 4 },
  { id: "bathroom", name: "Bathroom", cols: 5, rows: 5 },
  { id: "bedroom", name: "Bedroom", cols: 8, rows: 4 },
  { id: "kitchen", name: "Kitchen", cols: 5, rows: 5 },
  { id: "living1", name: "Living Room 1", cols: 8, rows: 5 },
  { id: "living2", name: "Living Room 2", cols: 9, rows: 4 }
];

const SHAPES = [
  { id: "1x1", w: 1, h: 1, cost: 1 },
  { id: "2x1", w: 2, h: 1, cost: 2 },
  { id: "1x2", w: 1, h: 2, cost: 2 },
  { id: "3x1", w: 3, h: 1, cost: 3 },
  { id: "1x3", w: 1, h: 3, cost: 3 },
  { id: "2x2", w: 2, h: 2, cost: 4 }
];


const FURNITURE = [
  // BALCONY
  { id: "balcony-laundry", name: "Laundry", room: "balcony", shape: "2x2", file: "laundry-(2x2).png" },
  { id: "balcony-plant-1", name: "Plant 1", room: "balcony", shape: "1x1", file: "plant-1-(1x1).png" },
  { id: "balcony-plant-2", name: "Plant 2", room: "balcony", shape: "1x2", file: "plant-2-(1x2).png" },
  { id: "balcony-table-5", name: "Table 5", room: "balcony", shape: "1x2", file: "table-5-(1x2).png" },
  { id: "balcony-table-6", name: "Table 6", room: "balcony", shape: "2x2", file: "table-6-(2x2).png" },
  { id: "balcony-washing-machine", name: "Washing Machine", room: "balcony", shape: "2x2", file: "washing machine-(2x2).png" },

  // BATHROOM
  { id: "bathroom-bathtub", name: "Bathtub", room: "bathroom", shape: "2x1", file: "bathtub-(2x1).png" },
  { id: "bathroom-carpet-2", name: "Carpet 2", room: "bathroom", shape: "1x1", file: "carpet-2-(1x1).png" },
  { id: "bathroom-cosmetic", name: "Cosmetic", room: "bathroom", shape: "1x1", file: "cosmetic-(1x1).png" },
  { id: "bathroom-shower", name: "Shower", room: "bathroom", shape: "1x3", file: "shower-(1x3).png" },
  { id: "bathroom-toilet", name: "Toilet", room: "bathroom", shape: "1x2", file: "toilet-(1x2).png" },
  { id: "bathroom-towel", name: "Towel", room: "bathroom", shape: "1x1", file: "towel-(1x1).png" },
  { id: "bathroom-washbasin", name: "Washbasin", room: "bathroom", shape: "1x3", file: "washbasin-(1x3).png" },
  { id: "bathroom-window", name: "Window", room: "bathroom", shape: "2x2", file: "window-(2x2).png" },

  // BEDROOM
  { id: "bedroom-bed-1", name: "Bed 1", room: "bedroom", shape: "2x2", file: "bed-1-(2x2).png" },
  { id: "bedroom-bed-2", name: "Bed 2", room: "bedroom", shape: "2x1", file: "bed-2-(2x1).png" },
  { id: "bedroom-coat-rack", name: "Coat Rack", room: "bedroom", shape: "1x2", file: "coat rack-(1x2).png" },
  { id: "bedroom-desk", name: "Desk", room: "bedroom", shape: "2x2", file: "desk-(2x2).png" },
  { id: "bedroom-hanger-1", name: "Hanger 1", room: "bedroom", shape: "1x2", file: "hanger-1-(1x2).png" },
  { id: "bedroom-hanger-2", name: "Hanger 2", room: "bedroom", shape: "2x2", file: "hanger-2-(2x2).png" },
  { id: "bedroom-iron", name: "Iron", room: "bedroom", shape: "2x1", file: "iron-(2x1).png" },
  { id: "bedroom-lamp", name: "Lamp", room: "bedroom", shape: "1x2", file: "lamp-(1x2).png" },
  { id: "bedroom-vanity", name: "Vanity", room: "bedroom", shape: "1x2", file: "vanity-(1x2).png" },
  { id: "bedroom-window-2", name: "Window 2", room: "bedroom", shape: "1x1", file: "window-2-(1x1).png" },

  // KITCHEN
  { id: "kitchen-cabinet", name: "Cabinet", room: "kitchen", shape: "2x2", file: "cabinet-(2x2).png" },
  { id: "kitchen-cupboard", name: "Cupboard", room: "kitchen", shape: "1x2", file: "cupboard-(1x2).png" },
  { id: "kitchen-fridge-1", name: "Fridge 1", room: "kitchen", shape: "1x2", file: "fridge-1-(1x2).png" },
  { id: "kitchen-fridge-2", name: "Fridge 2", room: "kitchen", shape: "2x2", file: "fridge-2-(2x2).png" },
  { id: "kitchen-knife", name: "Knife", room: "kitchen", shape: "1x1", file: "knife-(1x1).png" },
  { id: "kitchen-oven", name: "Oven", room: "kitchen", shape: "1x2", file: "oven-(1x2).png" },
  { id: "kitchen-table-3", name: "Table 3", room: "kitchen", shape: "2x2", file: "table-3-(2x2).png" },

  // LIVING ROOM 1
  { id: "living1-bookcase", name: "Bookcase", room: "living1", shape: "2x2", file: "bookcase-(2x2).png" },
  { id: "living1-bookshelf", name: "Bookshelf", room: "living1", shape: "1x2", file: "bookshelf-(1x2).png" },
  { id: "living1-carpet", name: "Carpet", room: "living1", shape: "1x1", file: "carpet-(1x1).png" },
  { id: "living1-ceiling-light", name: "Ceiling Light", room: "living1", shape: "2x1", file: "ceiling light-(2x1).png" },
  { id: "living1-couch-2", name: "Couch 2", room: "living1", shape: "3x1", file: "couch-2-(3x1).png" },
  { id: "living1-frame", name: "Frame", room: "living1", shape: "2x2", file: "frame-(2x2).png" },
  { id: "living1-table-1", name: "Table 1", room: "living1", shape: "2x2", file: "table-1-(2x2).png" },
  { id: "living1-table-2", name: "Table 2", room: "living1", shape: "2x2", file: "table-2-(2x2).png" },
  { id: "living1-table-4", name: "Table 4", room: "living1", shape: "2x2", file: "table-4-(2x2).png" },
  { id: "living1-tv", name: "TV", room: "living1", shape: "2x2", file: "tv-(2x2).png" },
  { id: "living1-vase", name: "Vase", room: "living1", shape: "1x1", file: "vase-(1x1).png" },

  // LIVING ROOM 2
  { id: "living2-cat", name: "Cat", room: "living2", shape: "1x1", file: "cat-(1x1).png" },
  { id: "living2-ceiling-light-2", name: "Ceiling Light 2", room: "living2", shape: "1x2", file: "ceiling light-2-(1x2).png" },
  { id: "living2-couch-1", name: "Couch 1", room: "living2", shape: "2x2", file: "couch-1-(2x2).png" },
  { id: "living2-fireplace", name: "Fireplace", room: "living2", shape: "1x2", file: "fireplace-(1x2).png" },
  { id: "living2-piano", name: "Piano", room: "living2", shape: "2x2", file: "piano-(2x2).png" },
  { id: "living2-sideboard", name: "Sideboard", room: "living2", shape: "2x2", file: "sideboard-(2x2).png" },
  { id: "living2-stairs", name: "Stairs", room: "living2", shape: "2x2", file: "stairs-(2x2).png" },
  { id: "living2-table-tennis", name: "Table Tennis", room: "living2", shape: "2x2", file: "table tennis-(2x2).png" },
  { id: "living2-window-3", name: "Window 3", room: "living2", shape: "2x2", file: "window-3-(2x2).png" }
];


const ROOM_ASSET_FOLDERS = {
  balcony: "balcony",
  bathroom: "bathroom",
  bedroom: "bedroom",
  kitchen: "kitchen",
  living1: "living-room-1",
  living2: "living-room-2"
};

function furnitureImage(item) {
  const folder = ROOM_ASSET_FOLDERS[item.room];

  return (
    "../assets/" +
    folder +
    "/" +
    encodeURIComponent(item.file)
  );
}



// Change TEST_MODE to false for real 15–45 min sessions.
const TEST_MODE = true;
const TEST_FOCUS_SECONDS = 3;
const TEST_BREAK_SECONDS = 3;

const TABLES = {
  "01": "balcony",
  "02": "bathroom",
  "03": "bedroom",
  "04": "kitchen",
  "05": "living1",
  "06": "living2"
};

const params = new URLSearchParams(window.location.search);
const initialTable = params.get("table");
const joinedTable = TABLES[initialTable] ? initialTable : null;

// Browser-only prototype storage.
const STORAGE_KEY = "lal_mobile_v3";

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

const saved = readSaved();
const activeTable = joinedTable || saved.table || null;
const activeRoom = TABLES[activeTable] || null;
const isFirstVisit = !saved.hasReceivedWelcomePiece;

let state = {
  page: "home",
  room: activeRoom,
  table: activeTable,

  // One welcome piece, only on first visit.
  pieces: Number.isFinite(saved.pieces) ? saved.pieces : 1,
  points: Number.isFinite(saved.points) ? saved.points : 0,
  totalStudyMinutes: Number.isFinite(saved.totalStudyMinutes)
    ? saved.totalStudyMinutes
    : 0,

  hasTriedContribution: Boolean(saved.hasTriedContribution),
  showWelcome: isFirstVisit,

  selectedShape: null,
  selection: [],
  placements: [],
  feedback: null,
  timerMessage: null,
  earnedLastPiece: false,

occupied: Object.fromEntries(
  ROOMS.map(room => [room.id, []])
)
};

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      hasReceivedWelcomePiece: true,
      table: state.table,
      pieces: state.pieces,
      points: state.points,
      totalStudyMinutes: state.totalStudyMinutes,
      occupied: state.occupied,
      hasTriedContribution: state.hasTriedContribution
    }));
  } catch (error) {
    console.warn("Could not save progress", error);
  }
}

saveProgress();

function joinedRoom() {
  return ROOMS.find(
    room => room.id === TABLES[state.table]
  ) || null;
}

function currentRoom() {
  return ROOMS.find(room => room.id === state.room);
}

// ========================================
// 2. POMODORO TIMER
// ========================================

const timer = {
  studyMinutes: 15,
  breakMinutes: 5,
  mode: "study",
  secondsLeft: TEST_MODE ? TEST_FOCUS_SECONDS : 15 * 60,
  totalSeconds: TEST_MODE ? TEST_FOCUS_SECONDS : 15 * 60,
  running: false,
  endsAt: null,
  completionVisible: false
};

function formatTime(seconds) {
  const safe = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(safe / 60);
  const remaining = safe % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remaining).padStart(2, "0")
  );
}

function timerRemaining() {
  if (!timer.running || timer.endsAt === null) {
    return timer.secondsLeft;
  }

  return Math.max(
    0,
    Math.ceil((timer.endsAt - Date.now()) / 1000)
  );
}

function updateTimerCircle() {
  const circle = document.getElementById("timer-progress");
  if (!circle) return;

  const total = Math.max(1, timer.totalSeconds);

  const remaining =
    timer.running && timer.endsAt !== null
      ? Math.max(0, (timer.endsAt - Date.now()) / 1000)
      : timer.secondsLeft;

  const remainingRatio = Math.max(
    0,
    Math.min(1, remaining / total)
  );

  const circumference = 2 * Math.PI * 100;

  // Green ring shrinks, revealing pink underneath.
  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${
    circumference * (1 - remainingRatio)
  }`;
}

function updateTimerDisplay() {
  const time = document.getElementById("timer-time");
  const mode = document.getElementById("timer-mode");
  const button = document.getElementById("timer-button");

  if (time) {
    if (TEST_MODE) {
      const total = Math.max(1, timer.totalSeconds);

      const remaining = timer.running && timer.endsAt !== null
        ? Math.max(0, (timer.endsAt - Date.now()) / 1000)
        : timer.secondsLeft;

      const progress = Math.max(
        0,
        Math.min(1, (total - remaining) / total)
      );

      if (timer.mode === "study") {
        // Count down from the user's selected duration
        const displaySeconds = Math.ceil(
          timer.studyMinutes * 60 * (1 - progress)
        );

        time.textContent = formatTime(displaySeconds);
      } else {
        // Count down from 5 minutes
        const displaySeconds = Math.ceil(
          timer.breakMinutes * 60 * (1 - progress)
        );

        time.textContent = formatTime(displaySeconds);
      }
    } else {
      time.textContent = formatTime(timerRemaining());
    }
  }

  if (mode) {
    mode.textContent =
      timer.mode === "study" ? "Focus Time" : "Break Time";
  }

  if (button && state.page === "focus") {
    button.textContent = timer.running ? "Pause" : "Resume";
  }

  updateTimerCircle();
}

function toggleTimer() {
  if (timer.mode !== "study") return;

  if (timer.running) {
    timer.secondsLeft = timerRemaining();
    timer.running = false;
    timer.endsAt = null;
  } else {
    timer.running = true;
    timer.endsAt = Date.now() + timer.secondsLeft * 1000;
  }

  state.page = "focus";
  render();
}

function resetTimer() {
  timer.running = false;
  timer.endsAt = null;
  timer.mode = "study";

  timer.totalSeconds = TEST_MODE
    ? TEST_FOCUS_SECONDS
    : timer.studyMinutes * 60;

  timer.secondsLeft = timer.totalSeconds;
  timer.completionVisible = false;

  state.timerMessage = null;
  state.page = "home";

  render();
}

function setStudyDuration(minutes) {
  if (timer.running || timer.mode !== "study") return;

  const value = Math.max(
    15,
    Math.min(45, Math.round(minutes))
  );

  timer.studyMinutes = value;

  timer.totalSeconds = TEST_MODE
    ? TEST_FOCUS_SECONDS
    : value * 60;

  timer.secondsLeft = timer.totalSeconds;

  const label = document.getElementById("duration-label");

  if (label) {
    label.textContent = `${value} min`;
  }

  updateTimerDisplay();
}

function finishTimer() {
  const completedMode = timer.mode;

  timer.running = false;
  timer.endsAt = null;

  if (completedMode === "study") {
    state.totalStudyMinutes += timer.studyMinutes;

    const earned = state.pieces < 4;

    if (earned) {
      state.pieces += 1;
    }

    state.earnedLastPiece = earned;
    state.page = "focus-complete";

    timer.completionVisible = true;

    saveProgress();

    // Start the five-minute break automatically.

timer.mode = "break";

timer.totalSeconds = TEST_MODE
  ? TEST_BREAK_SECONDS
  : timer.breakMinutes * 60;

timer.secondsLeft = timer.totalSeconds;

    timer.running = true;
    timer.endsAt = Date.now() + timer.secondsLeft * 1000;

    state.timerMessage =
      "Focus complete! Your 5-minute break has started.";

  } else {
    timer.mode = "study";

    timer.totalSeconds = TEST_MODE
      ? TEST_FOCUS_SECONDS
      : timer.studyMinutes * 60;

    timer.secondsLeft = timer.totalSeconds;

    state.timerMessage =
      "Break complete! Ready for another focus session.";

    if (state.page === "break") {
      state.page = "home";
    }
  }

  render();
}

function tickTimer() {
  if (!timer.running) return;

  if (timerRemaining() <= 0) {
    timer.secondsLeft = 0;
    finishTimer();
    return;
  }

  updateTimerDisplay();
}

setInterval(tickTimer, 100);

// ========================================
// 3. HELPERS
// ========================================

function shapeOf(item) {
  return SHAPES.find(shape => shape.id === item.shape);
}

function reservedPieces() {
  return state.selection.reduce(
    (total, item) => total + shapeOf(item).cost,
    0
  );
}

function availablePieces() {
  return state.pieces - reservedPieces();
}

function navigate(page) {
  // Focus must be completed or ended first.
  if (state.page === "focus" && page !== "focus") return;

  state.page = page;
  render();
  window.scrollTo(0, 0);
}

function backButton(page) {
  return `
    <button class="back" data-page="${page}">
      ←
    </button>
  `;
}

function primary(label, action, disabled = false) {
  return `
    <button
      class="primary"
      data-action="${action}"
      ${disabled ? "disabled" : ""}
    >
      ${label}
    </button>
  `;
}

function progressBar(value, total) {
  const percent = total ? (value / total) * 100 : 0;

  return `
    <div class="progress">
      <div
        class="progress-fill"
        style="width:${percent}%"
      ></div>
    </div>
  `;
}

function roomProgress(room) {
  const total = room.cols * room.rows;
  const occupied = state.occupied[room.id].length;

  return `
    <p class="small">
      ${occupied} / ${total} cells occupied
      · ${total - occupied} available
    </p>
    ${progressBar(occupied, total)}
  `;
}

function pieceBalance() {
  const available = availablePieces();
  const reserved = reservedPieces();

  const icons = Array.from({ length: 4 }, (_, index) => {
    let className = "";

    if (index < available) {
      className = "available";
    } else if (index < available + reserved) {
      className = "reserved";
    }

    return `<span class="piece ${className}">✿</span>`;
  }).join("");

  return `
    <div class="center">
      <h3>Your Puzzle Pieces</h3>
      <div class="pieces">${icons}</div>
      <p class="small">
        ${available} available · ${reserved} reserved
      </p>
    </div>
  `;
}

function bottomNav() {
  return `
    <nav class="bottom-nav">
      <button data-page="home">
        <span style="font-size:22px">⌂</span>
        <span>Home</span>
      </button>
      
<button data-page="rewards">
  <span style="font-size:22px">✪</span>
  <span>Rewards</span>
</button>
    </nav>
  `;
}

function timerCircle(buttonLabel = "Start Focus", action = "toggle-timer") {
  return `
    <div class="timer-circle">
      <svg
        class="timer-ring"
        viewBox="0 0 240 240"
        aria-hidden="true"
      >
        <circle
          class="timer-track"
          cx="120"
          cy="120"
          r="100"
        ></circle>

        <circle
          id="timer-progress"
          class="timer-progress"
          cx="120"
          cy="120"
          r="100"
        ></circle>
      </svg>

      <div class="timer-content">
        <p id="timer-mode" class="small">
          ${timer.mode === "study" ? "Focus Time" : "Break Time"}
        </p>

        <div id="timer-time" class="timer-time">
          ${formatTime(timerRemaining())}
        </div>

        ${buttonLabel
          ? `<button
              id="timer-button"
              data-action="${action}"
            >${buttonLabel}</button>`
          : ""}
      </div>
    </div>
  `;
}

// ========================================
// 4. HOME
// ========================================

// ========================================
// REAL ROOM PREVIEW
// ========================================

const ROOM_BACKGROUNDS = {
  balcony: {
    file: "balcony-floor.png",
    floorOnly: true,
    wallColor: "#768E78"
  },
  bathroom: {
    file: "bathroom-floor.png",
    floorOnly: true,
    wallColor: "#B7CBDB"
  },
  bedroom: {
    file: "bedroom.png",
    floorOnly: false
  },
  kitchen: {
    file: "kitchen.png",
    floorOnly: false
  },
  living1: {
    file: "living-room-1-floor.png",
    floorOnly: true,
    wallColor: "#FFD0C4"
  },
  living2: {
    file: "living-room-2-floor.png",
    floorOnly: true,
    wallColor: "#B5A67B"
  }
};

let sharedFurnitureRecords = [];


function roomPreview(roomId) {
  const room = ROOMS.find(r => r.id === roomId);
  const background = ROOM_BACKGROUNDS[roomId];

  if (!room || !background) return "";

  // Works with both Live Server and GitHub Pages
  const backgroundUrl = new URL(
    `../assets/bg/${background.file}`,
    document.querySelector('script[src$="mobile.js"]').src
  ).href;

  // Background image
  const backgroundImage = background.floorOnly
    ? `
      <div
        style="
          position: absolute;
          inset: 0;
          background-color: ${background.wallColor};
        "
      ></div>

      <img
        src="${backgroundUrl}"
        alt=""
        style="
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 50%;
          object-fit: fill;
        "
      >
    `
    : `
      <img
        src="${backgroundUrl}"
        alt=""
        style="
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
        "
      >
    `;

  // Furniture already saved in Supabase
  const furniture = sharedFurnitureRecords
    .filter(record => record.room_id === roomId)
    .map(record => {
      const item = FURNITURE.find(
        f => f.id === record.furniture_id
      );

      if (!item || !record.cells?.length) return "";

      const shape = shapeOf(item);

      const startCol = Math.min(
        ...record.cells.map(cell => cell % room.cols)
      );

      const startRow = Math.min(
        ...record.cells.map(cell =>
          Math.floor(cell / room.cols)
        )
      );

      const imageUrl = new URL(
        furnitureImage(item),
        document.querySelector('script[src$="mobile.js"]').src
      ).href;

      return `
        <img
          class="room-preview-furniture"
          src="${imageUrl}"
          alt="${item.name}"
          style="
            position: absolute;
            left: ${(startCol / room.cols) * 100}%;
            top: ${(startRow / room.rows) * 100}%;
            width: ${(shape.w / room.cols) * 100}%;
            height: ${(shape.h / room.rows) * 100}%;
            object-fit: fill;
            z-index: 2;
          "
        >
      `;
    })
    .join("");

  return `
    <div
      class="real-room-preview"
      style="
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border-radius: 12px;
      "
    >
      ${backgroundImage}
      ${furniture}
    </div>
  `;
}

function homePage() {
  // Always use the JOINED room, not the last viewed room.
  const room = joinedRoom();

  return `
    <div class="topbar">
      <span>Shared House</span>

      <div>
      <span class="stat">✪ ${state.points}</span>
      <span class="stat">✿ ${state.pieces}/4</span>
      </div>
    </div>

    <div class="challenge">
      <div class="between">
        <div>
          <strong>Daily Challenge</strong>
          <p class="small" style="color:white">
            Study for an hour
          </p>
        </div>

        <span class="small" style="color:white">
          ${Math.min(state.totalStudyMinutes, 60)} / 60 min
        </span>
      </div>

      ${progressBar(
        Math.min(state.totalStudyMinutes, 60),
        60
      )}
    </div>

    ${!state.hasTriedContribution
      ? `
        <div class="card peach-card">
          <h3>Welcome! Try Your First Contribution ✿</h3>

          <p>
            You received 1 free Puzzle Piece when you first
            joined. Use it to place furniture, then study
            to earn more.
          </p>

          ${room
            ? primary(
                "Try Your First Contribution →",
                "try-contribution",
                state.pieces === 0
              )
            : `
              <p class="small">
                Scan the QR code on your table's
                Shared Display to join a room.
              </p>
            `}
        </div>
      `
      : ""}

    <div class="timer-settings">
      <div class="between">
        <strong>Focus Duration</strong>
        <span id="duration-label">
          ${timer.studyMinutes} min
        </span>
      </div>

      <input
        id="study-duration"
        type="range"
        min="15"
        max="45"
        step="1"
        value="${timer.studyMinutes}"
        ${timer.running || timer.mode === "break"
          ? "disabled"
          : ""}
      >

      <div class="between small">
        <span>15 min</span>
        <span>45 min</span>
      </div>
    </div>

    ${timerCircle(
      timer.mode === "break" ? "View Break" : "Start Focus",
      timer.mode === "break" ? "show-break" : "toggle-timer"
    )}

    <div class="timer-actions">
      <button
        data-action="reset-timer"
        ${timer.mode === "break" ? "disabled" : ""}
      >
        Reset
      </button>

      <span>5-minute break after each session</span>
    </div>

    <p class="small center">
      ${state.pieces === 4
        ? "Pieces full (4/4). You can still study."
        : "Complete a focus session to earn 1 Puzzle Piece."}
    </p>

    <div class="section-heading">
      <h2>Events</h2>

      <button
        class="back"
        data-page="rooms"
        style="font-size:13px"
      >
        View All →
      </button>
    </div>

    ${room
      ? `
        <div class="card peach-card">
          <span class="room-tag">
            YOUR TABLE · ${state.table}
          </span>

<div style="margin:14px 0">
  ${roomPreview(room.id)}
</div>
          <h3>${room.name}</h3>

          <p>Contribute to your shared room.</p>

          ${roomProgress(room)}

          ${primary("View Your Room →", "open-room")}
        </div>
      `
      : `
        <div class="card peach-card">
          <h3>Join a Shared Room</h3>

          <p>
            Scan the QR code on your table's Shared Display
            to join its room.
          </p>

          <p class="small">
            You can use the study timer without joining a room.
          </p>
        </div>
      `}
  `;
}

// ========================================
// 5. FOCUS MODE
// ========================================

function focusPage() {
  return `
    <div class="focus-screen">
      <p class="small center">
        FOCUS MODE · Stay focused
      </p>

      ${timerCircle(
        timer.running ? "Pause" : "Resume",
        "toggle-timer"
      )}

      <button
        class="back focus-end"
        data-action="end-session"
      >
        End Session
      </button>

      <p class="small center">
        Finish the session to earn a Puzzle Piece.
      </p>
    </div>
  `;
}

// ========================================
// 6. FOCUS COMPLETE
// ========================================

function completePage() {
  return `
    <div class="card peach-card center completion-card">
      <h1>Focus Complete!</h1>

      <h2>
        ${state.earnedLastPiece
          ? "+1 Puzzle Piece ✿"
          : "Pieces Full · 4/4"}
      </h2>

      <p>
        ${state.earnedLastPiece
          ? "Use your piece to furnish your shared room."
          : "Contribute to make space for more pieces."}
      </p>

      <p class="small">
        Your 5-minute break has already started.
      </p>

      ${joinedRoom()
        ? primary(
            "Contribute to Your Room →",
            "break-contribute",
            state.pieces === 0
          )
        : `
          <p>Scan your table QR code to join a room.</p>
        `}

      ${primary("Just Rest →", "show-break")}
    </div>
  `;
}

// ========================================
// 7. BREAK MODE
// ========================================

function breakPage() {
  return `
    <div class="card center break-card">
      <h2>Break Time</h2>

      ${timerCircle("", "")}

      <p>
        Take a rest, or contribute during your break.
      </p>

      ${joinedRoom()
        ? primary(
            "Contribute to Your Room →",
            "break-contribute",
            state.pieces === 0
          )
        : `
          <p class="small">
            Scan your table QR to contribute.
          </p>
        `}

      ${primary("Back to Home →", "go-home")}
    </div>
  `;
}

// ========================================
// 8. ALL ROOMS
// ========================================

function roomsPage() {
  return `
    ${backButton("home")}

    <h1 class="center">Shared House</h1>

    <p class="center small">
      6 rooms, built together
    </p>

    <div class="grid-two">
      ${ROOMS.map(room => `
        <button
          class="option"
          data-room="${room.id}"
        >
${roomPreview(room.id)}
          <h3>${room.name}</h3>

          ${roomProgress(room)}

          ${room.id === TABLES[state.table]
            ? '<span class="room-tag">YOUR ROOM</span>'
            : ""}
        </button>
      `).join("")}
    </div>
  `;
}

// ========================================
// 9. ROOM DETAIL
// ========================================

function detailPage() {
  const room = currentRoom();

  if (!room) {
    return `
      ${backButton("home")}
      <p>Room not found.</p>
    `;
  }

  const isMyRoom =
    Boolean(state.table) &&
    room.id === TABLES[state.table];

  return `
    ${backButton("rooms")}

    <h1 class="center">${room.name}</h1>

    <p class="center">
      <span class="room-tag">
        ${isMyRoom ? "YOUR ROOM" : "VIEW ONLY"}
      </span>
    </p>

<div style="margin: 16px 0 20px;">
  ${roomPreview(room.id)}
</div>
    <p>
      Contribute furniture to complete this shared space.
    </p>

    <div class="card">
      <h3>Room Progress</h3>
      ${roomProgress(room)}
    </div>

    ${isMyRoom
      ? primary(
          "Contribute to Room →",
          "start-contribution",
          state.pieces === 0
        )
      : `
        <div class="notice">
          You can explore this room, but you can only
          contribute to the room linked to your table.
        </div>
      `}
  `;
}

// ========================================
// 10. CHOOSE SHAPE
// ========================================

function shapePage() {
  return `
    ${backButton("selection")}

    ${pieceBalance()}

    <h2>1. Choose a Shape</h2>

    <p class="small">
      Choose the size of your next furniture item.
    </p>

    <div class="grid-two">
${SHAPES.filter(shape =>
  FURNITURE.some(item =>
    item.room === state.room &&
    item.shape === shape.id
  )
).map(shape => `        <button
          class="option"
          data-shape="${shape.id}"
          ${shape.cost > availablePieces()
            ? "disabled"
            : ""}
        >
          <div class="placeholder">
            ${shape.w} × ${shape.h}
          </div>

          <strong>${shape.id}</strong>

          <p class="small">
            ${shape.cost} pieces
          </p>
        </button>
      `).join("")}
    </div>

    ${primary(
      "View Your Selection",
      "show-selection",
      state.selection.length === 0
    )}
  `;
}

// ========================================
// 11. CHOOSE FURNITURE
// ========================================


function furniturePage() {

  const choices = FURNITURE.filter(
    item =>
      item.room === state.room &&
      item.shape === state.selectedShape
  );

  return `
    ${backButton("shape")}

    ${pieceBalance()}

    <h2>2. Choose Furniture</h2>

    <p class="small">
      Shape: ${state.selectedShape}
    </p>

    <div class="grid-two">
      ${choices.map(item => `
        <button
          class="option"
          data-furniture="${item.id}"
        >
          <div class="furniture-preview">
            <img
              src="${furnitureImage(item)}"
              alt="${item.name}"
            >
          </div>

          <strong>${item.name}</strong>

          <p class="small">
            ${shapeOf(item).cost} pieces
          </p>
        </button>
      `).join("")}
    </div>
  `;
}

// ========================================
// 12. YOUR SELECTION
// ========================================

function selectionPage() {
  return `
    ${backButton("detail")}

    ${pieceBalance()}

    <h2>Your Selection</h2>

    ${state.selection.length === 0
      ? `
        <p class="small">
          No furniture selected yet.
        </p>
      `
      : state.selection.map((item, index) => `
        <div class="selection-row">
          <span>
            ${item.name}

            <br>

            <small>
              ${item.shape} ·
              ${shapeOf(item).cost} pieces
            </small>
          </span>

          <button data-remove="${index}">
            Remove
          </button>
        </div>
      `).join("")}

    ${primary(
      "Add Furniture +",
      "add-furniture",
      availablePieces() === 0
    )}

    ${primary(
      "Continue to Placement →",
      "placement",
      state.selection.length === 0
    )}
  `;
}

// ========================================
// 13. PLACEMENT HELPERS
// ========================================

function cellsFor(room, item, startIndex) {
  const shape = shapeOf(item);

  const col = startIndex % room.cols;
  const row = Math.floor(startIndex / room.cols);

  if (
    col + shape.w > room.cols ||
    row + shape.h > room.rows
  ) {
    return null;
  }

  const cells = [];

  for (let y = 0; y < shape.h; y++) {
    for (let x = 0; x < shape.w; x++) {
      cells.push(
        (row + y) * room.cols + col + x
      );
    }
  }

  return cells;
}

function occupiedCells() {
  const occupied = [
    ...state.occupied[state.room]
  ];

  state.placements.forEach(placement => {
    occupied.push(...placement.cells);
  });

  return occupied;
}

function canPlace(item, index) {
  const cells = cellsFor(
    currentRoom(),
    item,
    index
  );

  if (!cells) return false;

  const occupied = occupiedCells();

  return cells.every(
    cell => !occupied.includes(cell)
  );
}

// ========================================
// 14. LANDSCAPE PLACEMENT
// ========================================

function placementPage() {
  const room = currentRoom();
  const nextIndex = state.placements.length;
  const item = state.selection[nextIndex];

  const fixedCells = state.occupied[state.room] || [];

  const draftCells = state.placements.flatMap(
    placement => placement.cells
  );

  const allPlaced =
    state.selection.length > 0 &&
    state.placements.length === state.selection.length;

    // Furniture already confirmed in Supabase
const confirmedFurniture = sharedFurnitureRecords
  .filter(record => record.room_id === state.room)
  .map(record => {
    const furniture = FURNITURE.find(
      f => f.id === record.furniture_id
    );

    if (!furniture || !record.cells?.length) return "";

    const shape = shapeOf(furniture);
    if (!shape) return "";

    const startCol = Math.min(
      ...record.cells.map(cell => cell % room.cols)
    );

    const startRow = Math.min(
      ...record.cells.map(cell =>
        Math.floor(cell / room.cols)
      )
    );

    const imageUrl = new URL(
      furnitureImage(furniture),
      document.querySelector('script[src$="mobile.js"]').src
    ).href;

    return `
      <img
        src="${imageUrl}"
        alt="${furniture.name}"
        style="
          position: absolute;
          left: ${(startCol / room.cols) * 100}%;
          top: ${(startRow / room.rows) * 100}%;
          width: ${(shape.w / room.cols) * 100}%;
          height: ${(shape.h / room.rows) * 100}%;
          object-fit: fill;
          pointer-events: none;
          z-index: 2;
        "
      >
    `;
  })
  .join("");

// Furniture currently being placed: black silhouettes
const draftFurniture = state.placements
  .map(placement => {
    const furniture = placement.item;
    const shape = shapeOf(furniture);

    if (!shape || !placement.cells?.length) return "";

    const startCol = Math.min(
      ...placement.cells.map(cell => cell % room.cols)
    );

    const startRow = Math.min(
      ...placement.cells.map(cell =>
        Math.floor(cell / room.cols)
      )
    );

    const imageUrl = new URL(
      furnitureImage(furniture),
      document.querySelector('script[src$="mobile.js"]').src
    ).href;

    return `
      <img
        src="${imageUrl}"
        alt="${furniture.name} silhouette"
        style="
          position: absolute;
          left: ${(startCol / room.cols) * 100}%;
          top: ${(startRow / room.rows) * 100}%;
          width: ${(shape.w / room.cols) * 100}%;
          height: ${(shape.h / room.rows) * 100}%;
          object-fit: fill;
          filter: brightness(0);
          pointer-events: none;
          z-index: 3;
        "
      >
    `;
  })
  .join("");

  // Room background
  const background = ROOM_BACKGROUNDS[state.room];

  const backgroundUrl = background
    ? new URL(
        `../assets/bg/${background.file}`,
        document.querySelector('script[src$="mobile.js"]').src
      ).href
    : "";

  const backgroundImage = background
    ? background.floorOnly
      ? `
        <div
          style="
            position: absolute;
            inset: 0;
            background-color: ${background.wallColor};
          "
        ></div>

        <img
          src="${backgroundUrl}"
          alt=""
          style="
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 50%;
            object-fit: fill;
            pointer-events: none;
          "
        >
      `
      : `
        <img
          src="${backgroundUrl}"
          alt=""
          style="
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: fill;
            pointer-events: none;
          "
        >
      `
    : "";

  return `
    <div class="placement-screen">
      ${backButton("selection")}

      <h2>Place Your Furniture</h2>

      <p class="small">
        Rotate your phone to landscape for a larger grid.
      </p>

      <div class="placement-layout">
        <div>
          <h3>
            ${state.placements.length} /
            ${state.selection.length} placed
          </h3>

          <div class="placement-list">
            ${state.selection.map((f, index) => `
              <button
                class="${index === nextIndex ? "active" : ""}"
                disabled
              >
                ${index < nextIndex ? "✓ " : ""}
                ${f.name}
              </button>
            `).join("")}
          </div>

          <p class="small">
            ${item
              ? `Tap a cell to place: ${item.name}`
              : "All furniture positioned."}
          </p>

          ${primary(
            "Undo Last Placement",
            "undo",
            state.placements.length === 0
          )}
        </div>

        <div>
          <div
            class="placement-room"
            style="
              position: relative;
              width: 100%;
              overflow: hidden;
            "
          >
${backgroundImage}

${confirmedFurniture}
${draftFurniture}

<div
  class="room-grid"
          style="
                position: relative;
                z-index: 1;
                grid-template-columns: repeat(${room.cols}, 1fr);
              "
            >
              ${Array.from(
                { length: room.cols * room.rows },
                (_, index) => {
                  const fixed = fixedCells.includes(index);
                  const draft = draftCells.includes(index);

                  return `
                    <button
                      class="cell ${fixed ? "occupied" : ""} ${draft ? "draft" : ""}"
                      data-cell="${index}"
                      ${fixed || draft || !item
                        ? "disabled"
                        : ""}
                    >
                  ${""}
                    </button>
                  `;
                }
              ).join("")}
            </div>
          </div>
        </div>
      </div>

      ${state.feedback !== null
        ? `
          <div
            class="reward-animation"
            aria-live="polite"
          >
            <div class="reward-puzzle">
              ✿
            </div>

            <h2>
              +${state.feedback} Points!
            </h2>

            <p>
              Your furniture has been added!
            </p>

            ${primary(
              "Back to Room",
              "open-room"
            )}
          </div>
        `
        : primary(
            "Confirm All Placements",
            "confirm",
            !allPlaced
          )}
    </div>
  `;
}

// ========================================
// 15. REWARDS
// ========================================

function rewardsPage() {
  const rewards = [
    { name: "$5 Campus Cafe Voucher", cost: 3 },
    { name: "$5 Printing Credits", cost: 3 },
    { name: "10% off Uni Merch", cost: 4 },
    { name: "$10 Woolworths Voucher", cost: 6 },
    { name: "Movie Ticket", cost: 10 },
    { name: "$5 Petrol Voucher", cost: 3 },
    { name: "Free campus coffee voucher", cost: 4 }
  ];

  return `
    ${backButton("home")}

    <h1 class="rewards-title">Rewards</h1>

    <div class="rewards-list">
      ${rewards.map((reward, index) => `
        <button
          class="reward-item ${index % 2 === 0 ? "filled" : "outlined"}"
          data-reward-cost="${reward.cost}"
          ${state.points < reward.cost ? "disabled" : ""}
        >
          <span class="reward-name">${reward.name}</span>
          <span class="reward-cost">
            ${reward.cost} ✪
          </span>
        </button>
      `).join("")}
    </div>
  `;
}
// ========================================
// 16. RENDER SCREENS
// ========================================

function render() {
  const pages = {
    home: homePage,
    focus: focusPage,
    "focus-complete": completePage,
    break: breakPage,
    rooms: roomsPage,
    detail: detailPage,
    shape: shapePage,
    furniture: furniturePage,
    selection: selectionPage,
    placement: placementPage,
    rewards: rewardsPage
  };

  const page = pages[state.page] || homePage;

  app.innerHTML =
    page() +
    (state.page === "focus" ? "" : bottomNav());

  updateTimerDisplay();
}

// ========================================
// 17. BUTTON INTERACTIONS
// ========================================

app.addEventListener("click", event => {
  const button = event.target.closest("button");

  if (!button || button.disabled) return;

  // Navigation
  if (button.dataset.page) {
    navigate(button.dataset.page);
    return;
  }

  // Room selection (viewing does not change joined room)
  if (button.dataset.room) {
    state.room = button.dataset.room;
    navigate("detail");
    return;
  }

  // Shape selection
  if (button.dataset.shape) {
    state.selectedShape = button.dataset.shape;
    navigate("furniture");
    return;
  }

  // Furniture selection
  if (button.dataset.furniture) {
    const item = FURNITURE.find(
      f => f.id === button.dataset.furniture
    );

    if (
      item &&
      shapeOf(item).cost <= availablePieces()
    ) {
      state.selection.push({ ...item });
      navigate("selection");
    }

    return;
  }

  // Remove furniture from selection
  if (button.dataset.remove !== undefined) {
    const index = Number(button.dataset.remove);

    state.selection.splice(index, 1);
    state.placements = [];

    render();
    return;
  }

  // Place furniture on grid
  if (button.dataset.cell !== undefined) {
    if (state.feedback !== null) return;

    const item = state.selection[
      state.placements.length
    ];

    const index = Number(button.dataset.cell);

    if (item && canPlace(item, index)) {
      state.placements.push({
        item: { ...item },
        cells: cellsFor(
          currentRoom(),
          item,
          index
        )
      });

      render();
    }

    return;
  }

  const action = button.dataset.action;

  // First trial / break contribution
  if (
    action === "try-contribution" ||
    action === "break-contribute"
  ) {
    if (!joinedRoom() || state.pieces === 0) return;

    state.room = joinedRoom().id;
    state.selection = [];
    state.placements = [];
    state.feedback = null;

    navigate("selection");
    return;
  }

  if (action === "show-break") {
    timer.completionVisible = false;
    navigate("break");
    return;
  }

  if (action === "go-home") {
    navigate("home");
    return;
  }

  // Ending a session earns no Piece.
  if (action === "end-session") {
    if (!window.confirm(
      "End this focus session? You won't earn a Puzzle Piece."
    )) {
      return;
    }

    resetTimer();
    return;
  }

  // Timer
  if (action === "toggle-timer") {
    toggleTimer();
    return;
  }

  if (action === "reset-timer") {
    resetTimer();
    return;
  }

  // Always open the JOINED room.
  if (action === "open-room") {
    if (!joinedRoom()) {
      navigate("home");
      return;
    }

    state.room = joinedRoom().id;
    navigate("detail");
    return;
  }

  // Start contribution
  if (action === "start-contribution") {
    if (
      state.room !== TABLES[state.table] ||
      state.pieces === 0
    ) {
      return;
    }

    state.selection = [];
    state.placements = [];
    state.feedback = null;

    navigate("shape");
    return;
  }

  if (action === "add-furniture") {
    navigate("shape");
    return;
  }

  if (action === "show-selection") {
    navigate("selection");
    return;
  }

  if (action === "placement") {
    state.placements = [];
    state.feedback = null;

    navigate("placement");
    return;
  }

  if (action === "undo") {
    state.placements.pop();
    render();
    return;
  }

  // Confirm furniture placements
if (action === "confirm") {
  const cost = reservedPieces();

  if (
    state.feedback !== null ||
    state.selection.length === 0 ||
    state.placements.length !== state.selection.length ||
    cost > state.pieces ||
    state.room !== TABLES[state.table]
  ) {
    return;
  }

  const roomId = state.room;

  // Check existing occupied cells on this device.
  const occupied = new Set(state.occupied[roomId]);

  for (const placement of state.placements) {
    for (const cell of placement.cells) {
      if (occupied.has(cell)) {
        alert("Placement conflict. Please try again.");
        return;
      }

      occupied.add(cell);
    }
  }

  // Prepare furniture data for Supabase.
  const furnitureData = state.placements.map(placement => ({
    room_id: roomId,
    furniture_id: placement.item.id,
    cells: placement.cells
  }));

  // Prevent repeated submissions.
  if (window.isSavingPlacement) return;
  window.isSavingPlacement = true;

  // Save furniture to Supabase.
  (async () => {
    try {
      const { data: existing, error: readError } =
        await supabaseClient
          .from("furniture_placements")
          .select("cells")
          .eq("room_id", roomId);

      if (readError) throw readError;

      const occupiedNow = new Set(
        (existing || []).flatMap(row => row.cells)
      );

      const hasConflict = furnitureData.some(item =>
        item.cells.some(cell => occupiedNow.has(cell))
      );

      if (hasConflict) {
        alert(
          "Someone has already placed furniture here. Please try another position."
        );
        return;
      }

      const { error } = await supabaseClient
        .from("furniture_placements")
        .insert(furnitureData);

      if (error) throw error;

      // Only update points after successful saving.
      state.occupied[roomId] = [...occupied];

      state.pieces -= cost;
      state.points += cost;

      state.hasTriedContribution = true;
      saveProgress();

      state.feedback = cost;
      state.selection = [];
      state.placements = [];

      render();

    } catch (error) {
      console.error("Supabase save error:", error);
      alert(
        "Could not save furniture. Please try again."
      );
    } finally {
      window.isSavingPlacement = false;
    }
  })();

  return;
}

// Redeem selected reward
if (button.dataset.rewardCost !== undefined) {
  const cost = Number(button.dataset.rewardCost);

  if (!Number.isFinite(cost) || cost <= 0) return;
  if (state.points < cost) return;

  const confirmed = window.confirm(
    `Redeem this reward for ${cost} points?`
  );

  if (!confirmed) return;

  state.points -= cost;
  saveProgress();

  alert("Reward redeemed!");
  render();
  return;
}

  // Demo rewards
  if (action === "redeem") {
    if (state.points >= 5) {
      state.points -= 5;
      saveProgress();

      alert("Demo reward redeemed!");
      render();
    }

    return;
  }
});

// ========================================
// 18. FOCUS DURATION SLIDER
// ========================================

app.addEventListener("input", event => {
  if (event.target.id === "study-duration") {
    setStudyDuration(
      Number(event.target.value)
    );
  }
});

// ========================================
// 19. INITIAL LOAD
// ========================================

render();

// ========================================
// 20. SYNC OCCUPIED CELLS WITH SUPABASE
// ========================================

let isLoadingOccupied = false;

async function syncOccupiedCells() {
  if (isLoadingOccupied || window.isSavingPlacement) return;

  isLoadingOccupied = true;

  try {
const { data, error } = await supabaseClient
  .from("furniture_placements")
  .select("room_id, furniture_id, cells");
    if (error) throw error;

    // Start with empty cells for all six rooms.
    const updatedOccupied = Object.fromEntries(
      ROOMS.map(room => [room.id, []])
    );

    // Fill them using the latest Supabase data.
    for (const placement of data || []) {
      if (!updatedOccupied[placement.room_id]) continue;

      updatedOccupied[placement.room_id].push(
        ...placement.cells
      );
    }

    // Replace old local cell data with Supabase data.
    state.occupied = Object.fromEntries(
      Object.entries(updatedOccupied).map(([room, cells]) => [
        room,
        [...new Set(cells)]
      ])
    );

    sharedFurnitureRecords = data || [];

    // Keep personal Pieces and Points unchanged.
    saveProgress();

    // Update the screen without refreshing.
    render();

  } catch (error) {
    console.error("Could not sync occupied cells:", error);

  } finally {
    isLoadingOccupied = false;
  }
}

// Sync when the mobile app opens.
syncOccupiedCells();

// Check for changes every 3 seconds.
setInterval(syncOccupiedCells, 3000);

// Sync when returning to the browser tab.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    syncOccupiedCells();
  }
});