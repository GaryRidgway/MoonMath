class Rect extends PSVG {
    constructor() {
        super();

        this.config.merge({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            stroke: '#ffffff'
        });

        this.config.merge.apply(this.config, arguments);

        // Post processing.
        this.config.merge({
            tag: 'rect',
            transforms: {
                rotate: this.config.rotation,
            }
        });
    }

    postProcess() {
        super.postProcess();

        this.config.merge({
            transform: this.config.transform += 'translate(-' + (this.config.width/2) + ' -' + (this.config.height/2) + ') '
        });
    }

    draw() {
        super.draw();
    }
}