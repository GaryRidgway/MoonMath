class Circle extends PSVG {
    constructor() {
        super();

        this.config.merge({
            r: 0,
            stroke: '#ffffff'
        });

        this.config.merge.apply(this.config, arguments);

        this.config.merge({
            tag: 'circle',
            cx: this.config.x,
            cy: this.config.y
        });
    }

    draw() {
        super.draw();
    }
}