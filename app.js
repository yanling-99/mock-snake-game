// CanvasRenderingContext2D
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// return a drawing context of canvas, it's used to draw graphs

const bodyUnit = 20;
const row = canvas.height / bodyUnit;
const col = canvas.width / bodyUnit;


let snake = []; // store objects
// each object stores a (x,y) of rect.(snake's body)
snake[0] = { // head
    x: 80,
    y: 0
};

snake[1] = {
    x: 60,
    y: 0
};
snake[2] = {
    x: 40,
    y: 0
};
snake[3] = {
    x: 20,
    y: 0
};

let moveDirection = 'Right';
let snakeMove = setInterval(draw, 100);

function draw() {
    // refresh canvas graph
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // fill/refill snake's body with colors
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = 'yellow';
        } else {
            ctx.fillStyle = 'lightblue';
        }
        ctx.strokeStyle = 'white'; // border style
        // rendering with (x, y, width, height)
        ctx.fillRect(snake[i].x, snake[i].y, bodyUnit, bodyUnit);
        ctx.strokeRect(snake[i].x, snake[i].y, bodyUnit, bodyUnit);
    }

    // decide the coordinates of next head unit depend on moveDirection's value
    let nextSnakeX = snake[0].x;
    let nextSnakeY = snake[0].y;
    if (moveDirection == 'Left') {
        nextSnakeX -= bodyUnit;
    } else if (moveDirection == 'Up') {
        nextSnakeY -= bodyUnit;
    } else if (moveDirection == 'Right') {
        nextSnakeX += bodyUnit;
    } else if (moveDirection == 'Down') {
        nextSnakeY += bodyUnit;
    }

    let nextHeadUnit = {
        x: nextSnakeX,
        y: nextSnakeY
    };

    snake.pop();
    snake.unshift(nextHeadUnit);
}
