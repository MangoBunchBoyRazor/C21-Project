//Creating a class to make objects
class sprite{
    //Defining properties
    constructor(xPos,yPos,width,height){
      this.x = xPos;
      this.y = yPos;
      this.height = height;
      this.width = width;
      this.velocityX = 0;
      this.velocityY = 0;
      this.weight = 0;
    }
    //Function to display the object
    display(){
      rect(this.x,this.y,this.width,this.height);
  
      //Moving the object
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }