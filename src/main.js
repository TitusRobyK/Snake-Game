let beepSound = new Audio("../assets/success.mp3");
let failSound = new Audio("../assets/fail.mp3");
let gridSize = 20;
let tileCount = 20;
let fruitPositionX = 15;
let fruitPositionY = 15;
let playerPositionX = 10;
let playerPositionY = 10;
let xVelocity = 1;
let yVelocity = 0;
let trail = [];
let tail = 5;

window.onload = () => {
    canvasElement = document.getElementById("snake-game");
    ctx = canvasElement.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(runGame, 1000 / 15);

}

function runGame() {
    playerPositionX += xVelocity;
    playerPositionY += yVelocity;
    if (playerPositionX < 0) {
        playerPositionX = tileCount - 1;
    }
    if (playerPositionX > tileCount - 1) {
        playerPositionX = 0;
    }
    if (playerPositionY < 0) {
        playerPositionY = tileCount - 1;
    }
    if (playerPositionY > tileCount - 1) {
        playerPositionY = 0;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    ctx.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x == playerPositionX && trail[i].y == playerPositionY) {
            failSound.play();
            tail = 5;
            shake(canvasElement);
        }
    }
    trail.push(
        {
            x: playerPositionX,
            y: playerPositionY
        });

    while (trail.length > tail) {
        trail.shift();
    }

    if (fruitPositionX == playerPositionX && fruitPositionY == playerPositionY) {
        tail++;
        beepSound.play();
        fruitPositionX = Math.floor(Math.random() * tileCount);
        fruitPositionY = Math.floor(Math.random() * tileCount);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(fruitPositionX * gridSize, fruitPositionY * gridSize, gridSize - 2, gridSize - 2);
}


function keyPush(event) {
    switch (event.keyCode) {
        case 37:
            xVelocity = -1;
            yVelocity = 0;
            break;
        case 38:
            xVelocity = 0;
            yVelocity = -1;
            break;
        case 39:
            xVelocity = 1;
            yVelocity = 0;
            break;
        case 40:
            xVelocity = 0;
            yVelocity = 1;
            break;
    }
}

var shakingElements = [];
var shake = function (element, magnitude = 16) {
    var tiltAngle = 1;
    var counter = 1;
    var numberOfShakes = 15;
    var startX = 0,
        startY = 0,
        startAngle = 0;
    var magnitudeUnit = magnitude / numberOfShakes;
    var randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    if (shakingElements.indexOf(element) === -1) {
        shakingElements.push(element);
        upAndDownShake();

    }
    function upAndDownShake() {

        if (counter < numberOfShakes) {
            element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
            magnitude -= magnitudeUnit;
            var randomX = randomInt(-magnitude, magnitude);
            var randomY = randomInt(-magnitude, magnitude);

            element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
            counter += 1;
            requestAnimationFrame(upAndDownShake);
        }
        if (counter >= numberOfShakes) {
            element.style.transform = 'translate(' + startX + ', ' + startY + ')';
            shakingElements.splice(shakingElements.indexOf(element), 1);
        }
    }
};