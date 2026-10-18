
const roomGrid = document.getElementById("roomGrid");
const furnitureMenu = document.getElementById("furnitureMenu");
const screen = document.querySelector(".screen");

const cellSize = 180;

// Each room's grid size and furniture catalogue
const rooms = {
  balcony: {
    columns: 6,
    rows: 4,
    folder: "balcony",
    files: [
      "laundry-(2x2).png",
      "plant-1-(1x1).png",
      "plant-2-(1x2).png",
      "table-5-(1x2).png",
      "table-6-(2x2).png",
      "washing machine-(2x2).png"
    ]
  },

  bathroom: {
    columns: 5,
    rows: 5,
    folder: "bathroom",
    files: [
      "bathtub-(2x1).PNG",
      "carpet-2-(1x1).png",
      "cosmetic-(1x1).png",
      "shower-(1x3).png",
      "toilet-(1x2).png",
      "towel-(1x1).png",
      "washbasin-(1x3).png",
      "window-(2x2).png"
    ]
  },

  bedroom: {
    columns: 8,
    rows: 4,
    folder: "bedroom",
    files: [
      "bed-1-(2x2).png",
      "bed-2-(2x1).png",
      "coat rack-(1x2).png",
      "desk-(2x2).png",
      "hanger-1-(1x2).png",
      "hanger-2-(2x2).png",
      "iron-(2x1).png",
      "lamp-(1x2).png",
      "vanity-(1x2).png",
      "window-2-(1x1).png"
    ]
  },

  kitchen: {
    columns: 5,
    rows: 5,
    folder: "kitchen",
    files: [
      "cabinet-(2x2).png",
      "cupboard-(1x2).png",
      "fridge-1-(1x2).png",
      "fridge-2-(2x2).png",
      "knife-(1x1).png",
      "oven-(1x2).png",
      "table-3-(2x2).png"
    ]
  },

  "living-room-1": {
    columns: 8,
    rows: 5,
    folder: "living-room-1",
    files: [
      "bookcase-(2x2).png",
      "bookshelf-(1x2).png",
      "carpet-(1x1).png",
      "ceiling light-(2x1).png",
      "couch-2-(3x1).png",
      "frame-(2x2).png",
      "table-1-(2x2).png",
      "table-2-(2x2).png",
      "table-4-(2x2).png",
      "tv-(2x2).png",
      "vase-(1x1).png"
    ]
  },

  "living-room-2": {
    columns: 9,
    rows: 4,
    folder: "living-room-2",
    files: [
      "cat-(1x1).png",
      "ceiling light-2-(1x2).png",
      "couch-1-(2x2).png",
      "fireplace-(1x2).png",
      "piano-(2x2).png",
      "sideboard-(2x2).png",
      "stairs-(2x2).png",
      "table tennis-(2x2).png",
      "window-3-(2x2).png"
    ]
  }
};

// Find the room from the URL
const params = new URLSearchParams(window.location.search);
const requestedRoom = params.get("room") || "living-room-1";

const roomId = rooms[requestedRoom]
  ? requestedRoom
  : "living-room-1";

const currentRoom = rooms[roomId];

const columns = currentRoom.columns;
const rows = currentRoom.rows;

const backgrounds = {
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

  "living-room-1": {
    file: "living-room-1-floor.png",
    floorOnly: true,
    wallColor: "#FFD0C4"
  },

  "living-room-2": {
    file: "living-room-2-floor.png",
    floorOnly: true,
    wallColor: "#B5A67B"
  }
};

// Apply background for the selected room
const background = backgrounds[roomId];

screen.style.backgroundImage =
  `url("assets/bg/${background.file}")`;

screen.style.backgroundRepeat = "no-repeat";

if (background.floorOnly) {
  // Top 50%: wall colour
  // Bottom 50%: floor PNG
  screen.style.backgroundColor = background.wallColor;
  screen.style.backgroundSize = "100% 50%";
  screen.style.backgroundPosition = "bottom center";

} else {
  // Full-screen background image
  screen.style.backgroundColor = "transparent";
  screen.style.backgroundSize = "100% 100%";
  screen.style.backgroundPosition = "center";
}

// Set grid dimensions
roomGrid.style.gridTemplateColumns =
  `repeat(${columns}, ${cellSize}px)`;

roomGrid.style.gridTemplateRows =
  `repeat(${rows}, ${cellSize}px)`;

// Convert filenames into furniture data
function makeFurniture(file) {
  const match = file.match(/\((\d+)x(\d+)\)\.png$/i);

  if (!match) {
    console.warn("Invalid furniture filename:", file);
    return null;
  }

  const name = file
    .replace(/-\(\d+x\d+\)\.png$/i, "")
    .replace(/-/g, " ");

  return {
    name,
    file,
    w: Number(match[1]),
    h: Number(match[2]),
    src: `assets/${currentRoom.folder}/${file}`
  };
}

const furnitureItems = currentRoom.files
  .map(makeFurniture)
  .filter(Boolean);

// Placement state (local prototype)
const occupied = new Set();
const cells = [];
let selectedFurniture = furnitureItems[0];

// Menu heading
const heading = document.createElement("h3");
heading.textContent = roomId.replace(/-/g, " ");
furnitureMenu.appendChild(heading);

