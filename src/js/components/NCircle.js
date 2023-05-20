class NCircle extends PSVG {
    constructor() {
        super();

        this.config.merge({
            tag: 'circle',
            'stroke-width' : 2,
            r: 0,
            cx: this.config.x,
            cy: this.config.y
        });

        this.config.merge.apply(this.config, arguments);
    }

    draw() {
        super.draw();
    }
}