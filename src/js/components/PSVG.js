class PSVG {
    constructor() {
        this.config = new CNF();
        this.config.merge.apply(this.config, arguments);
        this.render_array = [];
        this.id = ID();
    }

    draw() {
        if (!this.config.container) {
            let entries = Object.keys(this.config);

            let element = this.config['svgc-selector'].querySelector('#' + this.id);
            if(!element) {
                let elementHtmlArray = ['<' + this.config['tag']];
    
                for (let i = entries.length-1; i >= 0 ; i--) {
                    const entry = this.config[entries[i].toString()];
                    if(typeof entry !== 'object' && entry !== null) {
                        elementHtmlArray.push(entries[i] + '="' + this.config[entries[i]] + '"');
                    }
                    
                    entries.splice(i, 1);
                }
                elementHtmlArray.push('id="' + this.id + '"');
                elementHtmlArray.push('/>');
    
                this.config['svgc-selector'].innerHTML += elementHtmlArray.join(' ');
    
            }
            else {
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

        this.draw_child_objects();
    }

    draw_child_objects() {
        this.render_array.forEach(function(element) {
            element.draw();
        })
    }
}