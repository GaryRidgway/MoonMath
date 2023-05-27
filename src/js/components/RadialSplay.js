class RadialSplay extends PSVG {
    constructor() {
        const args = Array.prototype.slice.call(arguments, 2);
        super(args);

        // The first argument is the Class (Ex; Line, circle, etc.) to be radially splayed.
        this.obj = arguments[0];

        // The second argument is the config to be set for that object.
        this.objArgs = arguments[1];

        this.config.merge({
            container: true,
            'is-mask': false,
            r: 0,
            stroke: '#ffffff',
            gap: 0,
            objCount: 0,
            'stroke-dasharray' : 'none',
            degrees: 360,
            rotation: 0
        });

        this.config.merge.apply(this.config, args);
        
        const gap = this.config.r + this.config.gap;
    
        this.config.merge({
            gap: gap,
        });

        const oX = this.objArgs.x !== undefined ? this.objArgs.x : 0;
        const oY = this.objArgs.y !== undefined ? this.objArgs.y : 0;
        this.objArgs.x = this.config.x + oX;
        this.objArgs.y = this.config.y + oY;

        // Initialize every object.
        this.radialObjects(this.config.objCount);
    }

    draw() {
        super.draw();
    }

    radialObjects(objCount) {
        for(let i = 0; i < objCount; i++) {
            this.render_array.push(
                new this.obj(
                    this.objArgs,
                    {
                        'transform':'\
                            rotate(' + ((this.config.degrees/objCount)*i + this.config.rotation) + ')\
                            translate(0 ' + this.config.gap + ')\
                        ',
                        'transform-origin': (this.config.x) + 'px ' + (this.config.y) + 'px',
                    }
                )
            );
        }
    }
}