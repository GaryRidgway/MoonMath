const moons = [];
const patternMaths = [];
const lines = [];

document.addEventListener("DOMContentLoaded", function(event) { 
    const numMoons = 11;
    const xOffset = 20;

    // Moon vars.
    const radius = 30;
    const yOffset = 105;
    const separator = 2*radius;
    const period = 2;

    for (let i = 0; i < numMoons; i++) {
        const patternMath = separator - (i * (separator/10*period) + separator)%(2*separator);
        moons.push(new moon(xOffset + radius + (i * separator) + 10*i, yOffset, patternMath))
        patternMaths.push(patternMath);
    }

    moons.forEach(function(moon, index){
        moon.draw();
        // debug(index, patternMaths[index], moon);
    });

    lines.push(new line(xOffset + radius*2, yOffset, xOffset +(numMoons * separator) + radius+10, yOffset));
    lines[0].draw();

});

function debug(index, patternMath, moon) {

    console.log('_____moon ' + index + '____');
    console.log('x·············' + moon.x);
    console.log('maskX·········' + (moon.x + moon.xOffset));
    console.log('patternMath···' + patternMath);
}