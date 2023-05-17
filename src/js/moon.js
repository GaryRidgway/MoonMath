function moon(id, x, y, xOffset = 0, yOffset = 0) {
    let svgc = document.getElementById('svgc');

    this.svg_moon_id = id;
    this.x = x;
    this.y = y;
    this.radius = 30;

    if(!svgc) {
        console.error('No SVG Canvas found.');
    }

    this.updateMoon = function() {
        if (!document.querySelector('#svg-moon-id-' + this.svg_moon_id)) {
            svgc.querySelector('defs').innerHTML += this.initMoonMaskHtml();
            svgc.innerHTML += this.initMoonHtml();
        }
    }

    this.initMoonMaskHtml = function() {
        const mask = '\
        <mask id="svg-moon-mask-id-' + this.svg_moon_id + '">\
            <rect fill="white" height="100%" width="100%"></rect>\
            <circle svg-moon-mask-id="' + this.svg_moon_id + '" r="' + this.radius + '" cx="' + (this.x + xOffset) + '" cy="' + (this.y + yOffset) + '" fill="black" />\
        </mask>'

        return mask;
    }

    this.initMoonHtml = function() {
        return '<circle id="svg-moon-id-' + this.svg_moon_id + '" svg-moon-id="' + this.svg_moon_id + '" r="' + this.radius + '" cx="' + this.x + '" cy="' + this.y + '" stroke="#b6c1d2" stroke-width="4" fill="#b6c1d2" mask="url(#svg-moon-mask-id-' + this.svg_moon_id + ')" />';
    }
}