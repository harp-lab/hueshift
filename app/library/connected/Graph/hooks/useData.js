import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPositions } from 'store/actions';
import { getGraph, getGraphPositions } from 'store/selectors';

import { GraphData } from './data';

/**
 * connect cytoscape instance data
 * @param {Object} cy cytoscape instance
 * @param {String} graphId graph id
 * @param {Object} layout cytoscape layout config
 */
export default function useData(cy, graphId, layout) {
  const graphData = useSelector((state) => getGraph(state, graphId));
  const positions = useSelector((state) => getGraphPositions(state, graphId));
  const dispatch = useDispatch();

  useEffect(() => {
    const data = GraphData(graphId, graphData);
    cy.add(data); // load graph data

    // load graph layout
    if (positions) {
      cy.nodes()
        .positions((element) => positions[element.data('id')]);
      cy.fit();
    } else { cy.layout(layout).run(); }

    return () => {
      // save graph layout
      const graphPositions = {};
      data.forEach((node) => {
        const nodeId = node.data.id;
        graphPositions[nodeId] = cy.$id(nodeId).position();
      });
      dispatch(setPositions(graphId, graphPositions));

      cy.nodes().remove(); // clear graph data
    };
  }, [graphData]);
}
