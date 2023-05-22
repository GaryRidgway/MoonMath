class RadialLines extends PSVG {
    constructor() {
        super();

        this.config.merge({
            container: true,
            'is-mask': false,
            r: 0,
            stroke: '#ffffff',
            gap: 0,
            lineLength:0,
            lineCount: 0,
            'stroke-dasharray' : 'none',
        });

        this.config.merge.apply(this.config, arguments);
        
        const gapBetweenMoonAndDecorationLines = this.config.r + this.config.gap;
        const drawDistance = gapBetweenMoonAndDecorationLines + this.config.lineLength;
    
        this.config.merge({
            gapBetweenMoonAndDecorationLines: gapBetweenMoonAndDecorationLines,
            drawDistance : drawDistance
        });

        // Initialize every line.
        this.radialDecorationLines(this.config.lineCount);
    }

    draw() {

        super.draw();
    }

    radialDecorationLines(lineCount) {
        for(let i = 0; i < lineCount; i++) {
            this.render_array.push(
                new NLine(
                    {
                        x: this.config.x,
                        y: this.config.y + this.config.gapBetweenMoonAndDecorationLines,
                        x2: this.config.x, 
                        y2: this.config.y + this.config.gapBetweenMoonAndDecorationLines + this.config.lineLength, 
                        stroke: this.config.stroke,
                        'is-mask': this.config['is-mask'],
                        'svgc-id': this.config['svgc-id'],
                        'stroke-dasharray': this.config['stroke-dasharray'],
                        'transform':'rotate(' + ((360/lineCount)*i) + ')',
                        'transform-origin': (this.config.x) + 'px ' + (this.config.y) + 'px',
                    }
                )
            );
        }
    }
}