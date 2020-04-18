import { reqReactElement } from 'extensions/checks';
import { fextRequire } from 'extensions/utilities';
const layouts = fextRequire('layouts');

const path = 'fext/layouts';

export const EditorLayout = reqReactElement(layouts, 'EditorLayout', path);
export const ProjectLayout = reqReactElement(layouts, 'ProjectLayout', path);
