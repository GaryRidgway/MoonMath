function setup() {
    createCanvas(400,400, SVG);
}

function draw() {
    noFill();
    stroke('255')
    recursiveCircle(200,200, 300);
    // translate(200,200);
    // rotate(radians(60));
    // circle(0,80, 139)
    // rotate(radians(60));
    // line(0,0,0,150)
    // rotate(radians(120));
    // line(0,0,0,150);
    // rotate(radians(120));
    // line(0,0,0,150)
    noLoop();
}

function recursiveCircle(x, y, diameter, base=40) {
    circle(x, y, diameter);

    if (diameter > base) {
        const newPos = (diameter * 80) / 300;
        const newDiameter = (diameter * 139) / 300;
        push();
            translate(x,y);
            rotate(radians(60));
            recursiveCircle(0,newPos, newDiameter);
            rotate(radians(120));
            recursiveCircle(0,newPos, newDiameter);
            rotate(radians(120));
            recursiveCircle(0,newPos, newDiameter);
        pop();
    }
}