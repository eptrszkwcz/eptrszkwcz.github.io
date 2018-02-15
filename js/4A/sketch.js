function setup(){
  var width = 540
  var height = 540
  createCanvas(width,height);
  colorMode(HSB,360,100,100,1)
}

function draw(){
  // rect(width/2,height/2,30,30)
  for (var x=0; x<36; x++){
      for (var y=0; y<36; y++){
        // strokeWeight(0)
        noStroke()
        // stroke(x*(360/36) ,y*(100/36), 100,1)
        fill(x*(360/36) ,y*(100/36), 100,1)
        rect((x*(width/36)), (y*(height/36)), width/36, height/36)
      }
  }

}
