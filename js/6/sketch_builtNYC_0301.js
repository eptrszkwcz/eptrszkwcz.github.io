var PlutoData
var width = 1000
var height = 1000
var coordinate =[]
var builtArea = []
var potential = []
var landuse = []
var year = []
var selectedButton = 1


function preload(){
  var filePath = 'data/MN_Pluto_Scatter.geojson'
  PlutoData = loadJSON(filePath);
  console.log('dat shit is lock n loaded!!');
}

function setup(){
  createCanvas(980,905);
  // frameRate(3)
  noLoop();
}

function draw(){
  background(255)
  stroke(0)
  noFill()
  strokeWeight(1)
  rect(width/40,80,800,800);
  strokeWeight(1)
  noStroke();
  draw_labels();
  button();
  if (selectedButton==0){
    legend_landUse();
  } if (selectedButton==1){
    legend_year();
  } if (selectedButton==2){
    legend_lat();
  }

  for (var i=0; i<38983; i++){

    builtArea = PlutoData.features[i].properties.BldgArea
    potential = PlutoData.features[i].properties.Potential
    coordinates = PlutoData.features[i].geometry.coordinates
    landuse = PlutoData.features[i].properties.LandUse
    year = PlutoData.features[i].properties.YearBuilt
    block = PlutoData.features[i].properties.Block

    var x_value = log(potential)*78
    if (parseInt(builtArea)===0){
      var y_value = 0
    } else{
      var y_value = log(builtArea)*78
    }
    if (selectedButton==0){
      draw_FillLandUse()
    } if (selectedButton==1){
      draw_FillYear()
    } if (selectedButton==2){
      draw_FillLat()
    }

    function draw_shape(points){
      beginShape()
      for (var j=0; j<points[0][0].length; j++){
        var x_anchor = points[0][0][0][0]
        var y_anchor = points[0][0][0][1]
        var delta_x = x_value-(parseInt((x_anchor-936000)/70))
        var delta_y = y_value-(parseInt((y_anchor-162000)/70))
        var x = points[0][0][j][0]
        var x_mod = (parseInt((x-975000)/70))+delta_x
        // console.log(parseInt(x_mod))
        var y = points[0][0][j][1]
        var y_mod = ((parseInt((y-192000)/70)))+delta_y
        // console.log(y_mod)
        vertex(x_mod, 960-y_mod)
      }
      endShape(CLOSE);
    }

    function draw_FillLandUse(){
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
        fill(255,156,0)
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
    }

    function draw_FillYear(){
      noStroke()
      if (parseInt(year)<1800){
        year = 1800
      } else if (parseInt(year)>2017){
        year = 2017
      } else {
        year = year
      }

      var w = (parseInt(year)-1800)*1.175
      fill(255-w, 0+w, 232-(w/5))
      draw_shape(coordinates)
    }

    function draw_FillLat(){
      noStroke()
      var w = (parseInt(block)/8.84)
      fill(255-w,255,w)
      draw_shape(coordinates)
    }}
    stroke(0)
    strokeWeight(1.25)
    line(width/40,820, (width/40)+720,81)
    strokeWeight(1)
  }

function draw_labels(){
  fill(0)
  textAlign(LEFT, BOTTOM)
  textSize(30)
  textStyle(BOLD)
  text("BUILT NYC",width/40, 40)
  textStyle(ITALIC)
  textSize(14)
  text("VISUALIZING UNDERBUILT AND OVERBUILT LOTS IN MANHATTAN BY...", width/40, 60)

  textStyle(BOLD)
  textAlign(LEFT, TOP)
  textSize(11)
  text("OVERBUILT", 40, 90)
  textAlign(RIGHT, TOP)
  text("UNDERBUILT", 815, 855)
  textAlign(LEFT, BOTTOM)
  textStyle(NORMAL)
}

function button(){

  noStroke();
  textStyle(ITALIC)
  textAlign(LEFT)
  textSize(14)
  if (selectedButton == 0){
    fill(0);
    text("LAND USE", 525, 60)
    fill(220)
    text("BUILDING AGE", 620, 60)
    text("LATITUDE", 745, 60)
  } if (selectedButton == 1){
    fill(0);
    text("BUILDING AGE", 620, 60)
    fill(220)
    text("LAND USE", 525, 60)
    text("LATITUDE", 745, 60)
  } if (selectedButton == 2){
    fill(0);
    text("LATITUDE", 745, 60)
    fill(220)
    text("LAND USE", 525, 60)
    text("BUILDING AGE", 620, 60)
  }
  // HOVER FUNCTIONALITY - MAKES HTML IMPOSSIBLY SLOW
  // if (mouseX>510&&mouseX<590&&mouseY<60&&mouseY>46){
  //   fill(255)
  //   rect(510,46,80,14)
  //   fill(64, 255, 176);
  //   text("LAND USE", 520, 60)
  // } if (mouseX>610&&mouseX<720&&mouseY<60&&mouseY>46){
  //   fill(255)
  //   rect(610,46,110,14)
  //   fill(64, 255, 176);
  //   text("BUILDING AGE", 615, 60)
  // } if (mouseX>740&&mouseX<820&&mouseY<60&&mouseY>46){
  //   fill(255)
  //   rect(740,46,80,14)
  //   fill(64, 255, 176);
  //   text("LATITUDE", 740, 60)
  // }
}

function legend_landUse(){
  textAlign(LEFT, TOP)
  textStyle(NORMAL)
  textSize(12)
  for (var i=0; i<5; i++){
    if (i==0){
      fill(0)
      text("Residential", (width/40)+845, 81+(20*i))
      fill(255,254,85)
    } else if (i==1){
      fill(0)
      text("Mixed Use", (width/40)+845, 81+(20*i))
      fill(255,156,0)
    } else if (i==2){
      fill(0)
      text("Commercial", (width/40)+845, 81+(20*i))
      fill(255,0,0)
    } else if (i==3){
      fill(0)
      text("Industrial", (width/40)+845, 81+(20*i))
      fill(116,0,232)
    } else if (i==4){
      fill(0)
      text("Vacant", (width/40)+845, 81+(20*i))
      fill(50)
    }
    rect((width/40)+820, 80+(20*i), 15, 15)
    fill(0)
  }
}

function setGradient1(x, y, w, h){
  for (var i = 0; i < h; i++) {
    fill(255-(i*2.684), i*2.864, 232-(i*0.536))
    rect(x,y+i, w,1)

   }
}

function setGradient2(x, y, w, h){
  for (var i = 0; i < h; i++) {
    fill(0+(i*2.684), 255, 255-(i*2.684))
    rect(x,y+i, w,1)
   }
}

function legend_year(){
  fill(0)
  textAlign(LEFT, TOP)
  textStyle(NORMAL)
  textSize(12)
  text("200+ years", (width/40)+845, 81)
  text("0 years", (width/40)+845, 161)
  setGradient1((width/40)+820, 80, 15, 95)
}

function legend_lat(){
  fill(0)
  textAlign(LEFT, TOP)
  textStyle(NORMAL)
  textSize(12)
  text("N (Innwood)", (width/40)+845, 81)
  text("S (South Ferry)", (width/40)+845, 161)
  setGradient2((width/40)+820, 80, 15, 95)
}

function mousePressed(){
  if (mouseX>510&&mouseX<590&&mouseY<60&&mouseY>46){
    selectedButton=0
    redraw();
  } else if (mouseX>610&&mouseX<720&&mouseY<60&&mouseY>46){
    selectedButton=1
    redraw();
  } else if (mouseX>740&&mouseX<820&&mouseY<60&&mouseY>46){
    selectedButton=2
    redraw();
}}
