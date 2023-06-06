class Shape extends PSVG{
    constructor() {
        super();
        
        this.config.merge({
            pointsArray: [],
            referenceOrigin: false,
            closed: true
        });

        this.config.merge.apply(this.config, arguments);

        this.compose();
    }

    draw() {
        super.draw();
    }

    compose() {
        if (this.config.closed) {
            this.config.tag = 'polygon';
        }
        else {
            this.config.tag = 'polyline';
        }


        const xOffset = this.config.referenceOrigin ? this.config.x : 0;
        const yOffset = this.config.referenceOrigin ? this.config.y : 0;

        let pointsString = '';
        let confRef = this.config;
        Object.keys(this.config.pointsArray).forEach(function(key) {
            const point = confRef.pointsArray[key];
            pointsString += '\
                ' + (xOffset - point.x) + '\
                , \
                ' + (yOffset - point.y) + ' \
            ';
        });

        this.config.points = pointsString;
    }
}