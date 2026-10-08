let cellSize = 32
let countX = 20
let countY = 20
let padding = 40
let spacing = 4

function setup() {
  let canvasSize = cellSize*max(countX, countY) + spacing*(countX-1) + padding*2
  let c = createCanvas(canvasSize, canvasSize);
  c.parent("canvas-container");

  // background(255, 0, 0)

  // fill(0)
  // noStroke()
  
  // for (let col=0; col<countX; col+=1) {
  //   for (let row=0; row<countY; row+=1)
  //     ellipse(padding+(col+0.5)*(cellSize+spacing), 
  //             padding+(row+0.5)*(cellSize+spacing), 
  //             cellSize*noise(col/countX*10), 
  //             cellSize*noise(row/countY*10+40));
  // }
}

function draw() {
  background(255, 0, 0)

  fill(0)
  noStroke()
  
  for (let col=0; col<countX; col+=1) {
    for (let row=0; row<countY; row+=1){
      let x = padding+(col+0.5)*(cellSize+spacing)
      let y = padding+(row+0.5)*(cellSize+spacing)
      let scaleFac=constrain(dist(x, y, width/2, height/2)-40, 0, 500)/200;

      circle(x, y, 
            cellSize*map(noise(col/countX*5+frameCount/50+row), 0, 1, 0.05, 1)*scaleFac)
              // cellSize*map(noise(row/countY*5+frameCount/50), 0, 1, 0.05, 1.2))*scaleFac;
      }
  }
}