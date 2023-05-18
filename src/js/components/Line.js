function line(x1, y1, x2, y2, color, mask=true, svgc = 'svgc') {
    this.svgc = document.querySelector('#' + svgc);
    if (mask) {
        this.svgc = this.svgc.querySelector('defs #mask');
    }
    this.svg_line_id = ID();

    this.x1 = x1;
    this.y1 = y1; 
    this.x2 = x2; 
    this.y2 = y2; 
    this.color = color;


    if(!this.svgc) {
        console.error('No SVG Canvas found.');
    }

    this.draw = function() {
        if (!document.querySelector('#svg-line-id-' + this.svg_line_id)) {
            this.svgc.innerHTML += this.initLineHTML();
            this.setLineAttrs();
        }
        else {
            this.setLineAttrs();
        }
    }

    this.initLineHTML = function() {
        return '<line id="svg-line-id-' + this.svg_line_id + '" stroke="' + this.color + '" stroke-width="2" />'
    }

    this.setLineAttrs = function(rotation=0, transformOrigin=null, strokeWidth=null) {
        const line = document.getElementById('svg-line-id-' + this.svg_line_id);
        line.setAttribute('x1', this.x1);
        line.setAttribute('y1', this.y1);
        line.setAttribute('x2', this.x2);
        line.setAttribute('y2', this.y2);

        if (rotation !== 0) {
            line.setAttribute('transform', 'rotate(' + rotation + ')');
        }

        if (transformOrigin) {
            line.style.transformOrigin =  transformOrigin;
        }

        if (strokeWidth) {
            line.setAttribute('stroke-width', strokeWidth);
        }
    }
}