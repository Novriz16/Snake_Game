const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const boxSize = 20;
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;

// Fungsi untuk memulai game
function startGame() {
    snake = [{ x: boxSize * 5, y: boxSize * 5 }];
    direction = "RIGHT";
    food = spawnFood();
    score = 0;
    document.getElementById("score").innerText = `Score: ${score}`;
    clearInterval(game);
    game = setInterval(draw, 100);
}

// Fungsi untuk menggerakkan ular
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Fungsi untuk menggambar setiap frame
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar makanan
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Gerakkan ular
    let head = { ...snake[0] };
    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    
    // Tambahkan kepala baru ke ular
    snake.unshift(head);

    // Jika kepala ular berada di lokasi makanan
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
        food = spawnFood();
    } else {
        snake.pop(); // Hapus ekor jika tidak makan
    }

    // Cek tabrakan dengan tubuh atau dinding
    if (checkCollision(head)) {
        clearInterval(game);
        alert("Game Over!");
    }

    // Gambar ular
    ctx.fillStyle = "green";
    snake.forEach(part => ctx.fillRect(part.x, part.y, boxSize, boxSize));
}

// Fungsi untuk membuat makanan di posisi acak
function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
    };
}

// Fungsi untuk memeriksa tabrakan
function checkCollision(head) {
    return (
        head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(part => part.x === head.x && part.y === head.y)
    );
}

// Mulai game
let game;
