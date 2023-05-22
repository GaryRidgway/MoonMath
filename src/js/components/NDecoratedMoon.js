class NDecoratedMoon extends PSVG(config, objOnly = false) {
    this.svgc = document.querySelector('#' + config.svgc);
    if (config.mask) {
        this.svgc = this.svgc.querySelector('defs #mask');
    }

    if(!this.svgc) {
        console.error('No SVG Canvas found.');
    }

    this.svg_decorated_moon_id = ID();
    this.x = config.x;
    this.y = config.y;
    this.radius = config.radius;
    this.color = config.color;

    this.draw = function() {
        if (!document.querySelector('#svg_decorated_moon_id-' + this.svg_decorated_moon_id)) {
            this.svgc.innerHTML += this.initDecoratedMoonHtml();
        }

        this.radialLines.forEach(function(lines, index) {
            lines.draw();
        });

        this.decorationMoonData['moons'].forEach(function(moon, index) {
            moon.draw();
        });

        this.circles.forEach(function(circle, index) {
            circle.draw();
        });
    }

    this.attenuate = function() {
    }

    this.radialLines = []
    this.circles = [];
    this.initDecoratedMoonHtml = function() {
        const rLines = new Config(
            config,
            {
                lineLength: 10,
                gap: 25
            }
        );
        this.radialLines.push(new RadialLines(rLines));


        const newCNF1 = 
        {
            stroke_width: 1,
            fill: 'none',
            r: this.radius + rLines.gap + 1
        };
        
        this.circles.push(new Circle(objOnly, newCNF1));
        this.circles.push(new Circle(objOnly, newCNF1, 
            {
                r: this.radius + rLines.gap + rLines.lineLength + 1
            }
        ));

        this.circles.push(new Circle(objOnly, newCNF1, 
            {
                r: this.radius,
                'stroke-dasharray': '10 4'
            }
        ));
        this.decorationMoons();
        return '';
    }

    this.decorationMoonData = {
        'moons': []
    };
    this.decorationMoons = function() {
        for(let i = 0; i < 1; i++) {
            this.decorationMoonData['moons'].push(new NMoon({
                'is-mask': config.mask,
                svgc: config.svgc,
                r: this.radius,
                xOffset: 80,
                x: config.x,
                y: config.y
            }));
        }
    }
}