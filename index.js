let inputDir = {x:0, y:0};
//const foodSound = new Audio();
//const gameOverSound = new Audio();
//const musicSound = new Audio();
//const moveSound = new Audio();
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{x:13, y:15}];
let food = {x:6, y:7};
let score = 0;
let time = 0;
let highscore = 0;


//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed ){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){

    //highscore

    if (score>highscore){
        highscore = score;
    }
    //bumping into urself

    for (let i = 1; i < snakeArr.length; i++) {

        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            return true;
        }

        time++;
        
    }

    //bumping into the wall

    if ((snakeArr[0].x >= 18 || snakeArr[0].x <=0) || (snakeArr[0].y >= 18 || snakeArr[0].y <=0 )){
        return true;
    }

    
    return false;
}

function gameEngine(){

    


    // updating the things
    if (isCollide(snakeArr)){
        inputDir = {x:0, y:0};
        snakeArr = [{x:13, y:15}];
        score = 0;
        document.getElementById("over").style.opacity = 1;
        time = 0;
    }





    // increase the score and respawn the food 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        score++;
        document.getElementById("score").textContent = score;
        food = {x: Math.round(a +(b-a)*Math.random()), y: Math.round(a +(b-a)*Math.random())}
        
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    // displaying the food 

}





//Main Logic starts here
document.getElementById("over").style.opacity = 0;

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    if (time===0){
        document.getElementById("score").textContent = score;
    }
    inputDir = {x:0, y:1} //Start the gmae
    document.getElementById("over").style.opacity = 0;

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});