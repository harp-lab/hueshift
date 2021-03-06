import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withTheme } from '@material-ui/styles';
import { PaneMessage } from 'library/base';
import { addGraphViewer, removeGraphViewer } from 'store/actions';
import { getSelectedProjectId, getGraph } from 'store/selectors';

import cytoscape from 'cytoscape';
import cyHtmlLabel from 'cytoscape-node-html-label';

import { cyConfig } from './configs';
import {
  useData, useEventHandlers, useInput, useMetadata, useSize,
} from './hooks';

cyHtmlLabel(cytoscape);

/**
 * @param {Object} props
 * @param {String} props.graphId graph id
 * @param {Function} [props.edgePredicate] edge => predicate, boolean result determines edge selectability
 * @param {Function} [props.onNodeSelect] node select callback
 * @param {Function} [props.onNodeUnselect] node unselect callback
 * @param {Boolean} [props.external] disable graph id active registration
 * @param {Object} [props.config] cytoscape config
 * @param {Object} [props.layout] cytoscape layout
 * @param {Array} [props.htmlLabels] cytoscape html labels
 * @param {Object} style
 */
const Graph = withTheme((props) => {
  const {
    graphId,
    onNodeSelect, onNodeUnselect,
    edgePredicate = () => false,
    onEdgeSelect, onEdgeUnselect,
    external,
    config,
    layout = { name: 'cose', directed: true },
    htmlLabels = [],
    theme, style,
  } = props;
  const projectId = useSelector(getSelectedProjectId);
  const graphData = useSelector((state) => getGraph(state, graphId));

  // check if graph data defined
  if (!graphData) { return <PaneMessage content={`'${graphId}' graph undefined`} />; }

  const dispatch = useDispatch();

  const cyElemRef = useRef(undefined);
  const cyRef = useRef(cytoscape(config || cyConfig(theme)));
  const cy = cyRef.current;

  // mount/unmount headless cytoscape
  useEffect(() => {
    cy.mount(cyElemRef.current);
    return () => cy.unmount();
  }, []);

  // connect event handlers
  const ignoreEvents = useEventHandlers(cy, graphId, {
    onNodeSelect,
    onNodeUnselect,
    onEdgeSelect,
    onEdgeUnselect,
    edgePredicate,
  });
  useInput(cy, graphId); // connect global event handlers
  useData(cy, graphId, layout); // connect graph data
  useMetadata(cy, graphId, ignoreEvents); // connect graph metadata
  useSize(cyElemRef, cy);

  useEffect(() => { cy.nodeHtmlLabel(htmlLabels); }, [graphId]); // load graph html labels

  // register active graph id
  useEffect(() => {
    let cleanup;
    if (!external) {
      dispatch(addGraphViewer(graphId));
      cleanup = () => { dispatch(removeGraphViewer(graphId, projectId)); };
    } else {
      cleanup = () => {};
    }
    return cleanup;
  }, [graphId]);

  return (
    <div
      ref={cyElemRef}
      style={{
        flex: '1 1 1%',
        display: 'block',
        minHeight: 0,
        width: '100%',
        ...style,
      }}
    />
  );
});
export default Graph;
