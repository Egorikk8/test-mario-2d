const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let picBackground = new Image();
    picBackground.src = "./pic/background.jpg";

let picPlayer = new Image();
    picPlayer.src = "./pic/player.png"

let picEnemy = new Image();
    picEnemy.src = "./pic/enemy.png";

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function draw(){
    ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(picPlayer, 50, 764, picPlayer.width/20, picPlayer.height/20);
    ctx.drawImage(picEnemy, 750, 760, picPlayer.width/20, picPlayer.height/20);
}

picPlayer.onload = picBackground.onload = draw;