// Create furniture buttons
furnitureItems.forEach((item) => {
  const button = document.createElement("button");

  button.textContent =
    `${item.name} (${item.w}×${item.h})`;

  button.addEventListener("click", () => {
    selectedFurniture = item;

    furnitureMenu
      .querySelectorAll("button")
      .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");
    clearPreview();
  });

  if (item === selectedFurniture) {
    button.classList.add("selected");
  }

  furnitureMenu.appendChild(button);
});

// Create grid cells
for (let i = 0; i < columns * rows; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  roomGrid.appendChild(cell);
  cells.push(cell);
}

// Find cells occupied by selected furniture
function getCoveredCells(startIndex, item) {
  const startCol = startIndex % columns;
  const startRow = Math.floor(startIndex / columns);

  if (
    startCol + item.w > columns ||
    startRow + item.h > rows
  ) {
    return null;
  }

  const indices = [];

  for (let y = 0; y < item.h; y++) {
    for (let x = 0; x < item.w; x++) {
      indices.push(
        (startRow + y) * columns + startCol + x
      );
    }
  }

  return indices;
}

// Check for overlap
function canPlace(indices) {
  if (!indices) return false;

  return indices.every(index => !occupied.has(index));
}

// Remove preview
function clearPreview() {
  cells.forEach(cell => {
    cell.classList.remove(
      "preview-valid",
      "preview-invalid"
    );
  });
}

// Show placement preview
function showPreview(index) {
  clearPreview();

  const indices = getCoveredCells(
    index,
    selectedFurniture
  );

  if (!indices) return;

  const valid = canPlace(indices);

  indices.forEach(i => {
    cells[i].classList.add(
      valid ? "preview-valid" : "preview-invalid"
    );
  });
}

// Place furniture
function placeFurniture(index) {
  const indices = getCoveredCells(
    index,
    selectedFurniture
  );

  if (!canPlace(indices)) return;

  const startCol = index % columns;
  const startRow = Math.floor(index / columns);

  const furniture = document.createElement("img");

  furniture.src = selectedFurniture.src;
  furniture.alt = selectedFurniture.name;
  furniture.classList.add("placed-furniture");

  furniture.style.left =
    `${startCol * cellSize}px`;

  furniture.style.top =
    `${startRow * cellSize}px`;

  furniture.style.width =
    `${selectedFurniture.w * cellSize}px`;

  furniture.style.height =
    `${selectedFurniture.h * cellSize}px`;

  roomGrid.appendChild(furniture);

  indices.forEach(i => occupied.add(i));
  clearPreview();
}

// Grid interactions
cells.forEach((cell, index) => {
  cell.addEventListener("mouseenter", () => {
    showPreview(index);
  });

  cell.addEventListener("click", () => {
    placeFurniture(index);
  });
});

roomGrid.addEventListener("mouseleave", clearPreview);

// ========================================
// SUPABASE — SHARED FURNITURE DISPLAY
// ========================================

// Mobile and Shared Display use different IDs
// for the two living rooms.
const databaseRoomId = {
  "living-room-1": "living1",
  "living-room-2": "living2"
}[roomId] || roomId;

// Find the PNG that matches a furniture ID.
function findFurnitureById(furnitureId) {
  const normalise = value =>
    String(value)
      .toLowerCase()
      .replace(/\.(png)$/i, "")
      .replace(/-\(\d+x\d+\)$/i, "")
      .replace(/[^a-z0-9]/g, "");

  const target = normalise(furnitureId);

  return furnitureItems.find(item => {
    const filename = normalise(item.file);
    const name = normalise(item.name);

    return (
      filename === target ||
      name === target ||
      target.endsWith(filename)
    );
  });
}

// Display one furniture item from Supabase.
function displaySavedFurniture(record) {
  const item = findFurnitureById(record.furniture_id);

  if (!item) {
    console.warn(
      "No matching furniture PNG:",
      record.furniture_id
    );
    return;
  }

  const indices = record.cells.map(Number);

  if (
    indices.length === 0 ||
    indices.some(index =>
      !Number.isInteger(index) ||
      index < 0 ||
      index >= columns * rows
    )
  ) {
    console.warn("Invalid furniture cells:", record);
    return;
  }

  const startCol = Math.min(
    ...indices.map(index => index % columns)
  );

  const startRow = Math.min(
    ...indices.map(index => Math.floor(index / columns))
  );

  const furniture = document.createElement("img");

  furniture.src = item.src;
  furniture.alt = item.name;
  furniture.classList.add("placed-furniture");
  furniture.classList.add("supabase-furniture");

  furniture.style.left = `${startCol * cellSize}px`;
  furniture.style.top = `${startRow * cellSize}px`;
  furniture.style.width = `${item.w * cellSize}px`;
  furniture.style.height = `${item.h * cellSize}px`;

  roomGrid.appendChild(furniture);

  indices.forEach(index => occupied.add(index));
}

// Load all saved furniture for this room.
async function loadSharedFurniture() {
  try {
    const { data, error } = await supabaseClient
      .from("furniture_placements")
      .select("id, room_id, furniture_id, cells")
      .eq("room_id", databaseRoomId);

    if (error) throw error;

    // Remove previously loaded Supabase furniture.
    document
      .querySelectorAll(".supabase-furniture")
      .forEach(element => element.remove());

    occupied.clear();

    // Display the latest saved furniture.
    (data || []).forEach(displaySavedFurniture);

    clearPreview();

  } catch (error) {
    console.error(
      "Could not load shared furniture:",
      error
    );
  }
}

// Load immediately when the display opens.
loadSharedFurniture();

// Check for new placements every 3 seconds.
setInterval(loadSharedFurniture, 3000);