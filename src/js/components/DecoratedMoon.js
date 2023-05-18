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
        this.radialLines.push(new RadialLines(config));
        this.cConfig = new Config(config);
        this.cConfig.merge({
            stroke_width: 1,
            radius: 51
        });
        this.circles.push(new Circle(this.cConfig));
        this.cConfig.merge({radius: 61});
        this.circles.push(new Circle(this.cConfig));
        this.decorationMoons();
        return '';
    }

    this.decorationMoonData = {
        'moons': []
    };
    this.decorationMoons = function() {
        for(let i = 0; i < 1; i++) {
            let dMoonsConfig = new Config({
                mask: config.mask,
                svgc: config.svgc,
                xOffset: 20
            });

            
            this.decorationMoonData['moons'].push(new Moon(dMoonsConfig));
        }
    }
}