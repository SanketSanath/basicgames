const canvas= document.getElementById("canvas");
const context= canvas.getContext("2d");
const box= 32;
const ground= new Image();
ground.src="img/ground.png";
const foodImg= new Image();
foodImg.src="img/food.png";

var dead_sound= new Audio();
var down_sound= new Audio();
var eat_sound= new Audio();
var left_sound= new Audio();
var right_sound= new Audio();
var up_sound= new Audio();


dead_sound.src="audio/dead.mp3";
down_sound.src="audio/down.mp3";
eat_sound.src="audio/eat.mp3";
left_sound.src="audio/left.mp3";
right_sound.src="audio/right.mp3";
up_sound.src="audio/up.mp3";

//start playing
function play(){
  
let snake=[];
snake[0]={
  x: 9*box,
  y: 10*box
}

let food={
  x: Math.floor(Math.random()*17+1)*box,
  y: Math.floor(Math.random()*15+3)*box
}

//create score
let score=0;
let d;
document.addEventListener("keydown",direction);

function direction(e){
  if(e.keyCode==37 && d!="RIGHT"){
    d="LEFT";
    left_sound.play();
  }else if(e.keyCode==38 && d!="DOWN"){
    d="UP";
    up_sound.play();
  }else if(e.keyCode==39 && d!="LEFT"){
    d="RIGHT";
    right_sound.play();
  }else if(e.keyCode==40 && d!="UP"){
    d="DOWN";
    down_sound.play();
  }
}

function draw(){
  context.drawImage(ground,0,0);
  
  //draw snake
  for( let i=0;i<snake.length;i++){
    context.fillStyle=(i==0)?"green":"white";
    context.fillRect(snake[i].x,snake[i].y,box,box);
    
    context.strokeStyle="red";
    context.strokeRect(snake[i].x,snake[i].y,box,box);
  }
  context.drawImage(foodImg,food.x,food.y,box,box);
  
  let snakeX= snake[0].x;
  let snakeY= snake[0].y;
  if(snakeX==food.x && snakeY==food.y){
    score++;
    eat_sound.play();
    food={
      x: Math.floor(Math.random()*17+1)*box,
      y: Math.floor(Math.random()*15+3)*box
    }
  }else{
    snake.pop();
  }
  
    //check collision
  function collision(head, array){
    for(var i=1;i<array.length; i++){
      if(array[i].x==head.x && array[i].y==head.y){
        return true;
      }
    }
    return false;
  }
  
  
  if(d=="LEFT") snakeX-=box;
  else if(d=="UP") snakeY-=box;
  else if(d=="DOWN") snakeY+=box;
  else if(d=="RIGHT") snakeX+=box;
  
  let newHead={
    x: snakeX,
    y: snakeY
  }
  snake.unshift(newHead);
  
  
  //game end condition
  if(snakeX<box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
    dead_sound.play();
    clearInterval(game);
  }
  
  
  context.fillStyle="white";
  context.font="45px Changa one";
  context.fillText(score,2*box,1.6*box);
  
}


let game= setInterval(draw,100);
}

play();
var btn= document.querySelector("button");
btn.addEventListener("click",play);