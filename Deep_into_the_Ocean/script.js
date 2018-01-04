var canvas= document.getElementById("canvas");
var context= canvas.getContext("2d");

var bg= new Image();
var man= new Image();
var red= new Image();
var star= new Image();
var spiral= new Image();

bg.src="images/bg.png";
man.src="images/man.png";
star.src="images/star.png";
red.src="images/red.png";
spiral.src="images/spiral.png";

var dead_sound=new Audio();
var down_sound=new Audio();
var score_sound=new Audio();
var up_sound=new Audio();

dead_sound.src="audio/dead.mp3";
down_sound.src="audio/down.mp3";
score_sound.src="audio/score.mp3";
up_sound.src="audio/up.mp3";


//start playing
function play(){
  //constants
var mx=30;
var my=140;
var score=0;
var o2_level=100;
var star_arr=[{x: 600, y: Math.floor((Math.random()*273)+200), speed: Math.random()+2,}];
var spiral_arr=[{x: 1200, y: Math.floor((Math.random()*173)+300), speed: Math.random()+2.5,}];
var red_arr=[{x: 900, y: Math.floor((Math.random()*273)+200), speed: Math.random()+2,}];

//key event
document.addEventListener("keydown",callback_fun);
function callback_fun(e){
  var key= e.keyCode;
  if(key==38 && my>140){
    my-=10;
    up_sound.play();
  }
  if(key==40 && my<480){
    my+=10;
    down_sound.play();
  }
}
//start drawing
function draw(){
  context.drawImage(bg,0,0);
  context.drawImage(man,mx,my);
  
  //draw the stars
  for(var i=0;i<star_arr.length;i++){
    context.drawImage(star,star_arr[i].x,star_arr[i].y);
    star_arr[i].x-=star_arr[i].speed;
    
    if(star_arr[i].x<452 && star_arr[i].x>450|| star_arr[i].x<83 && star_arr[i].x>81){
      if(star_arr.length<5){
        star_arr.push({x:600,y: Math.floor((Math.random()*273)+200),speed: Math.random()+2,});
      }
    }
    //if no element, then push one
    if(star_arr.length<1){
      star_arr.push({x:600,y: Math.floor((Math.random()*273)+200),speed: Math.random()+2,});
    }
    
    //increament in score
    if((star_arr[i].x<mx+40 && star_arr[i].x>mx+10) && (star_arr[i].y+15>my && star_arr[i].y<my+15)){
      score++;
      score_sound.play();
      star_arr.splice(i,1);
    }
    
    //pop the star which croses the canvas
    if(star_arr[i].x<-20){
      star_arr.splice(i,1);
    }
  }//end of star drawing
  
  //draw spiral
 for(var i=0;i<spiral_arr.length;i++){
    context.drawImage(spiral,spiral_arr[i].x,spiral_arr[i].y);
    spiral_arr[i].x-=spiral_arr[i].speed;

   //increament in score
   if((spiral_arr[i].x<mx+40 && spiral_arr[i].x>mx+10) && (spiral_arr[i].y+15>my && spiral_arr[i].y<my+15)){
      score+=5;
      score_sound.play();
      spiral_arr.push({x: 1000, y: Math.floor((Math.random()*173)+300), speed: Math.random()+2.5,});
      spiral_arr.splice(i,1);
    }
   
    //pop the spiral which croses the canvas and insert one
    if(spiral_arr[i].x<-20){
      spiral_arr.push({x: 1000, y: Math.floor((Math.random()*173)+300), speed: Math.random()+2.5,});
      spiral_arr.splice(i,1);
    }
  }//end of spiral drawing
  
  //draw red
  for(var i=0;i<red_arr.length;i++){
    context.drawImage(red,red_arr[i].x,red_arr[i].y);
    red_arr[i].x-=red_arr[i].speed;
    
    //if no element, then push one
    if(red_arr.length<2){
      red_arr.push({x: 900, y: Math.floor((Math.random()*273)+200), speed: Math.random()+2,});
    }
    
    //increament in score
    if((red_arr[i].x<mx+40 && red_arr[i].x>mx+10) && (red_arr[i].y+15>my && red_arr[i].y<my+15)){
      context.fillStyle="white";
      context.font="verdana";
      context.fillText("Player Died Due to Eating poisonous Fish",100,300,400);
      dead_sound.play();
      updateScoreAndO2();
      
      return;
      red_arr.splice(i,1);
    }
    
    //pop the red which croses the canvas
    if(red_arr[i].x<-20){
      red_arr.splice(i,1);
    }
  }//end of red drawing
  
  //decrease o2Level
  if(my<150) o2_level=100;
  else if(score<15)
    o2_level-=.15;
  
  else if(score<30)
    o2_level-=.25;
  
  else
    o2_level-=.3;
  
  //update score
  updateScoreAndO2();
  
  
  //end of game
  
  if(o2_level<0){
    context.fillStyle="white";
    context.font="verdana";
    context.fillText("Player Died Due to Lack of Oxigen",100,300,400);
    dead_sound.play();
    return;
  }
  
  function updateScoreAndO2(){
    context.font="20px verdana";
    var gradient= context.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0","red");
    gradient.addColorStop("0.1","blue");
    context.fillStyle=gradient;
    context.fillText("score: "+score,10,120);
    var battery_x= parseFloat(Math.round(o2_level*100)/100).toFixed(2);
    context.strokeStyle="#283593";
    if(o2_level<22){
      context.fillStyle="#f44336";
    }
    else{
      context.fillStyle="#8c9eff";
    }
    context.fillRect(450,70,battery_x,50);
    context.strokeRect(450,70,100,50);
    context.strokeRect(552,90,2,10);
    
  }
  
  requestAnimationFrame(draw);
}//end of drawing
draw();
}

play();
var btn= document.querySelector("button");
btn.addEventListener("click",play);