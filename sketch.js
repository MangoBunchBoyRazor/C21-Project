//Creating the objects
var bullet = new sprite(50,150,50,50);
var wall = new sprite(1300,100,50,200);

//Creating the essential variables
var speed,weight,state,thickness,damage1;

function setup() {
  createCanvas(windowWidth,400);

  speed = round(random(223,321)); //Defining speed of the bullet
  weight = round(random(30,52)); //Defining weight of the bullet
  thickness = round(random(10,100));
  state = "start";  //variable to keep the track of the program
}
function draw() {
  background(200);  

  let c = color(255,255,255);

  //Calling function to calculate damage of the wall after bullet has hit it
  if(hasCollided(bullet,wall)){
    c = damage();
  }

  fill(c);
  wall.display();
  push();
  fill(255);
  bullet.display();
  pop();

  wall.width = thickness;
  wall.x = 1300 - thickness;

  push(); //Creating a new drawing state
  fill(0);
  textAlign(CENTER);
  textSize(20);
  //Displaying the instructions
  if(state === "start")
    text("Press enter to start",150,100);
  else if(state === "over")
    text("Press r to restart",150,100);
  pop();

  push(); //Creating a new drawing state
  textAlign(LEFT);
  textSize(15);
  fill(0)
  //Displaying the current speed and weight
  text("Speed: "+speed,50,375);
  text("Bullet weight: "+weight,200,375);
  text("Wall thickness: "+thickness,380,375);
  text("Click below to change the values",50,350);
  pop();
}
function keyPressed(){
  //Starting the simulation
  if(keyCode === ENTER && state === "start"){
    bullet.weight = weight;
    bullet.velocityX = round(speed/4);
  }
  //Restarting the simulation
  if(key === 'r' && state === "over"){
    state = "start";
    weight = round(random(30,52));
    speed = round(random(223,321));
    thickness = round(random(10,100));
    bullet.x = 50;
    fill(255);
  }
  if(keyCode === ENTER && state === "edit"){
    fill(255);
    state = "start";
    if(i === "speed")
      setSpeed();
    else if(i === "weight")
      setWeight();
    else if(i === "thickness")
      setThickness();
  }
}
function hasCollided(object1,object2){
  //Testing for collision
  if(object1.x+object1.width>object2.x){    
    object1.velocityX = 0;  //Setting the car velocity to 0
    object1.x = object2.x - object1.width + 10;
    
    return true;
  }
  return false;
}
function damage(){
  damage1 = Math.round((0.5 * weight * (speed * speed)) / (thickness*thickness*thickness)); 
  let c = 0;

  textAlign(CENTER);
  textSize(25);
  push(); //Starting a new drawing state
  fill(0);
  text("Wall damage :"+damage1,windowWidth/2,100); //Displaying the deformation
  pop();
  
  //Changing the object color and displaying relative text according to the damage
  if(damage1 > 10){
    fill(255,0,0);    //Changing the object color to red
    text("Wall is not effective against bullet",windowWidth/2,150);  //Displaying unsafe message
    state = "over"; //Changing the state to over
    c = color(255,0,0);
  }
  else{
    fill(0,255,0);    //Changing the object color to green
    text("Wall is effective against bullet",windowWidth/2,150);  //Displaying safe message
    state = "over"; //Changing the state to over
    c = color(0,255,0);
  }
  return c;
}
var inp = 0,button = 0,i = 0;
function mouseClicked(){
  if(mouseX > 50 && mouseX < 90 && mouseY > 360 && mouseY < 390){ 
    if(inp != 0){
      inp.remove();
      button.remove();
    }                                                               //create a text 
    createObjects("speed",setSpeed,100,440,50);                    //placeholder to 
  }                                                                //edit the speed
  else if(mouseX > 200 && mouseX < 270 && mouseY > 360 && mouseY < 390){
    if(inp != 0){
      inp.remove();
      button.remove();
    }                                                                    //create a text 
    createObjects("weight",setWeight,280,440,50);                        // placeholder to
  }                                                                      // edit the weight
  else if(mouseX > 380 && mouseX < 500 && mouseY > 360 && mouseY < 390){
    if(inp != 0){
      inp.remove();
      button.remove();
    }                                                         //create a text 
    createObjects("thickness",setThickness,480,440,50);       //placeholder to 
  }                                                           //edit the thickness
}
function createObjects(value,callback,x,y,size){
  inp = createInput(value); //Creating the text placeholder
  inp.position(x,y);    
  inp.size(size,14);
  button = createButton('ok');  //Creating a button
  button.position(inp.x + inp.width,inp.y);
  button.mouseClicked(callback);  //Calling the setspeed function if the mouse is clicked on it
  state = "edit";
  i = value;
}
function setSpeed(){
  if(isNaN(inp.value())){
    console.error("Please enter only numbers");
  }
  else if(inp.value() >= 223 && inp.value() <= 321){
    speed = inp.value();
    state = "start";
    bullet.x = 50;
  }
  else{
    console.error("Please enter value between 223 and 321");
  }
  inp.remove();
  button.remove();
  return 0;
}
function setWeight(){
  if(inp.value() === "weight" || isNaN(inp.value())){
    console.error("Please enter only numbers");
  }
  else if(inp.value() >= 10 && inp.value() <= 100){
    weight = inp.value();
    state = "start";
    bullet.x = 50;
  }
  else{
    console.error("Please enter value between 10 and 100");
  }
  inp.remove();
  button.remove();
  return 0;
}
function setThickness(){
  if(isNaN(inp.value())){
    console.error("Please enter only numbers");
  }
  else if(inp.value() <= 100 && inp.value() >= 10){
    thickness = inp.value();
    state = "start";
    bullet.x = 50;
  }
  else{
    console.error("Please enter value between 10 and 100");
  }
  inp.remove();
  button.remove();
  return 0;
}
