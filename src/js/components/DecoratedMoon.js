function DecoratedMoon(x, y, color, mask=true, svgc='svgc') {
    this.svgc = document.querySelector('#' + svgc);
    if (mask) {
        this.svgc = this.svgc.querySelector('defs #mask');
    }

    if(!this.svgc) {
        console.error('No SVG Canvas found.');
    }

    this.svg_decorated_moon_id = ID();
    this.x = x;
    this.y = y;
    this.color = color;
    // this.xOffset = xOffset;
    // this.yOffset = yOffset;
    this.radius = 30;
    this.gapBetweenMoonAndDecorationLines = 20;
    this.decorationLineLength = 10;

    

    this.draw = function() {
        if (!document.querySelector('#svg_decorated_moon_id-' + this.svg_decorated_moon_id)) {
            this.svgc.innerHTML += this.initDecoratedMoonHtml();
        }

        
        this.rotationalDecorationLinesData['lines'].forEach(function(line, index) {
            line.draw();
        });

        this.decorationMoonData['moons'].forEach(function(moon, index) {
            moon.draw();
        });

        this.attenuate();
    }

    this.attenuate = function() {
        const lineCount = this.rotationalDecorationLinesData['lineCount'];
        const coords = {x: this.x, y: this.y}
        const radius = this.radius;
        this.rotationalDecorationLinesData['lines'].forEach(function(line, index) {
            line.setLineAttrs(
                (360/lineCount)*index,
                (coords.x - radius) + 'px ' + (coords.y - radius) + 'px',
                1
            );
        });
    }

    this.initDecoratedMoonHtml = function() {

    }

    this.rotationalDecorationLinesData = {
        'lines': [],
        'lineCount': 0
    };
    this.drawDistance = this.gapBetweenMoonAndDecorationLines + this.decorationLineLength;
    this.rotationalDecorationLines = function(lineCount) {
        for(let i = 0; i < lineCount; i++) {
            this.rotationalDecorationLinesData['lines'].push(new line(this.x - this.radius, this.y + this.drawDistance, this.x - this.radius, this.y + this.gapBetweenMoonAndDecorationLines, '#fafafa', false, svgc));
            this.rotationalDecorationLinesData['lineCount']++;
        }
    }
    this.rotationalDecorationLines(50);

    this.decorationMoonData = {
        'moons': []
    };
    this.decorationMoons = function() {
        for(let i = 0; i < 1; i++) {
            this.decorationMoonData['moons'].push(new Moon(this.x, this.y, '#fafafa', 20, 0, false, svgc));
        }
    }
    this.decorationMoons();
}