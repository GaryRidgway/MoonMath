document.addEventListener("DOMContentLoaded", function(event) { 
    const numMoons = 11;
    const moons = [
    ]

    const radius = 35;
    const separator = 2*radius + 10;
    for (let i = 0; i < numMoons; i++) {
        const patternMath = separator - (i * (separator/10*2))%(2*separator);
        moons.push(new moon(i, radius + (i * separator), 105, patternMath))
        console.log(patternMath);
    }
    for (let i = 0; i < 0; i++) {
        moons.push(new moon(i + 6, radius + ((i+6) * separator), 105, separator - (0 - (i * (separator/11*2))%separator)*-1))
        console.log(separator - (0 - (i * (separator/11*2))%separator)*-1);
    }

    moons.forEach(function(moon){
        moon.updateMoon();
    });
});