class DecoratedMoon extends PSVG {
    constructor() {
        super();

        this.config.merge({
            container: true,
            stroke: '#ffffff',
            gap: 0,
            lineLength: 0,
            objCount: 0,
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
        this.render_array.push(new RadialSplay(
            Line,
            {
                'is-mask': true,
                x:  this.config.x + 0,
                y:  this.config.y + 0,
                x2: this.config.x + 0,
                y2: this.config.y + this.config.lineLength,
                stroke: '#ffffff'
            },
            this.config
        ));

        this.render_array.push(new RadialSplay(
            Circle,
            {
                'is-mask': true,
                x:  this.config.x + 0,
                y:  this.config.y + 0,
                r: 5,
                stroke: '#ffffff',
                fill: '#ffffff'
            },
            this.config,
            {
                r: this.config.r + 5,
                degrees: 180
            }
        ));

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