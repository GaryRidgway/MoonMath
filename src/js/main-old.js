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
    const xOffset = radius;
    const yOffset = 2*radius;
    const separator = 2*radius;
    const period = 2;

    for (let i = 0; i < numMoons; i++) {
        const patternMath = separator - (i * (separator/10*period) + separator)%(2*separator);
        moons.push(
            new Moon(
                {
                    'is-mask': true,
                    x: xOffset + radius + (i * separator) + 10*i,
                    y: yOffset,
                    r: radius,
                    container: false,
                    xOffset: patternMath,
                    fill: color
                }
            )
        )
        patternMaths.push(patternMath);
    }

    moons.forEach(function(moon, index){
        moon.draw();
        // debug(index, patternMaths[index], moon);
    });

    const line = new Line({
        'is-mask': true,
        x: xOffset + radius*2 - 1,
        y: yOffset,
        x2: xOffset +(numMoons * separator) + radius + 10 + 1,
        y2: yOffset,
        stroke: color
    });
    line.draw();

    const dMoon = new DecoratedMoon({
        x: 300,
        y: 300,
        r: 100,
        'is-mask': true,
        svgc: 'svgc',
        gap: 25,
        lineLength: 10,
        objCount: 50,
    });
    dMoon.draw();

    // visualDebug({x:100, y:100},'#svgc');

});

function debug(index, patternMath, moon) {

    console.log('_____moon ' + index + '____');
    console.log('x·············' + moon.x);
    console.log('maskX·········' + (moon.x + moon.xOffset));
    console.log('patternMath···' + patternMath);
}

function visualDebug(position, svgc) {
    color = 'red';
    document.querySelector(svgc).innerHTML += '<circle cx="100" cy="100" r="5" fill="' + color + '">';
    document.querySelector(svgc).innerHTML += '<line stroke="' + color + '" x1="' + (position.x - 50) + '"  y1="' + (position.y) + '" x2="' + (position.x + 50) + '" y2="' + (position.y) + '"stroke-width="1" />';
    document.querySelector(svgc).innerHTML += '<line stroke="' + color + '" x1="' + (position.x) + '"  y1="' + (position.y - 50) + '" x2="' + (position.x) + '" y2="' + (position.y + 50) + '"stroke-width="1" />';
}