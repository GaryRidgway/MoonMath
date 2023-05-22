class DecoratedMoon extends PSVG {
    constructor() {
        super();

        this.config.merge({
            container: true,
            stroke: '#ffffff',
            gap: 0,
            lineLength:0,
            lineCount: 0,
        });

        this.config.merge.apply(this.config, arguments);

        this.config.merge({
        });

        this.initDecoratedMoonHtml();
    }

    draw() {
        this.render_array.forEach(function(element) {
            element.draw();
        });
    }

    initDecoratedMoonHtml() {
        this.render_array.push(new RadialLines(this.config));

        const newCNF1 = 
        {
            container: false,
            r: this.config.r + this.config.gap
        };
        
        this.render_array.push(new Circle(this.config, newCNF1));
        this.render_array.push(new Circle(this.config, newCNF1, 
            {
                r: this.config.r + this.config.gap + this.config.lineLength
            }
        ));

        this.render_array.push(new Circle(this.config, newCNF1, 
            {
                r: this.config.r,
                'stroke-dasharray': '10 4'
            }
        ));

        this.render_array.push(new Moon(
            this.config,
            {
                container: false,
                xOffset: 80,
                fill: this.config.stroke
            }
        ));

        return '';
    }
}