// Get elements
const startBtn = document.getElementById("start");
const levelBtn = document.getElementById("level");
const highScoreBtn = document.getElementById("high-score");
const settingsBtn = document.getElementById("settings");
const quitBtn = document.getElementById("quit");
const levelMenu = document.getElementById("levelMenu");
const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const backBtn = document.getElementById("back");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = "right";
let gameInterval;
let score = 0;
let speed = 95; // Default speed (Easy level)

// Main menu event listeners
startBtn.addEventListener("click", () => {
  startGame();
});

levelBtn.addEventListener("click", () => {
  document.querySelector(".menu").style.display = "none";
  levelMenu.style.display = "flex";
});

highScoreBtn.addEventListener("click", () => {
  alert(`High Score: ${score}`);
});

settingsBtn.addEventListener("click", () => {
  alert("Settings: Coming Soon!");
});

quitBtn.addEventListener("click", () => {
  alert("Quit: Game Closed!");
  window.close();
});

// Level selection event listeners
easyBtn.addEventListener("click", () => {
  speed = 90; // Slow speed for Easy level
  startGame();
});

mediumBtn.addEventListener("click", () => {
  speed = 85; // Medium speed for Medium level
  startGame();
});

hardBtn.addEventListener("click", () => {
  speed = 40; // Fast speed for Hard level
  startGame();
});

backBtn.addEventListener("click", () => {
  levelMenu.style.display = "none";
  document.querySelector(".menu").style.display = "flex";
});

// Start the game
function startGame() {
  // Hide menus and show canvas
  document.querySelector(".menu").style.display = "none";
  levelMenu.style.display = "none";
  canvas.style.display = "block";

  // Reset game state
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  score = 0;

  // Start game loop
  clearInterval(gameInterval); // Clear any existing interval
  gameInterval = setInterval(gameLoop, speed);
}

// Game loop
function gameLoop() {
  update();
  draw();
}

// Update game state
function update() {
  // Move the snake
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Check for collisions
  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop(); // Remove tail
  }

  snake.unshift(head); // Add new head
}

// Draw game
function draw() {
  // Clear canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#00ff00";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
  });

  // Draw food
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

  // Draw score
  ctx.fillStyle = "#fff";
  ctx.font = "20px 'Press Start 2P', cursive";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Generate food at random position
function generateFood() {
  return {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  };
}

// Game over
function gameOver() {
  clearInterval(gameInterval);
  alert(`Game Over! Your score: ${score}`);
  document.querySelector(".menu").style.display = "flex";
  canvas.style.display = "none";
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});