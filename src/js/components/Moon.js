class Moon extends PSVG{
    constructor() {
        super();

        this.config.merge({
            tag: 'circle',
            r: 0,
            stroke: '#ffffff',
            fill: '#ffffff',
            xOffset: 0,
            yOffset: 0
        });

        this.config.merge.apply(this.config, arguments);

        this.config.merge(this.configCalc(), {
            cx: this.config.x,
            cy: this.config.y
        });
    }

    draw() {
        super.draw();
    }

    configCalc() {
        const intersects = intersectTwoCircles(this.config.x ,this.config.y, this.config.r, (this.config.x + this.config.xOffset), (this.config.y + this.config.yOffset), this.config.r);
        if (intersects[1]) {
            const startingPoint = intersects[0];
            const midPoint = intersects[1];
            const Arc1 = svgArcCircle(this.config.r, midPoint[0], midPoint[1], 'inwards');
            const Arc2 = svgArcCircle(this.config.r, startingPoint[0], startingPoint[1], 'outwards', false);
            if (isNaN(startingPoint[0]) || isNaN(startingPoint[1]) || isNaN(midPoint[0]) || isNaN(midPoint[1])) {
                return {
                    tag: 'circle',
                    r: this.config.r - 1,
                    fill: 'none'
                };
            }
            else if (intersects[0][0] == intersects[1][0] && intersects[0][1] == intersects[1][1]) {
                return {
                    tag: 'circle',
                    r: this.config.r - 1
                };
            } 
            else {
                return {
                    tag: 'path',
                    d: 'M' + startingPoint[0] + ' ' + startingPoint[1] + '' + Arc1 + ' ' + Arc2,
                };
            }
        }
    }
}