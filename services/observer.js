const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');
const { exec } = require("child_process");
const path = require('path');

class Observer extends EventEmitter {
    constructor() {
        super();
    }

    watchFolder(folder) {
        try {
        console.log(
            `[${new Date().toLocaleString()}] Watching for folder changes on: ${folder}`
        );

        var watcher = chokidar.watch(folder, { 
            ignoreInitial: true,
            persistent: true,

            // This ensures that each change doesnt trigger twice.
            awaitWriteFinish: {
                stabilityThreshold: 200,
                pollInterval: 10
              }
        });

        watcher
            .on('add', changePath => console.log(`File ${changePath} has been added`))
            .on('change', function(changePath) {
                const parsed = path.parse(changePath);
                let command = null;
                if (parsed.ext === '.scss') {
                    command = 'npm run compile:sass';
                }

                if (parsed.ext === '.js') {
                    command = 'npm run minify:jsf';
                }

                if (command !== null) {
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.log(`stderr: ${stderr}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                    });
                }
                
            })
            .on('unlink', changePath => console.log(`File ${changePath} has been removed`));
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Observer;