import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar as MUIAppBar, Button, Toolbar, Typography,
} from '@material-ui/core';
import { makeStyles, withTheme } from '@material-ui/styles';
import { createProject, forkProject, exportData } from 'store/apis';
import {
  logout, selProject, importFiles,
} from 'store/actions';
import { LIST_VIEW, PROJECT_VIEW } from 'store/consts';
import {
  isLoggedIn, getView, getTitle, getSelectedProjectId,
} from 'store/selectors';

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

/**
 * Render global application bar.
 * @returns {JSX.Element} component
 */
function AppBar() {
  const loggedIn = useSelector(isLoggedIn);
  const view = useSelector(getView);
  const title = useSelector(getTitle);
  const selectedProjectId = useSelector(getSelectedProjectId);
  const dispatch = useDispatch();
  const classes = useStyles();

  let leftElems;
  let rightElems;
  if (loggedIn) {
    switch (view) {
      case PROJECT_VIEW:
        leftElems = <ProjectListButton />;
        rightElems = (
          <>
            <AppBarButton
              content="fork project"
              onClick={() => dispatch(forkProject(selectedProjectId))}
            />
            <AppBarButton
              content="export project"
              onClick={() => dispatch(exportData(selectedProjectId))}
            />
            <LogoutButton />
          </>
        );
        break;
      case LIST_VIEW:
      default:
        leftElems = <ProjectListButton />;
        rightElems = (
          <>
            <ImportButton />
            <AppBarButton
              content="new project"
              onClick={() => dispatch(createProject())}
            />
            <LogoutButton />
          </>
        );
        break;
    }
  }

  const appbarElem = (
    <MUIAppBar
      position="static"
      color="inherit"
      variant="outlined"
      className={classes.appbar}
    >
      <Toolbar>
        { leftElems }
        <Typography
          variant="h6"
          color="inherit"
          style={{
            flex: '1 1 auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
          }}
        >
          { title }
        </Typography>
        { rightElems }
      </Toolbar>
    </MUIAppBar>
  );

  return appbarElem;
}
export default AppBar;

function ProjectListButton() {
  const dispatch = useDispatch();
  return (
    <AppBarButton
      content="project list"
      onClick={() => dispatch(selProject(undefined))}
    />
  );
}
function LogoutButton() {
  const dispatch = useDispatch();
  return (
    <AppBarButton
      content="logout"
      onClick={(userId) => dispatch(logout(userId))}
    />
  );
}
function ImportButton() {
  const input = useRef(undefined);
  const dispatch = useDispatch();

  return (
    <>
      <AppBarButton
        content="import"
        onClick={() => input.current.click()}
      />
      <input
        ref={input}
        onInput={() => dispatch(importFiles(input.current.files))}
        type="file"
        hidden
      />
    </>
  );
}

const AppBarButton = withTheme((props) => {
  const { content, theme, onClick } = props;
  return (
    <Button
      onClick={onClick}
      color="inherit"
      variant="outlined"
      style={{ margin: theme.spacing(1) }}
    >
      { content }
    </Button>
  );
});
