function Config(inheritConfig = null, config = null) {
    this.x = 100;
    this.y = 100;
    this.color = '#b6c1d2';
    this.xOffset = 0;
    this.yOffset = 0;
    this.mask = true;
    this.svgc = 'svgc';
    this.radius = 30;

    
    this.merge = function(newConfig) {
        const keys = Object.keys(newConfig);
        for (let i = 0; i < keys.length; i++) {
            this[keys[i].toString()] = newConfig[keys[i]];
        }
    }

    if (inheritConfig) {
        this.merge(inheritConfig);
    }

    if (config) {
        this.merge(config);
    }
}