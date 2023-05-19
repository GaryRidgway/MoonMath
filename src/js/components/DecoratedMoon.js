function DecoratedMoon(config) {
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
        this.cConfig = new Config(
            config,
            {
                stroke_width: 1,
                fill: 'none',
                radius: this.radius + rLines.gap + 1
            }
        );
        this.circles.push(new Circle(this.cConfig));
        this.sConfig = new Config(
            config,
            {
                stroke_width: 1,
                fill: 'none',
                radius: this.radius + rLines.gap + rLines.lineLength + 1
            }
        );
        this.circles.push(new Circle(this.sConfig));
        this.circles.push(new Circle(new Config(
            this.cConfig,
            {
                radius: this.radius,
                dash: '10 4'
            }
        )));
        this.decorationMoons();
        return '';
    }

    this.decorationMoonData = {
        'moons': []
    };
    this.decorationMoons = function() {
        for(let i = 0; i < 1; i++) {
            let dMoonsConfig = new Config(config);
            dMoonsConfig.merge({
                mask: config.mask,
                svgc: config.svgc,
                radius: this.radius,
                xOffset: 60
            });

            this.decorationMoonData['moons'].push(new Moon(dMoonsConfig));
        }
    }
}