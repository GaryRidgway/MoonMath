function RadialLines(config) {
    this.svgc = document.querySelector('#' + config.svgc);
    if (config.mask) {
        this.svgc = this.svgc.querySelector('defs #mask');
    }

    if(!this.svgc) {
        console.error('No SVG Canvas found.');
    }

    this.svg_radial_lines_id = ID();
    this.x = config.x;
    this.y = config.y;
    this.color = config.color;

    this.radius = config.radius;
    this.gapBetweenMoonAndDecorationLines = 20;
    this.decorationLineLength = 10;

    this.draw = function() {
        this.radialDecorationLinesData['lines'].forEach(function(line, index) {
            line.draw();
        });

        this.attenuate();
    }

    this.attenuate = function() {
        const lineCount = this.radialDecorationLinesData['lineCount'];
        const coords = {x: this.x, y: this.y}
        const radius = this.radius;
        this.radialDecorationLinesData['lines'].forEach(function(line, index) {
            line.setLineAttrs(
                (360/lineCount)*index,
                (coords.x) + 'px ' + (coords.y) + 'px',
                1
            );
        });
    }

    this.radialDecorationLinesData = {
        'lines': [],
        'lineCount': 0
    };
    this.drawDistance = this.gapBetweenMoonAndDecorationLines + this.decorationLineLength;
    this.radialDecorationLines = function(lineCount) {
        for(let i = 0; i < lineCount; i++) {
            this.radialDecorationLinesData['lines'].push(new line(this.x, this.y + this.drawDistance + this.radius, this.x, this.y + this.gapBetweenMoonAndDecorationLines + this.radius, config.color, config.mask, config.svgc));
            this.radialDecorationLinesData['lineCount']++;
        }
    }
    this.radialDecorationLines(50);
}