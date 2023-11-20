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

// change moving direction by direction keys
let moveDirection = 'Right';
window.addEventListener('keydown', changeDirectionValue);

// update snake's state every 0.1 second
let snakeMove = setInterval(draw, 100);

function changeDirectionValue(e) {
    if (e.key == 'ArrowLeft' && moveDirection != 'Right') {
        moveDirection = 'Left';
    }
    else if (e.key == 'ArrowRight' && moveDirection != 'Left') {
        moveDirection = 'Right';
    }
    else if (e.key == 'ArrowUp' && moveDirection != 'Down') {
        moveDirection = 'Up';
    }
    else if (e.key == 'ArrowDown' && moveDirection != 'Up') {
        moveDirection = 'Down';
    }
}

function draw() {
    // refresh canvas graph
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // fill/refill snake's body with colors
    fillColor();

    // update the coordinates of next head unit depend on moveDirection's value
    let nextHeadUnit = changeDirection();

    // confirm that whether the snake ate a point
    snake.pop();
    snake.unshift(nextHeadUnit);


}

function fillColor() {
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = 'yellow';
        } else {
            ctx.fillStyle = 'lightblue';
        }
        ctx.strokeStyle = 'white'; // border style

        // limit the moving space
        if (snake[i].x >= canvas.width) {
            snake[i].x = 0;
        }
        if (snake[i].x < 0) {
            snake[i].x = canvas.width - bodyUnit;
        }
        if (snake[i].y >= canvas.height) {
            snake[i].y = 0;
        }
        if (snake[i].y < 0) {
            snake[i].y = canvas.height - bodyUnit;
        }

        // rendering with (x, y, width, height)
        ctx.fillRect(snake[i].x, snake[i].y, bodyUnit, bodyUnit);
        ctx.strokeRect(snake[i].x, snake[i].y, bodyUnit, bodyUnit);
    }
}

function changeDirection() {
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
    return { x: nextSnakeX, y: nextSnakeY };
}