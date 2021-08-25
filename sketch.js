var balloon,balloonImage1,balloonImage2;


function preload(){
   bg = loadImage("cityImage.png");
   balloonImage1 = loadAnimation("hotairballoon1.png");
   balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }


function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
}

function draw() {
  background(bg);
  airpos = database.ref('ballon/height')
  airpos.on("value",readdata,showerror)

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,1);
  }

  drawSprites();
}

function changePosition(x,y){
  database.ref('ballon/height').set(
      {
          'x' : position.x + x,
          'y' : position.y + y
      }
  )

  
}

function readdata(data){
  position = data.val();
  balloon.x = position.x
  balloon.y = position.y
}

function showerror(){
  console.log("failed to fetch the data")
}
