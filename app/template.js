const path = require('path');

// need to use relative path instead of process.cwd()
const packageDir = path.resolve(__dirname).split('/node_modules')[0];
const { headTemplate, bodyTemplate } = require(path.resolve(packageDir, 'fext/webpack.config.js'));
//const { headTemplate, bodyTemplate } = require('../../fext/webpack.config.js');

/**
 * @param {Object} templateParams html webpack plugin template parameters
 * @returns {String} html output
 */
module.exports = function(templateParams) {
  const header = Header();
  const body = Body();
  return `
    <!DOCTYPE html>
    <html>
      ${header}
      ${body}
    </html>`;
}

/**
 * @returns {String} html output
 */
function Header() {
  return `
    <head>
      ${ headTemplate ? headTemplate() : '' }
    </head>`;
}

/**
 * @returns {String} html output
 */
function Body() {
  return `
    <body>
      ${ bodyTemplate ? bodyTemplate() : '' }
      <div id="app"></div>
    </body>`;
}
