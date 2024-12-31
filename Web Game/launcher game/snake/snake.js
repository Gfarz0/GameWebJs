// Setup canvas dan context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ukuran grid untuk game
const grid = 10;
let score = 0;

// Posisi awal ular
let snake = [{x: 50, y: 50}, {x: 40, y: 50}, {x: 30, y: 50}];

// Posisi makanan
let food = {x: 100, y: 100};

// Arah ular
let dx = grid;
let dy = 0;

// Kontrol gerakan ular
let changingDirection = false;

// Mengontrol tampilan halaman
const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");

// Menampilkan halaman home dan memulai game saat tombol ditekan
startButton.addEventListener("click", startGame);

// Fungsi untuk memulai game
function startGame() {
    // Sembunyikan halaman home dan tampilkan game screen
    homeScreen.style.display = "none";
    gameScreen.style.display = "block";

    // Reset permainan
    score = 0;
    snake = [{x: 50, y: 50}, {x: 40, y: 50}, {x: 30, y: 50}];
    food = {x: 100, y: 100};
    dx = grid;
    dy = 0;

    // Memulai game loop
    gameLoop();
}

// Fungsi untuk menggambar ular
function drawSnake() {
    snake.forEach(function(segment, index) {
        ctx.fillStyle = (index === 0) ? "green" : "white";
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });
}

// Fungsi untuk menggambar makanan
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid, grid);
}

// Fungsi untuk menggerakkan ular
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = "Skor: " + score;
        createFood();
    } else {
        snake.pop();
    }
}

// Fungsi untuk membuat makanan baru
function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
        y: Math.floor(Math.random() * (canvas.height / grid)) * grid
    };
}

// Fungsi untuk memeriksa tabrakan
function checkCollision() {
    // Tabrakan dengan dinding
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }
    // Tabrakan dengan tubuh ular
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Fungsi untuk mengubah arah ular
function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;
    if (keyPressed === 37 && dx === 0) { dx = -grid; dy = 0; }
    if (keyPressed === 38 && dy === 0) { dx = 0; dy = -grid; }
    if (keyPressed === 39 && dx === 0) { dx = grid; dy = 0; }
    if (keyPressed === 40 && dy === 0) { dx = 0; dy = grid; }
}

// Fungsi untuk merender game
function gameLoop() {
    changingDirection = false;
    if (checkCollision()) {
        alert("Game Over! Skor akhir: " + score);
        document.location.reload();
        return;
    }

    moveSnake();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    setTimeout(gameLoop, 100);
}

// Event listener untuk kontrol
document.addEventListener("keydown", changeDirection);
