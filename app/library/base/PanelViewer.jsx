import React from 'react';
import { Toolbar, Typography } from '@material-ui/core';
import { withTheme } from '@material-ui/styles';

function PanelViewer({
  label, panels,
  onFilterSaved, onFilterUnsaved, onGenerate,
}) {
  const savedPanels = Object.entries(panels)
    .filter(([panelId, panelData]) => {
      const { saved } = panelData;
      const result = saved;
      let filter = true;
      if (onFilterSaved) { filter = onFilterSaved([panelId, panelData]); }
      return result && filter;
    })
    .map(onGenerate);
  const unsavedPanels = Object.entries(panels)
    .filter(([panelId, panelData]) => {
      const { saved, hidden } = panelData;
      const result = !saved && !hidden;
      let filter = true;
      if (onFilterUnsaved) { filter = onFilterUnsaved([panelId, panelData]); }
      return result && filter;
    })
    .map(onGenerate);
  const content = [...savedPanels, ...unsavedPanels];

  return (
    <>
      <ViewerLabel content={label} />
      <div style={{ overflowY: 'auto' }}>
        { content }
      </div>
    </>
  );
}

const ViewerLabel = withTheme(({ content, theme }) => (
  <Toolbar
    variant="dense"
    style={{
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      minHeight: 'auto',
    }}
  >
    <Typography>{ content }</Typography>
  </Toolbar>
));

export default PanelViewer;
