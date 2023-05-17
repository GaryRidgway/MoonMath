function moon(x, y, xOffset = 0, yOffset = 0) {
    let svgc = document.getElementById('svgc');

    this.svg_moon_id = ID();
    this.x = x;
    this.y = y;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.radius = 30;

    if(!svgc) {
        console.error('No SVG Canvas found.');
    }

    this.draw = function() {
        if (!document.querySelector('#svg-moon-id-' + this.svg_moon_id)) {
            svgc.querySelector('defs').innerHTML += this.initMoonMaskHtml();
            svgc.innerHTML += this.initMoonHtml();
            this.setMoonAttrs();
        }
        else {
            const mask = document.querySelector('#svg-moon-mask-id-' + this.svg_moon_id);
            mask.innerHTML = this.innerMoonMaskHtml();
            this.setMoonAttrs();
        }
    }

    this.initMoonMaskHtml = function() {
        const mask = '\
            <mask id="svg-moon-mask-id-' + this.svg_moon_id + '">'
            + this.innerMoonMaskHtml() +
            '</mask>'

        return mask;
    }

    this.innerMoonMaskHtml = function() {
        const mask = '\
            <rect fill="white" height="100%" width="100%"></rect>\
            <circle svg-moon-mask-id="' + this.svg_moon_id + '" r="' + (this.radius - 1) + '" cx="' + (this.x + this.xOffset) + '" cy="' + (this.y + this.yOffset) + '" fill="black" />'

        return mask;
    }

    this.initMoonHtml = function() {
        return '<circle id="svg-moon-id-' + this.svg_moon_id + '" svg-moon-id="' + this.svg_moon_id + '" stroke="#000000" stroke-width="2" fill="#000000" mask="url(#svg-moon-mask-id-' + this.svg_moon_id + ')" />';
    }

    this.setMoonAttrs = function() {
        const moon = document.getElementById('svg-moon-id-' + this.svg_moon_id);
        moon.setAttribute('r', this.radius);
        moon.setAttribute('cx', this.x);
        moon.setAttribute('cy', this.y);
    }
}