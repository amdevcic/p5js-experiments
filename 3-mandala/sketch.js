function setup() {
  let canvasSize = 700
  let c = createCanvas(canvasSize, canvasSize);
  c.parent("canvas-container");

}

function repeatRadial(offset, count, draw_func) {
    for (let i = 0; i < count; i++) {
        let angle = 2*PI*i/count + frameCount/200;
        let x = offset * cos(angle) + width/2
        let y = offset * sin(angle) + height/2
        draw_func(x, y, angle);
    }
}

function petal(radius) {
    noStroke()
    // fill(color)
    return function (x, y, angle) {
        circle(x, y, radius*2-1)
        triangle(width/2, height/2, x+radius*sin(angle), y-radius*cos(angle), x-radius*sin(angle), y+radius*cos(angle))
    }
}

function draw() {
    background(0, 0, 0)

    let myGradient = drawingContext.createRadialGradient(width/2, height/2, 120, width/2, height/2, 300);
    myGradient.addColorStop(0, "blue")
    myGradient.addColorStop(1, "white")
    drawingContext.fillStyle = myGradient
    repeatRadial(240-40*(sin(frameCount/200)+1)/2, 7, petal(100))

    fill("red")
    circle(width/2, height/2, 400)
    
    fill("blue")
    repeatRadial(140-40*(sin(frameCount/200)+1)/2, 10, petal(30+20*(sin(frameCount/200)+1)/2))

    fill("white")
    repeatRadial(60+20*(sin(frameCount/200)+1)/2, 5, petal(20))    
}