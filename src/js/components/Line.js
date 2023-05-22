class Line extends PSVG {
    constructor() {
        super();

        this.config.merge({
            tag: 'line',
            x2: 0,
            y2: 0,
            transform: '',
            'transform-origin': '',
            stroke: '#ffffff'
        });

        this.config.merge.apply(this.config, arguments);

        this.config.merge({
            x1: this.config.x,
            y1: this.config.y
        });
    }

    draw() {
        super.draw();
    }
}