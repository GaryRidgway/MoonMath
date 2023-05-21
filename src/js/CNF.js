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
            stroke : 'none',
            fill : 'none',
            'stroke-width' : 1,
            'is-mask' : false,
            'svgc-id' : 'svgc',
            'stroke-dasharray' : 'none',
            id: ID()
        };

        this.merge(dCNF);
    }

    merge() {
        for(let i = 0; i < arguments.length; i++) {
            const keys = Object.keys(arguments[i]);
            for (let j = 0; j < keys.length; j++) {
                this[keys[j].toString()] = arguments[i][keys[j]];
            }
        }

        const selector = document.querySelector('#' + this['svgc-id']);
        if(!this['is-mask']) {
            this['svgc-selector'] = selector;
        }

        else {
            this['svgc-selector'] = selector.querySelector('defs #mask');
        }
    }
}