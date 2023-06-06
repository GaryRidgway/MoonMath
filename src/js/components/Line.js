class Line extends PSVG {
    constructor() {
        super();

        this.config.merge({
            tag: 'line',
            x2: 0,
            y2: 0,
            transform: '',
            'transform-origin': '',
            stroke: '#ffffff',
            randomness: false
        });

        this.config.merge.apply(this.config, arguments);

        this.config.merge({
            x1: this.config.x,
            y1: this.config.y
        });

        if (this.config.randomness) {
            const length = lineDistance(
                {x: this.config.x1, y: this.config.y1},
                {x: this.config.x2, y: this.config.y2}
            );

            const chosenRand = rand();
            const randLen = length * chosenRand;
            this.config.y2 = this.config.y2 - randLen;
        }
    }

    draw() {
        super.draw();
    }
}