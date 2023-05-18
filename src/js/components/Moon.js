function Moon(config) {
    this.svgc = document.querySelector('#' + config.svgc);

    if (config.mask) {
        this.svgc = this.svgc.querySelector('defs #mask');
    }

    this.svg_moon_id = ID();
    this.x = config.x;
    this.y = config.y;
    this.color = config.color;
    this.xOffset = config.xOffset;
    this.yOffset = config.yOffset;
    this.radius = config.radius;

    if(!this.svgc) {
        console.error('No SVG Canvas found.');
    }

    this.draw = function() {
        if (!document.querySelector('#svg-moon-id-' + this.svg_moon_id)) {
            this.svgc.innerHTML += this.initMoonHtml();
        }
    }

    this.initMoonHtml = function() {
        const intersects = intersectTwoCircles(this.x ,this.y, this.radius, (this.x + this.xOffset), (this.y + this.yOffset), this.radius);
        arcHtml = '';
        if (intersects[1]) {
            const startingPoint = intersects[0];
            const midPoint = intersects[1];
            const Arc1 = svgArcCircle(this.radius, midPoint[0], midPoint[1], 'inwards');
            const Arc2 = svgArcCircle(this.radius, startingPoint[0], startingPoint[1], 'outwards', false);
            arcHtml = '<path d="M' + startingPoint[0] + ' ' + startingPoint[1] + '' + Arc1 + ' ' + Arc2 + '" stroke="' + this.color + '" stroke-width="0" fill="' + this.color + '"/>'
            if (isNaN(startingPoint[0]) || isNaN(startingPoint[1]) || isNaN(midPoint[0]) || isNaN(midPoint[1])) {
                arcHtml = '<circle id="svg-moon-id-' + this.svg_moon_id + '" svg-moon-id="' + this.svg_moon_id + '" stroke="' + this.color + '" stroke-width="2" fill="none" r="' + (this.radius - 1) + '" cx="' + (this.x) + '" cy="' + (this.y) + '"/>';
            }
            else if (intersects[0][0] == intersects[1][0] && intersects[0][1] == intersects[1][1]) {
                arcHtml = '<circle id="svg-moon-id-' + this.svg_moon_id + '" svg-moon-id="' + this.svg_moon_id + '" stroke="' + this.color + '" stroke-width="2" fill="' + this.color + '" r="' + (this.radius - 1) + '" cx="' + (this.x) + '" cy="' + (this.y) + '"/>';
            } 
        }

        return arcHtml;
    }
}