var width = 540;
var height = 540;
var circleX = 20;
var circleY = circleX;
var circleMax = width/circleX + (0.4*(width/circleX));

function setup(){
  var width = 540;
  var height = 540;
  createCanvas(width,height);
  colorMode(HSB,360,100,100,1);
}

function draw(){
  createCanvas(width,height);
  background(0,0,100,1)

  for (var x=0; x<circleX; x++){
      for (var y=0; y<circleY; y++){
        var circleR = (dist(0.5*(width/circleX)+(x*(width/circleX)) , 0.5*(height/circleY)+(y*(height/circleY)),mouseX, mouseY))/6
        var centerX = 0.5*(width/circleX)+(x*(width/circleX))
        var centerY = 0.5*(height/circleY)+(y*(height/circleY))

        if (circleR < circleMax){
          strokeWeight(1);
          noStroke();
          fill(135,100,100-(circleR)*1.25,1)
          ellipse(centerX, centerY, circleR, circleR)
        } else {
          strokeWeight(1);
          noStroke();
          fill(135,100,100-(circleR)*1.25,1)
          ellipse(centerX, centerY, circleMax, circleMax)
        }
      }
  }
}
