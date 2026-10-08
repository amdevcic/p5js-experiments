let tileFuncs = Array()
let colors = [ 
                "#cc241d",
                "#fb4934",
                "#fe8019",
                "#fabd2f",
                "#98971a",
                "#689d6a",
                "#458588",
            ]
let bgColor = "#32302f"

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
    let canvasH = 1600
    let canvasW = 2560
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
        if (x/width > randomGaussian(0.6, .13)) {
            drawRandomTile(x, y, size)
        }
    } else {
        subdivideTiles(x, y, size/2, lvl+1, minLvl, maxLvl)
        subdivideTiles(x + size/2, y, size/2, lvl+1, minLvl, maxLvl)
        subdivideTiles(x, y + size/2, size/2, lvl+1, minLvl, maxLvl)
        subdivideTiles(x + size/2, y + size/2, size/2, lvl+1, minLvl, maxLvl)
    }
}

function draw() {
    background(bgColor)
    subdivideTiles(0, 0, width, 0, 4, 6)
}