function line(x1, y1, x2, y2) {
    let svgc = document.getElementById('svgc');
    this.svg_line_id = ID();

    this.x1 = x1;
    this.y1 = y1; 
    this.x2 = x2; 
    this.y2 = y2; 


    if(!svgc) {
        console.error('No SVG Canvas found.');
    }

    this.draw = function() {
        if (!document.querySelector('#svg-line-id-' + this.svg_line_id)) {
            svgc.innerHTML += this.initLineHTML();
            this.setLineAttrs();
        }
        else {
            this.setLineAttrs();
        }
    }

    this.initLineHTML = function() {
        return '<line id="svg-line-id-' + this.svg_line_id + '" stroke="#000000" stroke-width="2" />'
    }

    this.setLineAttrs = function() {
        const line = document.getElementById('svg-line-id-' + this.svg_line_id);
        line.setAttribute('x1', this.x1);
        line.setAttribute('y1', this.y1);
        line.setAttribute('x2', this.x2);
        line.setAttribute('y2', this.y2);
    }
}