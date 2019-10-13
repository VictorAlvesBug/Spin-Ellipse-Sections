let increment = 0;

function setup() {
    createCanvas(700, 700);
}

function draw() {
    background(0);

    //GET SCREEN SIZE AND DECREMENT 50 PX OF THE DIMENSIONS 
    let w = width - 50;
    let h = height - 50;

    for (let layer = 13; layer >= 1; layer--) {
        //13 --> DRAW THE OUTER LAYER THAT SPINS FASTLY
        //1 --> DRAW THE INNER LAYER THAT SPINS SLOWLY

        //DRAW ONE OF THE LAYER
        drawEllipseSections(w, h, (increment * layer));

        //EACH ITERATION DECREMENT 50 PX OF THE DIMENSIONS 
        w -= 50;
        h -= 50;
    }

    //INCREMENT ANGLE TO THE LAYERS ROTATION
    increment += 0.005;
}

function drawEllipseSections(w, h, index) {

    //ALL THE TRANSLATIONS AND ROTATIONS
    //BETWEEN PUSH() AND POP() WILL BE UNDONE 
    //AFTER THE BLOCK RESPECTIVE POP()
    push();
    //(0,0) IS NOW AT THE SCREEN CENTER 
    translate(width / 2, height / 2);

    //THE SECTION IS 1/20 OF THE CIRCUNFERENCE
    let section = (TWO_PI / 20);

    //ROTATE BY index --> (increment * layer)
    rotate(index);

    for (let i = 0; i < 20; i += 2) {

        //THE FOLLOWING SHAPES WILL NOT HAVE EDGE
        noStroke();
        
        colorMode(HSB);

        //i GOES FROM 0 TO 20 WHILE myColor GOES FROM 0 TO 360
        let myColor = map(i, 0, 20, 0, 360);

        //THE FOLLOWING SHAPES WILL HAVE THIS COLOR
        fill(myColor, 255, 255);

        //BEGIN A SHAPE
        beginShape();
        //RUNS AT THE OUTER PART OF THE SECTION
        for (let angle = i * section; angle <= (i + 1) * section; angle += 0.001) {
            vertex((w / 2) * cos(angle + section), (h / 2) * sin(angle + section));
        }
        //RUNS AT THE INNER PART OF THE SECTION
        for (let angle = (i + 1) * section; angle >= i * section; angle -= 0.001) {
            vertex((w / 2 - 26) * cos(angle + section), (h / 2 - 26) * sin(angle + section));
        }
        //END THE SHAPE (CONNECT THE START AND THE END POINT)
        endShape(CLOSE);
    }

    pop();

}