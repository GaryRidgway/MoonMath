function Config(config = null) {
    this.x = 100;
    this.y = 100;
    this.color = '#b6c1d2';
    this.xOffset = 0;
    this.yOffset = 0;
    this.mask = true;
    this.svgc = 'svgc';
    this.radius = 30;

    if (config) {
        const keys = Object.keys(config);
        for (let i = 0; i < keys.length; i++) {
            this[keys[i].toString()] = config[keys[i]];
        }
    }
}