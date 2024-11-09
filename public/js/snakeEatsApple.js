let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let gameOver = document.querySelector(".gameOver");
let scoreDisplay = document.querySelector(".scoreDisplay");

let left = "ArrowLeft";
let down = "ArrowDown";
let right = "ArrowRight";
let up = "ArrowUp";

let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let best = 0;
let speed = 0.8;

document.addEventListener('keydown', function(event) {
    const key = event.key; // captures the pressed key

    switch (key) {
        case left:
            console.log("Moving Left");
            direction = 1; // right
            break;
        case right:
            console.log("Moving Right");
            direction = -width; // up
            break;
        case up:
            console.log("Moving Up");
            direction = -1; // left
            break;
        case down:
            console.log("Moving Down");
            direction = +width; // down
            break;
    }
});
