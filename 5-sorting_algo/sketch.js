let lineCount
const padding = 100

function setup() {
    let canvasH = 1000
    let canvasW = 900
    let c = createCanvas(canvasW, canvasH);
    c.parent("canvas-container");
    lineCount = 25
}

function generateStepsBubble(count) {
    let source = Array.from({length:count},(e,i)=>i)
    let paths = Array()

    source = shuffle(source)
    paths[0] = [...source]
    
    let swap = false
    for (let i=0; i<count; i++) {
        swap = false
        for (let j=0; j<count-i-1; j++) {
            if (source[j] > source[j+1]) 
            {
                [source[j], source[j+1]] = [source[j+1], source[j]]
                swap = true
            }
        }
        paths[paths.length] = [...source]
        if (!swap)
            { break }
    }

    return paths
}

function generateStepsInsertion(count) {
    let source = Array.from({length:count},(e,i)=>i)
    let paths = Array()

    source = shuffle(source)
    paths[0] = [...source]
    
    let ix = 0
    for (let i=0; i<count; i++) {
        for (let j=0; j<count-i-1; j++) {
            if (source[j] > source[j+1]) 
            {
                [source[j], source[j+1]] = [source[j+1], source[j]]
            }
        }
        paths[paths.length] = [...source]
    }

    return paths
}

function draw() {
    background(210, 210, 200)
    textAlign(CENTER, TOP);
    let figWidth = width - 2 * padding

    let paths = generateStepsBubble(lineCount)

    let scaleFactor = figWidth / ((paths.length-2) * 10)
    strokeWeight(2)

    let x = padding
    for (let i=0; i < paths.length-2; i++) {
        for (let j=0; j<lineCount; j++) {

            let val = paths[i][j]
            let y = padding + (lineCount - paths[i].indexOf(val))*10
            newy = padding +  (lineCount - paths[i+1].indexOf(val))*10

            stroke(lerpColor("blue", "red", val/lineCount))
            line(x, y, x + 10 * scaleFactor, newy)

        }
        x += 10*scaleFactor
    }
    noStroke()
    textSize(18);
    text("Bubble sort", width/2, 370)

    noLoop()
}