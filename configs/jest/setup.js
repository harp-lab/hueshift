const path = require('path');

const frameworkPath = process.cwd();

process.env.HS_CONSTS = path.resolve(frameworkPath, 'bin', 'consts');
