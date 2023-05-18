const moons = [];
const patternMaths = [];
const lines = [];
const decoLines = [];

document.addEventListener("DOMContentLoaded", function(event) { 
    const svgc = document.getElementById('svgc');
    const numMoons = 11;
    // const color = '#b6c1d2'
    const color = '#FFFFFF'

    // Moon vars.
    const radius = 30;
    const xOffset = 1 + radius;
    const yOffset = 2*radius+1;
    const separator = 2*radius;
    const period = 2;

    // for (let i = 0; i < numMoons; i++) {
    //     const patternMath = separator - (i * (separator/10*period) + separator)%(2*separator);
    //     moons.push(new Moon(xOffset + radius + (i * separator) + 10*i, yOffset, color, patternMath))
    //     patternMaths.push(patternMath);
    // }

    moons.forEach(function(moon, index){
        moon.draw();
        // debug(index, patternMaths[index], moon);
    });

    // lines.push(new line(xOffset + radius, yOffset-radius, xOffset +(numMoons * separator) +10, yOffset-radius, color));
    // lines[0].draw();

    svgc.setAttribute('width', (numMoons*radius*2) +((numMoons-1) * 10) + 2);
    svgc.setAttribute('height', radius*2 + 2);


    // SVGC 2

    // const svgc2 = document.getElementById('svgc-2');
    // const numDegrees = 50;
    // for(let i = 0; i < numDegrees; i++) {
    //     decoLines.push(new line(100, 0, 100, 10, '#fafafa', false, 'svgc-2'));
    //     decoLines[i].draw();
    //     decoLines[i].setLineAttrs((360/numDegrees)*i);
    // }

    const dMoon = new DecoratedMoon(100, 100, '#fafafa', false, 'svgc-2');
    dMoon.draw();


});

function debug(index, patternMath, moon) {

    console.log('_____moon ' + index + '____');
    console.log('x·············' + moon.x);
    console.log('maskX·········' + (moon.x + moon.xOffset));
    console.log('patternMath···' + patternMath);
}