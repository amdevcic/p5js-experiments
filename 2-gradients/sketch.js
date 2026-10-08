let rows


function setup() {
    let canvasSize = 900
    let c = createCanvas(canvasSize, canvasSize);
    c.parent("canvas-container");
    rows = 20
}

function draw() {
    background(0)
    noStroke()
    for (i=0; i<rows; i+=1) {
        let midpoint = sin(i/rows*2*PI+frameCount/60)
        midpoint = map(midpoint, -1, 1, .3, .7)

        let left_grad = drawingContext.createLinearGradient(0, 0, width*midpoint, 0);
        let right_grad = drawingContext.createLinearGradient(width*midpoint, 0, width, 0);
        left_grad.addColorStop(0, "blue")
        left_grad.addColorStop(1, "white")
        right_grad.addColorStop(0, "blue")
        right_grad.addColorStop(1, "white")
        
        
        drawingContext.fillStyle = left_grad
        rect(0, i*height/rows, width*midpoint+1, height/rows+1)
        
        drawingContext.fillStyle = right_grad
        rect(width*midpoint, i*height/rows, width*(1-midpoint), height/rows+1)
    }
}