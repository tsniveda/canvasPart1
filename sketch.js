var currentStroke, allStrokes;

var red, blue, green, yellow;

var pickedColor;
var clear, clearImage;

function preload(){
  clearImage = loadImage('images/clear.png');
}

function setup() {

  createCanvas(windowWidth,windowHeight);

  currentStroke = [];
  allStrokes = [];
  pickedColor = "white";

  createColorChooser();

  clear = createSprite(windowWidth- 100, 50, 10, 10);
  clear.addImage("clear", clearImage);
  clear.scale = 0.4;
}

function draw() {
  background("black");

  stroke(pickedColor);
  strokeWeight(3);
  
  

  for(var j = 0 ; j < allStrokes.length; j++){
    var oldStroke = allStrokes[j];
    stroke(oldStroke.strokeColor);
    drawStroke(oldStroke.oldStroke);
  }

  drawStroke(currentStroke);

  checkColorPicked();

  if(mousePressedOver(clear)){
    allStrokes = [];
    currentStroke = [];
  }

  drawSprites();
}

function mouseDragged(){
  var position = {
    x: mouseX, 
    y: mouseY
  };

  if(position.x > 0 && position.x < windowWidth && position.y > 0 && position.y < windowHeight){
    currentStroke.push(position);
  } else {
    console.log("Mouse gone out");
    allStrokes.push({
      'oldStroke' : currentStroke,
      'strokeColor' : pickedColor  
    });
    currentStroke = [];
  }
}


function mouseReleased(){
  allStrokes.push({
    'oldStroke' : currentStroke,
    'strokeColor' : pickedColor  
  });
  currentStroke = [];
}

function drawStroke( strokeArray ){
  for(var i = 1 ; i < strokeArray.length; i++){
    line ( strokeArray[i-1].x , strokeArray[i-1].y , strokeArray[i].x, strokeArray[i].y );
  }
}

function createColorChooser(){

  red = createSprite(windowWidth - 100, 100, 20, 20 );
  red.shapeColor = "red";

  blue = createSprite(windowWidth - 50, 100, 20, 20 );
  blue.shapeColor = "blue";

  green = createSprite(windowWidth - 100, 150, 20, 20 );
  green.shapeColor = "green";

  yellow = createSprite(windowWidth - 50, 150, 20, 20 );
  yellow.shapeColor = "yellow";
}

function checkColorPicked(){
  if(mousePressedOver(red))
    pickedColor = "red";
  else if(mousePressedOver(blue))
    pickedColor = "blue";
  else if(mousePressedOver(green))
    pickedColor = "green";
  else if(mousePressedOver(yellow))
    pickedColor = "yellow";
}
