var canvas= document.getElementById("canvas");
var context=canvas.getContext("2d");

var bg= new Image();
var fg= new Image();
var bird= new Image();
var pipeNorth= new Image();
var pipeSouth= new Image();

bg.src="images/bg.png";
fg.src="images/fg.png";
bird.src="images/bird.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";

var fly = new Audio();
var scor = new Audio();
var dead= new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
dead.src= "sounds/dead.mp3";


//start playing
function play(){
  //some constant
var score=0;
var constant= 242+80;
var bx=15;
var by=100;
var gravity=1.5;
var pipe=[];
pipe[0]={
  x: canvas.width,
  y:0,
}

//on key press
document.addEventListener("keydown",moveUp);
  
function moveUp(){
  by-=20;
  fly.play();
}

//start drawing on canvas
function draw(){
  context.drawImage(bg,0,0);
  context.drawImage(bird,bx,by);
  by+=gravity;
  
  //draw pipes
  for(var i=0;i<pipe.length;i++){
    context.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
    context.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
    
    //detect collision
    if((bx+bird.width>pipe[i].x && bx<pipe[i].x+pipeNorth.width) && (by<pipe[i].y+pipeNorth.height || by+bird.height>pipe[i].y+constant) || by+bird.height>canvas.height-fg.height){
      
      cancelAnimationFrame(requestId);
      dead.play();
      context.drawImage(fg,0,canvas.height-fg.height);
      //draw score
      context.fillStyle="black";
      context.font="25px verdana";
      var text="Score: "+score;
      context.fillText(text,20,480);
      return;
    }
    pipe[i].x-=1;
    
    if(pipe[i].x+pipeNorth.width==15){
      score++;
      scor.play();
    }
    
    if(pipe[i].x==100){
      pipe.unshift({
        x:canvas.width,
        y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
      });
    }
    if(pipe[i].x<-pipeNorth.width){
      pipe.pop(); 
    }
  }
  context.drawImage(fg,0,canvas.height-fg.height);
  //draw score
  context.fillStyle="black";
  context.font="25px verdana";
  var text="Score: "+score;
  context.fillText(text,20,480);
  
  var requestId=requestAnimationFrame(draw);
}//end of draw

draw();
}

play();
var btn= document.querySelector("button");
btn.addEventListener("click",play);