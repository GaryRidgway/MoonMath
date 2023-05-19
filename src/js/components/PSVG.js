class PSVG {
    constructor() {
        this.config = new CNF(arguments);
        this.config.id = ID();
    }

    draw() {
        if (!document.querySelector('#psvg-id-' + this.config.id)) {
            this.config.svgc_selector.innerHTML += this.initHtml();
        }
    }

    initHtml() {
        let entries = Object.keys(this.config);

        let html = ['<' + this.config['tag']];
        entries.splice(entries.indexOf('tag'), 1);

        for (let i = entries.length-1; i >= 0 ; i--) {
            if(typeof this.config[entries[i].toString()] !== 'object') {
                html.push(entries[i] + '="' + this.config[entries[i]] + '"');
            }
            
            entries.splice(i, 1);
        }

        html = html.join(' ') + '/>';
        return html;
    }
}