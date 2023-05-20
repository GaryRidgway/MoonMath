class CNF {
    /**
     * Takes any number of config objects and add them to the default config in order.
     */
    constructor() {
        this.defaultConfig();

        this.merge.apply(this, arguments);
    }

    defaultConfig() {
        const dCNF = {
            tag: 'div',
            x : 0,
            y : 0,
            stroke : '#FFFFFF',
            fill : '#FFFFFF',
            'stroke-width' : 1,
            mask : false,
            'svgc-id' : 'svgc',
            'stroke-dasharray' : 'none',
            id: ID()
        };

        const selector = document.querySelector('#' + dCNF['svgc-id']);
        console.log(selector)
        if(!dCNF.mask) {
            dCNF['svgc-selector'] = selector;
        }
        else {
            dCNF['svgc-selector'] = selector.querySelector('defs #mask');
        }

        this.merge(dCNF);
    }

    merge() {
        for(let i = 0; i < arguments.length; i++) {
            const keys = Object.keys(arguments[i]);
            for (let j = 0; j < keys.length; j++) {
                this[keys[j].toString()] = arguments[i][keys[j]];
            }
        }
    }
}