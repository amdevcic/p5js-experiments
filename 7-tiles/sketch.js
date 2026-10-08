let tileFuncs = Array()
let colors = ["#780000","#c1121f","#003049","#669bbc"]
let bgColor = "#fdf0d5"

function diagTile(x, y, size) {
    if (random() > 0.5) {
        triangle(x, y, x+size, y, x+size, y+size)
    }
    else {
        triangle(x, y+size, x+size, y, x+size, y+size)
    }
}

function roundTile(x, y, size) {
    circle(x, y, size)
}

function semiTile(x, y, size) {
    if (random() > 0.5) {
        arc(x-size/2, y, size, size, -HALF_PI, HALF_PI)
        arc(x+size/2, y, size, size, HALF_PI, -HALF_PI)
    }
    else {
        arc(x, y-size/2, size, size, 0, PI)
        arc(x, y+size/2, size, size, PI, 0)
    }
}

function setup() {
    noLoop()
    let canvasH = 900
    let canvasW = 960
    let c = createCanvas(canvasW, canvasH);
    c.parent("canvas-container");
    ellipseMode(CORNER)
    noStroke()
    tileFuncs[0] = diagTile
    tileFuncs[1] = roundTile
    tileFuncs[2] = semiTile
}

function drawRandomTile(x, y, size) {
    col = random(colors)
    fill(col)
    if (random() < 0.2) {
        rect(x, y, size, size)
        fill(bgColor)
    }
    let func = random(tileFuncs)
    func(x, y, size)
}

function subdivideTiles(x, y, size, lvl, minLvl, maxLvl) {
    if (lvl >= maxLvl || (lvl >= minLvl && random() < 0.4)) {
        drawRandomTile(x, y, size)
    } else {
        subdivideTiles(x, y, size/2, lvl+1, minLvl, maxLvl)
        subdivideTiles(x + size/2, y, size/2, lvl+1, minLvl, maxLvl)
        subdivideTiles(x, y + size/2, size/2, lvl+1, minLvl, maxLvl)
        subdivideTiles(x + size/2, y + size/2, size/2, lvl+1, minLvl, maxLvl)
    }
}

function draw() {
    background(bgColor)
    subdivideTiles(0, 0, width, 0, 2, 4)
}