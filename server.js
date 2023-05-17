const Obserser = require('./services/observer');

var obserser = new Obserser();

const folder = './src/';

obserser.watchFolder(folder);