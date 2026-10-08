// inspired by the painting "Gestalt Bleu" by Victor Vasarely

let tileSize
let gradientSize
let globalOffset = 0

function setup() {
    // noLoop()
    let canvasH = 1000
    let canvasW = 900
    let c = createCanvas(canvasW, canvasH);
    c.parent("canvas-container");
    tileSize = 40
    gradientSize = 24
}

function setColor(index) {
    let c = paletteLerp([
        [[20, 20, 40], 0],
        [[30, 70, 120], 0.25],
        [[150, 200, 220], 0.5],
        [[30, 70, 120], 0.75],
        [[20, 20, 40], 1]
        ], abs(fract(index/gradientSize)))
    fill(c)
}

function makeGrid(rows, cols, colorOffset=0) {
    for (let j=0; j<rows; j++) {
        for (let i = 0; i < cols; i++) {

            // let factor = (j*cols+i)/(rows*cols)
            let factor = (j + i) / (rows+cols-1)
            fill(lerpColor("blue", "White", factor))
            setColor(i+j+colorOffset+globalOffset)
            
            rect(i*tileSize, j*tileSize, tileSize+1, tileSize+1)
        }
    }
}

function drawAxes(c="yellow") {
    push()

    // axes
    stroke(c);
    strokeWeight(5);
    line(-1000, 0, 1000, 0)
    line(0, -1000, 0, 1000)

    // axis labels
    noStroke()
    fill(c)
    textSize(30)
    text("x", 300, -5)
    text("y", 5, 300)

    pop()
}

function makeTop(w, l, colorOffset=0) {
    push()

    scale(1, 1/sqrt(3))
    rotate(-PI/4)
    makeGrid(w, l, colorOffset)

    pop()
}

function makeFront(w, h, colorOffset=0) {
    push()

    rotate(PI/3)
    scale(1, 1/sqrt(3))
    rotate(-PI/4)
    makeGrid(w, h, colorOffset)

    pop()
}

function makeSide(h, l, colorOffset=0) {
    push()
    
    moveIso(0, h, 0)
    rotate(2*PI/3)
    scale(1, 1/sqrt(3))
    rotate(3*PI/4)
    makeGrid(l, h, colorOffset)

    pop()
}

function moveIso(x, y, z) {
  translate(
    (x + z) * tileSize * Math.SQRT2 / 2,
    ((z - x) * tan(PI/6) + y / cos(PI/6)) * tileSize * Math.SQRT2 / 2
  );
}

function draw() {
    background(0)
    noStroke()
    fill("blue")
    
    translate((width - 8 * tileSize / cos(PI/6) * Math.SQRT2 / 2) / 2, (height + 8 * tileSize/sqrt(3))/2)
    rotate(-PI/6)

    //center block
    push()
    gradientSize = 14
    makeTop(4, 8, 2)
    makeFront(4, 4, 4)
    moveIso(0, 0, 4)
    gradientSize = 20
    makeSide(4, 12, -1)
    pop()
    
    gradientSize = 24
    
    //upper and back area
    push()
    gradientSize = 12
    moveIso(8, -4, 0)
    makeFront(4, 4, -3)
    gradientSize = 20
    moveIso(0, 0, 4)
    makeSide(4, 4, 11)
    gradientSize = 24
    moveIso(0, 0, -8)
    makeTop(8, 4, 9)
    moveIso(-12, 0, 0)
    makeTop(4, 12, -3)
    
    gradientSize = 20
    moveIso(0, 0, 4)
    makeSide(4, 12, 7)
    pop()
    moveIso(-4, 0, 0)
    makeSide(4, 4, 3)   
    
    gradientSize = 24
    // lower area
    moveIso(0, 4, 0)
    makeTop(8, 4, 5)
    moveIso(4, 0, 4)
    makeTop(4, 12, 13)
    // drawAxes()
    globalOffset = sin(frameCount/24)*3
}