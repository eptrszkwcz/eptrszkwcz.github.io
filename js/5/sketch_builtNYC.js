var PlutoData
var width = 1000
var height = 1000
var coordinate =[]
var builtArea = []
var potential = []
var landuse = []


function preload(){
  var filePath = 'data/MN_Pluto_Scatter.geojson'
  PlutoData = loadJSON(filePath);
  // console.log('shit is lock n loaded!!');
}

function setup(){
  createCanvas(1000,1000);
  background(255,255,255);
  noLoop();
}


function draw(){

  textAlign(LEFT)
  textSize(30)
  textStyle(BOLD)
  text("BUILT NYC",width/40, 40)
  textStyle(ITALIC)
  textSize(14)
  text("VISUALIZING UNDERBUILT AND OVERBUILT LOTS IN MANHATTAN", width/40, 60)

  textAlign(CENTER)
  textStyle(NORMAL)
  textSize(11)
  text("OVERBUILT", width/4,height/4)
  text("UNDERBUILT", width*(2/3), height*(2/3))

  for (var i=0; i<38983; i++){

    builtArea = PlutoData.features[i].properties.BldgArea
    potential = PlutoData.features[i].properties.Potential
    coordinates = PlutoData.features[i].geometry.coordinates
    landuse = PlutoData.features[i].properties.LandUse

    var x_value = log(potential)*78
    if (parseInt(builtArea)===0){
      var y_value = 0
    } else{
      var y_value = log(builtArea)*78
    }


    noStroke()
    if (parseInt(landuse) === 1){
      fill(255,254,85)
      draw_shape(coordinates)
    } if (parseInt(landuse) === 2){
      fill(255,254,85)
      draw_shape(coordinates)
    } if (parseInt(landuse) === 3){
      fill(255,254,85)
      draw_shape(coordinates)
    } if (landuse === 4){
      fill(232,87,0)
      draw_shape(coordinates)
    } if (parseInt(landuse) === 5){
      fill(255,0,0)
      draw_shape(coordinates)
    } if (parseInt(landuse) === 6){
      fill(116,0,232)
      draw_shape(coordinates)
    } else {
      fill(255,255,255)
    }
    stroke(0,0,0)
    line(0,height-95, width-95,0)

    }

function draw_shape (points){
  beginShape()
  for (var j=0; j<points[0][0].length; j++){
    var x_anchor = points[0][0][0][0]
    var y_anchor = points[0][0][0][1]
    var delta_x = x_value-(parseInt((x_anchor-940000)/70))
    var delta_y = y_value-(parseInt((y_anchor-165000)/70))
    var x = points[0][0][j][0]
    var x_mod = (parseInt((x-975000)/70))+delta_x
    // console.log(parseInt(x_mod))
    var y = points[0][0][j][1]
    var y_mod = ((parseInt((y-192000)/70)))+delta_y
    // console.log(y_mod)
    vertex(x_mod, height-y_mod)
  }
  endShape(CLOSE);
}

    }
