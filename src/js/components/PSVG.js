class PSVG {
    constructor() {
        this.config = new CNF();
        this.config.merge.apply(this.config, arguments);
        this.render_array = [];
        this.id = ID();
    }

    draw() {
        // Run the postProcess functions.
        this.postProcess();

        if (this.config.transforms) {
            console.log(this.config);
        }

        // If this is not a container...
        if (!this.config.container) {
            let entries = Object.keys(this.config);

            // Check to see if the element is already rendered.
            let elementOnDocument = this.config['svgc-selector'].querySelector('#' + this.id);

            // If it is not...
            if(!elementOnDocument) {

                // Go through and create it.
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
                        elementOnDocument.setAttribute(entries[i], this.config[entries[i]]);
                    }
                    
                    entries.splice(i, 1);
                }
            }
        }

        // Draw the child objects of the PSVG, whether it is a container or not.
        this.draw_child_objects();
    }

    draw_child_objects() {
        this.render_array.forEach(function(element) {
            element.draw();
        })
    }

    postProcess() {
        this.applyTransforms();
    }

    applyTransforms() {
        if (this.config.transforms) {
            let transforms = '';
            const TFS = this.config.transforms;
            Object.keys(this.config.transforms).forEach(function(key) {
                transforms += key + '(' + TFS[key] + ') '
            });

            this.config.merge(
                {
                    'transform': transforms,
                    'transform-origin': (this.config.x) + 'px ' + (this.config.y) + 'px',
                }
            )
        }
    }
}