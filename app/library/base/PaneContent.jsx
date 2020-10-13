import React from 'react';
import Pane from './Pane';

function PaneContent(props) {
  const { children } = props;

  return (
    <Pane>
      { children }
    </Pane>
  );
}

export default PaneContent;
