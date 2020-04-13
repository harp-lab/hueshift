import { reqReactElement } from 'extensions/checks';
let layouts;
try {
  layouts = require('fext/layouts');
} catch(err) {
  layouts = {};
}

const path = 'fext/layouts';
export const EditorLayout = reqReactElement(layouts, 'EditorLayout', path);
export const ProjectLayout = reqReactElement(layouts, 'ProjectLayout', path);
