// CanvasRenderingContext2D
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// return a drawing context of canvas, it's used to draw graphs

const bodyUnit = 20;
const row = canvas.height / bodyUnit;
const col = canvas.width / bodyUnit;


let snake = []; // store objects

function createSnake() {
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
}

class Fruit {
    constructor() {
        this.x = Math.floor(Math.random() * col) * bodyUnit;
        this.y = Math.floor(Math.random() * row) * bodyUnit;
    }

    drawFruit() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, bodyUnit, bodyUnit);
    }

    pickAnewPosition() {
        let overlapping = false;
        let newX;
        let newY;

        function checkOverlap(x, y) {
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x == x && snake[i].y == y) {
                    overlapping = true;
                    return;
                } else {
                    overlapping = false;
                }
            }
        }

        do {
            newX = Math.floor(Math.random() * col) * bodyUnit;
            newY = Math.floor(Math.random() * row) * bodyUnit;
            checkOverlap(newX, newY);
        }
        while (overlapping);

        this.x = newX;
        this.y = newY;
    }
}

// initial setting
createSnake();
let myFruit = new Fruit();

// update snake's state every 0.1 second
let snakeMove = setInterval(draw, 100);

// change moving direction by direction keys
let moveDirection = 'Right';
window.addEventListener('keydown', changeDirectionValue);

function draw() {
    // check whether the head overlaps with the body
    for (let body = 1; body < snake.length; body++) {
        if (snake[body].x == snake[0].x && snake[body].y == snake[0].y) {
            clearInterval(snakeMove);
            alert('[ Game Over ]');
            return;
        }
    }
    // refresh canvas graph
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    myFruit.drawFruit();
    // fill/refill snake's body with colors
    fillColor();

    // update the coordinates of next head unit depend on moveDirection's value
    let nextHeadUnit = changeDirection();

    // confirm that whether the snake ate a point
    if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
        // new random position of the fruit
        myFruit.pickAnewPosition();
        // update the score

    } else {
        snake.pop();
    }
    snake.unshift(nextHeadUnit);

    window.addEventListener('keydown',changeDirectionValue)
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

    // to prevent game over from keying the direction value quickly a lot
    // don't accept any 'keydown' event before the head was drawn
    window.removeEventListener('keydown',changeDirectionValue)
}
