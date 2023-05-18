function Circle(config) {
    this.svgc = document.querySelector('#' + config.svgc);

    if (config.mask) {
        this.svgc = this.svgc.querySelector('defs #mask');
    }

    this.svg_circle_id = ID();
    this.x = config.x;
    this.y = config.y;
    this.color = config.color;
    this.xOffset = config.xOffset;
    this.yOffset = config.yOffset;
    this.radius = config.radius;
    this.stroke_width = config.stroke_width;

    if(!this.svgc) {
        console.error('No SVG Canvas found.');
    }

    this.draw = function() {
        if (!document.querySelector('#svg-circle-id-' + this.svg_circle_id)) {
            this.svgc.innerHTML += this.initCircleHtml();
        }
    }

    this.initCircleHtml = function() {
        return '<circle id="svg-circle-id-' + this.svg_circle_id + '" svg-circle-id="' + this.svg_circle_id + '" stroke="' + this.color + '" stroke-width="' + this.stroke_width + '" fill="none" r="' + (this.radius - 1) + '" cx="' + (this.x) + '" cy="' + (this.y) + '"/>';

    }
}