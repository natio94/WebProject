console.log("Hello, world");
let hunterPositions=[];
let game;
game=document.getElementById("game-container");

let gameRect = game.getBoundingClientRect();
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnHunter(){
  let hunter;
  hunter=document.createElement("img")
  hunter.src="/data/img.png";
  hunter.className="hunter";
  hunter.onclick=killHunter;
  hunter.width=100;
  hunter.height=100;
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
}
function killHunter(event){
  let hunterShot=event.target;
    if (hunterShot.className === "hunter") {
        console.log("Hunter killed");
        hunterShot.src="/data/Duck.png";
        setTimeout(() => {
          hunterShot.remove();
          hunterPositions = hunterPositions.filter(pos => pos.left !== parseInt(hunterShot.style.left) || pos.top !== parseInt(hunterShot.style.top));
        },300)
    }
}

function startGame() {
    hunterPositions = [];
    game.innerHTML = "";
    spawnHunter();
    setInterval(spawnHunter, 1000);
}