// need to use relative path instead of process.cwd()

/**
 * @param {Object} templateParams html webpack plugin template parameters
 * @returns {String} html output
 */
module.exports = function Template(templateParams) {
  const header = Header(templateParams);
  const body = Body(templateParams);
  return `
    <!DOCTYPE html>
    <html>
      ${header}
      ${body}
    </html>`;
};

/**
 * @returns {String} html output
 */
function Header(templateParams) {
  const { headTemplate } = templateParams;
  return `
    <head>
      ${headTemplate}
    </head>`;
}

/**
 * @returns {String} html output
 */
function Body(templateParams) {
  const { bodyTemplate } = templateParams;
  return `
    <body>
      ${bodyTemplate}
      <div id="app"></div>
    </body>`;
}
