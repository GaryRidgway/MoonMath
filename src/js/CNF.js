class CNF {
    constructor() {
        this.defaultConfig();

        let args = arguments;
        if (arguments.length === 1 && arguments[0].length > 0) {
            args = arguments[0];
        }

        for(let i = 0; i < args.length; i++) {
            this.merge(args[i]);
        }
    }

    defaultConfig() {
        const dCNF = {
            tag: 'div',
            x : 0,
            y : 0,
            stroke : '#FFFFFF',
            fill : '#FFFFFF',
            stroke_width : 1,
            mask : false,
            svgc_id : 'svgc'
        };

        const selector = document.querySelector('#' + dCNF.svgc_id);
        if(!dCNF.mask) {
            dCNF.svgc_selector = selector;
        }
        else {
            dCNF.svgc_selector = selector.querySelector('defs #mask');
        }

        this.merge(dCNF);
    }

    merge(config) {
        const keys = Object.keys(config);
        for (let i = 0; i < keys.length; i++) {
            this[keys[i].toString()] = config[keys[i]];
        }
    }
}