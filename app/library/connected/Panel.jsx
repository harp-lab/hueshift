import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion, AccordionSummary, AccordionDetails,
  IconButton, Tooltip, Typography,
} from '@material-ui/core';
import {
  CheckBox, CheckBoxOutlineBlank, IndeterminateCheckBox,
  Delete, ExpandMore, Star, StarBorder,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import {
  selectPanel, unselectPanel, savePanel, unsavePanel, hidePanel,
} from 'store/actions';
import { getPanels } from 'store/selectors';

/**
 * @param {Object} props
 * @param {String} props.panelId panel id
 * @param {String} props.panelType panel type
 * @param {Function} props.onSelect panel select callback
 * @param {Function} props.onUnselect panel unselect callback
 * @param {Function} props.onMouseOver panel mouseover callback
 * @param {Function} props.onMouseOut panel mouseout callback
 * @param {ReactElement} props.children
 * @param {Object} props.theme
 * @param {Object} props.classes
 */
const Panel = withStyles(() => ({
  panelRoot: {
    minHeight: 0,
    '&$panelExpanded': {
      minHeight: 0,
    },
  },
  panelContent: {
    alignItems: 'center',
    margin: '5px 0',
    '&$panelExpanded': {
      margin: '8px 0',
    },
  },
  panelExpandIcon: {
    padding: '5px 12px',
  },
  panelExpanded: {},
}), { withTheme: true })(({
  panelId, panelType,
  onSelect, onUnselect, onMouseOver, onMouseOut,
  disableSelect, disableSelectMsg,
  children, theme, classes,
}) => {
  const panelData = useSelector((state) => getPanels(state, panelType))[panelId];
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  function select() {
    dispatch(selectPanel(panelType, panelId));
    if (onSelect) onSelect();
  }
  function unselect() {
    dispatch(unselectPanel(panelType, panelId));
    if (onUnselect) onUnselect();
  }
  const save = () => dispatch(savePanel(panelType, panelId));
  const unsave = () => dispatch(unsavePanel(panelType, panelId));
  const hide = () => dispatch(hidePanel(panelType, panelId));

  const { label, selected, saved } = panelData;
  let saveButton; let
    selectButton;
  if (disableSelect) {
    selectButton = (
      <Button
        icon={<IndeterminateCheckBox color="disabled" />}
        tooltip={disableSelectMsg}
        disabled
      />
    );
  } else if (!selected) {
    selectButton = (
      <Button
        icon={<CheckBoxOutlineBlank />}
        tooltip="Select"
        onClick={select}
      />
    );
  } else {
    selectButton = (
      <Button
        icon={<CheckBox />}
        tooltip="Unselect"
        onClick={unselect}
      />
    );
  }

  if (!saved) {
    saveButton = (
      <Button
        icon={<StarBorder />}
        tooltip="Save"
        onClick={save}
      />
    );
  } else {
    saveButton = (
      <Button
        icon={<Star />}
        tooltip="Unsave"
        onClick={unsave}
      />
    );
  }

  const deleteButton = (
    <Button
      icon={<Delete />}
      tooltip="Delete"
      onClick={hide}
    />
  );

  return (
    <Accordion
      onMouseOver={() => {
        if (!hovered) {
          onMouseOver();
          setHovered(true);
        }
      }}
      onMouseOut={() => {
        if (hovered) {
          onMouseOut();
          setHovered(false);
        }
      }}
      defaultExpanded={!saved}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        classes={{
          root: classes.panelRoot,
          content: classes.panelContent,
          expandIcon: classes.panelExpandIcon,
          expanded: classes.panelExpanded,
        }}
        style={{
          backgroundColor: hovered ? theme.palette.hover.light : undefined,
        }}
      >
        { selectButton }
        { saveButton }
        { deleteButton }
        <Typography>{ label }</Typography>
      </AccordionSummary>
      <AccordionDetails>{ children }</AccordionDetails>
    </Accordion>
  );
});

function Button({
  icon, tooltip, disabled, onClick,
}) {
  let disableRipple;
  let buttonClick;
  if (disabled) {
    disableRipple = true;
    buttonClick = (evt) => {
      evt.stopPropagation();
    };
  } else {
    buttonClick = (evt) => {
      evt.stopPropagation();
      onClick();
    };
  }
  return (
    <Tooltip title={tooltip}>
      <IconButton
        size="small"
        disableRipple={disableRipple}
        onClick={buttonClick}
      >
        { icon }
      </IconButton>
    </Tooltip>
  );
}

export default Panel;
