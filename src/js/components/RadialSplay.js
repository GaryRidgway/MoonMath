class RadialSplay extends PSVG {
    constructor() {
        const args = Array.prototype.slice.call(arguments, 2);
        super(args);

        // The first argument is the Class (Ex; Line, circle, etc.) to be radially splayed.
        this.obj = arguments[0];

        // The second argument is the config to be set for that object.
        this.objArgs = arguments[1];

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

        this.config.merge.apply(this.config, args);
        
        const gap = this.config.r + this.config.gap;
        const drawDistance = gap + this.config.lineLength;
    
        this.config.merge({
            gap: gap,
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
                new this.obj(
                    this.objArgs,
                    {
                        'transform':'\
                            rotate(' + ((360/lineCount)*i) + ')\
                            translate(0 ' + this.config.gap + ')\
                        ',
                        'transform-origin': (this.config.x) + 'px ' + (this.config.y) + 'px',
                    }
                )
            );
        }
    }
}