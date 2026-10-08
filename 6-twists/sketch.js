function setup() {
    // noLoop() 
    let canvasH = 1024
    let canvasW = 1024
    let c = createCanvas(canvasW, canvasH);
    c.parent("canvas-container");
    strokeCap(SQUARE)

    background(20, 20, 100)
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            drawCorner(i*128, j*128, 128, 7, floor(random(0, 4)))
            // drawCorner(i*128, j*128, 128, 5, 3)
        }
    }
}

function drawCorner(x, y, size, layers = 5, corner=0) {
    corner = corner % 4
    x = (corner>0 && corner<3) ? x+size : x
    y = (corner < 2) ? y : y+size
    noStroke()
    for (let i=0; i<layers; i++) {
        let fac = i / (layers-1)
        fill(fac * 255);
        fill(paletteLerp([
            ["blue", 0],
            ["white", 0.5],
            ["blue", 1],
        ], fac));
        arc(x, y, size * 2 * (1-i/layers), size * 2 * (1-i/layers), corner * PI / 2, (corner + 1) * PI / 2)
    }
}

function drawArc(x, y, inner_radius = 100, layers = 4, quadrant = 0, reverse = false) {
    noFill()
    strokeWeight(10);
    for (let i = 0; i < layers; i++) {
        let colorIndex = reverse ? layers - 1 - i : i;
        stroke((1 - colorIndex / layers) * 255);
        arc(x, y, inner_radius + i * 20, inner_radius + i * 20, quadrant * PI / 2, (quadrant + 1) * PI / 2);
  }
}

function draw() {

    // let pos_x = floor(mouseX/128)
    // let pos_y = floor(mouseY/128)
    // stroke("magenta")
    // noFill()
    // square(pos_x*128, pos_y*128, 128)


    // // long tube
    // drawArc(500, 0, 250, 9, 0)
    // drawArc(500, 330, 250, 9, 2, true)
    // drawArc(500, 330, 250, 9, 1, true)
    // drawArc(500, 660, 250, 9, 3, false)
    // drawArc(500, 660, 250, 9, 0, false)
    // drawArc(500, 990, 250, 9, 2, true)
    // drawArc(500, 990, 250, 9, 1, true)
}