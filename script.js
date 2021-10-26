const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let soundStep = new Audio('./sound/step.mp3');

let picBackground = new Image();
picBackground.src = "./pic/background.jpg";

let picPlayerLeft = new Image();
picPlayerLeft.src = "./pic/playerLeft.png";
let picPlayerRight = new Image();
picPlayerRight.src = "./pic/playerRight.png";

let arrPicPlayer = [];
arrPicPlayer['left'] = picPlayerLeft;
arrPicPlayer['right'] = picPlayerRight;

let picEnemyLeft = new Image();
picEnemyLeft.src = "./pic/enemyLeft.png";
let picEnemyRight = new Image();
picEnemyRight.src = "./pic/enemyRight.png";

let arrPicEnemy = [];
arrPicEnemy['left'] = picEnemyLeft;
arrPicEnemy['right'] = picEnemyRight;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function resizeImg(img, percent) {
    let prop;
    if (img.width > img.height) {
        prop = img.width / img.height;
        img.height = window.innerHeight * percent / 100;
        img.width = img.height * prop;
    } else {
        prop = img.height / img.width;
        img.width = window.innerHeight * percent / 100;
        img.height = img.width * prop;
    }
}
let startGame = false;
let xPlayer = 50, yPlayer = 740,
    speedPlayer = 5, speedEnemy = 25,
    navPlayer = 'right', navEnemy='right',
    xEnemy = 750, yEnemy = 765;

    
    function boardPic(pic, x , y){
        let picRight, picBottom;
        picRight = x + pic.width;
        picBottom = y + pic.height;
        return [picRight , picBottom]
    }

function draw() {
    let picPlayer = arrPicPlayer[navPlayer];
    let picEnemy = arrPicEnemy[navEnemy];
    resizeImg(picPlayer, 8);
    resizeImg(picEnemy, 5);
    let boardPicPlayer = boardPic(picPlayer,xPlayer,yPlayer);
    let boardPicEnemy = boardPic(picEnemy,xEnemy,yEnemy);

    function startPosition(){
        xPlayer = window.innerWidth*0.05;
        yPlayer = window.innerHeight*0.93-picPlayer.height;

        xEnemy = window.innerWidth*0.85;
        yEnemy = window.innerHeight*0.93-picEnemy.height;
    }

    function moveEnemy(){
        let timerMoveEnemy = setTimeout(()=>{
            if(xEnemy>(xPlayer+picPlayer.width)){
                xEnemy--;
                navEnemy='left'
            }else if((xEnemy+picEnemy.width)<xPlayer){
                xEnemy++;
                navEnemy='right'
            }
            draw();
         moveEnemy();
         },speedEnemy);
        }
        if(startGame){
            startPosition();
            moveEnemy();
            startGame=false;
        }
    ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(picPlayer, xPlayer, yPlayer, picPlayer.width, picPlayer.height);
    ctx.drawImage(picEnemy, xEnemy, yEnemy, picEnemy.width, picEnemy.height);
}

picEnemyRight.onload = picPlayerLeft.onload = picPlayerLeft.onload = picBackground.onload = draw;

document.addEventListener('keydown', (event)=>{
    let KeyPressed = event.code;
    switch (KeyPressed) {
        case 'ArrowLeft':
            xPlayer -= speedPlayer;
            navPlayer = 'left';
            soundStep.play();
            break;
        case 'ArrowRight':
            xPlayer += speedPlayer;
            navPlayer = 'right';
            soundStep.play();
            break;
            case 'Enter':
                startGame=true;
                break
    }
    draw();
});
document.addEventListener('keyup', (event) => {
    let KeyPressed = event.code;
    switch (KeyPressed) {
        case 'ArrowLeft':
            soundStep.pause();
        break;
        case 'ArrowRight':
            soundStep.pause();
        break;
    }
    draw();
});