import React from 'react';
import { BugReport } from '@material-ui/icons';
import DebugItem from './DebugItem';
import IconPopover from './IconPopover';

function DebugPopover(props) {
  const { item } = props;
  const { debug } = item;

  if (!debug) return null;

  return (
    <IconPopover
      icon={<BugReport />}
      tooltip="Show debug"
    >
      <DebugItem item={item} />
    </IconPopover>
  );
}

export default DebugPopover;
