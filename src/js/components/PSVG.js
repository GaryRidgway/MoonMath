class PSVG {
    constructor() {
        this.config = new CNF();
        this.config.merge.apply(this.config, arguments);
    }

    draw() {
        let entries = Object.keys(this.config);

        let element = document.querySelector('#' + this.config.id);
        if(!element) {
            element = document.createElement(this.config['tag']);
            console.log(this.config);
            this.config['svgc-selector'].append(element);
        }

        entries.splice(entries.indexOf('tag'), 1);

        for (let i = entries.length-1; i >= 0 ; i--) {
            const entry = this.config[entries[i].toString()];
            if(typeof entry !== 'object' && entry !== 'none' && entry !== null) {
                element.setAttribute(entries[i], this.config[entries[i]]);
            }
            
            entries.splice(i, 1);
        }
    }
}