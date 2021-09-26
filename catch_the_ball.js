window.addEventListener("load", startGame, false);
let centerX = 250;
let centerY = 200;
let radius = 25;
let ballColor = "brown";
let dx = 5;
let dy = 5;
let time = 0;
let gameWidth = 400;
let gameHeight = 400;
let rWidth = 100;
let rHeight = 25;
let rLeft = 100;
let rTop = 375;
let animation;

function startGame() {
    animation = setInterval(newGame, 30);
}

function newGame() {
    if (centerY - radius > gameHeight) {
        document.getElementById("gameStart").innerHTML = "<p>Игра окончена! Ваше время:" + time + "секунд.";
        document.getElementById("gameStart").style.border = "2px solid rgb(161, 12, 12)";
        document.getElementById("game").style.border = "2px solid rgb(161, 12, 12)";
        clearInterval(animation);
    } else {
        document.getElementById("time").innerHTML = time;
        let canvas = document.getElementById("game"),
            context = canvas.getContext("2d");

        //Каждый раз очищаем холст
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Рисуем мяч
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        context.stroke();
        context.fillStyle = ballColor;
        context.fill();

        //Движение мяча
        if (centerX + radius === gameWidth || centerX - radius === 0) {
            dx = -dx;
            time++;
        }
        if (centerY - radius === 0) {
            dy = -dy;
            time++;
        }

        centerX = centerX + dx;
        centerY = centerY + dy;

        //Рисуем прямоугольник
        context.fillStyle = "brown";
        context.fillRect(rLeft, rTop, rWidth, rHeight);

        //Проверка соприкосновения мяча с прямоугольником
        checkCollision();

        function checkCollision() {
            if ((centerY + radius == rTop) && (centerX >= rLeft) && (centerX < (rLeft + rWidth))) {
                dy = -dy;
            }
        }
        //Движение прямоугольником делаем при помощи left и right
        document.onkeydown = function() {
            switch (window.event.keyCode) {
                case 37:
                    rLeft -= 20;
                    if (rLeft < 0) {
                        rLeft = 0;
                    }
                    break;
                case 39:
                    rLeft += 20;
                    if (rLeft + rWidth > gameWidth) {
                        rLeft = gameWidth - rWidth;
                    }
                    break;
            }
        };
    }
}

