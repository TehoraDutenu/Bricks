/*** Script ***/

/** Préparer les éléments **/

/* Préparer le canevas */
var canvas = document.getElementById("myCanvas"); /* Déclarer le canevas et son contexte */
var ctx = canvas.getContext("2d");

/* Définir la balle et ses variables */
var ballRadius = 10; /* Préparer une variable pour que le rayon de la balle soit pris en compte dans les collisions avec le cadre */
var ballColor = "green";

var x = canvas.width / 2; /* Variables de position */
var y = canvas.height - 30;

var dx = 2; /* Variables pour simuler un mouvement */
var dy = -2;


/* Définir la raquette et ses variables */
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

/* Définir les briques et leurs variables */
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (var r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

/* Définir le score */
var score = 0;

/* Donner des vies au joueur */
var lives = 3;



/***************************************************************************************/

/** Fonctions **/

/* Rappeler la fonction draw */
/* var interval = setInterval(draw, 10); /* Appeler la fonction draw toutes les 10ms */
draw();

/* Contrôle de la raquette par l'utilisateur */
var rightPressed = false;
var leftPressed = false;

/* Dessiner la balle */
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}

/* Dessiner la raquette */
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
}

/* Dessiner briques */
function drawBricks () {
	for (var c = 0; c < brickColumnCount; c++) {
		for (var r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
				var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "red";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

/* Contrôle de la raquette via le clavier */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
	} else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = false;
	} else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = false;
	}
}

/* Contrôle de la raquette via la souris */
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth / 2;
	}
}

/* Fonction pour détecter collision avec briques */
function collisionDetection() {
	for (var c = 0; c < brickColumnCount; c++) {
		for (var r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r];
			if (b.status == 1) {
				if (x > b.x &&
					x < b.x + brickWidth &&
					y > b.y &&
					y < b.y + brickHeight
				) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score == brickRowCount * brickColumnCount) {
						alert("YOU WIN, CONGRATS!");
						document.location.reload();
					}
				}
			}
		}
	}
}

/* Afficher le score */
function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20); /* Affichage du score, x, y */
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20); /* Affichage des vies, x, y */
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); /* Effacer le canevas avant que la balle suivante ne soit dessinée */
	drawBall();
	drawPaddle();
	drawBricks();
	collisionDetection();
	drawScore();
	drawLives();

	/* Collision avec le haut et le bas */
	if ((x + dx > canvas.width - ballRadius) || (x + dx < ballRadius)) {
		dx = -dx;
	}
	
	if ((y + dy) < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			lives--;
			if (!lives) {
				alert("GAME OVER");
				document.location.reload();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}

	x += dx;
	y += dy;
	
	if (rightPressed) {
		paddleX += 7;
		if (paddleX + paddleWidth > canvas.width) {
			paddleX = canvas.width - paddleWidth;
		}
	} else if (leftPressed) {
		paddleX -= 7;
		if (paddleX < 0) {
			paddleX = 0;
		}
	}

	requestAnimationFrame(draw);
}
