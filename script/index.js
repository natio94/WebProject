console.log("Hello, world");
let hunterPositions=[];
let game;
game=document.getElementById("game-container");
let scoreShow =document.getElementById("score");
let highScoreShow = document.getElementById("highscore");
let score =0;
let highScore=0;
window.addEventListener("beforeunload",saveScore);
document.addEventListener("DOMContentLoaded", loadScore);
let gameRect = game.getBoundingClientRect();
let lifeLeft=Array.from(document.getElementsByClassName("coeur"));
let lifeLost=[];
let interval;
let deathTimout
function updateScore() {
    if (score > highScore) {
        highScore = score;

    }
    highScoreShow.textContent = highScore;
    scoreShow.textContent= score;
}
function saveScore() {
    sessionStorage.setItem('HighScore',
        JSON.stringify(highScore))
}
function loadScore() {
highScore= JSON.parse(sessionStorage.getItem('HighScore')) || 0;
    updateScore();
}
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnHunter(){
  let hunter;
  hunter=document.createElement("img")
  hunter.src="/data/chasseur.png";
  hunter.className="hunter";
  hunter.onclick=killHunter;
  hunter.width=100;
  hunter.height=100;
    hunter.style.background="transparent";
  let maxLeft = gameRect.width - hunter.width;
  let maxTop = gameRect.height - hunter.height;
  let left, top, isOverlapping;
  do {
    left = randomBetween(0, maxLeft);
    top = randomBetween(0, maxTop);
    isOverlapping = hunterPositions.some(pos => {
      return (
          left < pos.left + hunter.width &&
          left + hunter.width > pos.left &&
          top < pos.top + hunter.height &&
          top + hunter.height > pos.top
      );
    });
  } while (isOverlapping);
  hunter.style.left = left + "px";
  hunter.style.top = top + "px";
  hunterPositions.push({ left, top });
  game.appendChild(hunter);
  deathTimout= setTimeout(()=>{despawnHunter(hunter)}, 4000);
}
function killHunter(event){
    if (deathTimout) {
        clearTimeout(deathTimout);
    }
  let hunterShot=event.target;
    if (hunterShot.className === "hunter") {
        console.log("Hunter killed");
        hunterShot.src="/data/chasseurDeadge.png";
        setTimeout(() => {
          hunterShot.remove();
          hunterPositions = hunterPositions.filter(pos => pos.left !== parseInt(hunterShot.style.left)
              || pos.top !== parseInt(hunterShot.style.top));
        },400)
        score++;
        updateScore();
    }
}
function loseLife() {
lifeLeft[lifeLeft.length-1].src="/data/coeurGris.png";
lifeLost.push(lifeLeft.pop());
if (lifeLeft.length === 0) {
    lose();
}
}

function despawnHunter(hunter){
    try {
        hunter.src="/data/chasseurSoLong.png";
        loseLife();
        setTimeout(() => {
            hunter.remove();
            hunterPositions = hunterPositions.filter(pos => pos.left !== parseInt(hunter.style.left)
                || pos.top !== parseInt(hunter.style.top));
        },400)

    }
    catch (error) {
        console.error("Error despawning hunter:", error);
    }
}

function startGame() {
    hunterPositions = [];
    game.innerHTML = "";
    spawnHunter();
    interval=setInterval(spawnHunter, 1000);
    game.style.cursor="url('../data/target.png')16 16, auto";

}
function lose() {
    if (interval){
        clearInterval(interval);
    }
    game.innerHTML = "<h1>Game Over</h1>";
    saveScore();
    score = 0;
    updateScore();
}