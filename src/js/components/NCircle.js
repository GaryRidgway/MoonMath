class NCircle extends PSVG {
    constructor() {
        super();

        this.config.merge({
            tag: 'circle',
            r: 0,
            stroke: '#ffffff'
        });

        this.config.merge.apply(this.config, arguments);

        this.config.merge({
            cx: this.config.x,
            cy: this.config.y
        });

        // this.draw();
    }

    draw() {
        super.draw();
    }
}