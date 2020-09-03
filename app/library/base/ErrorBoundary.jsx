import React, { Component, useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { PaneMessage } from 'library/base';

function ErrorWrapper({ children }) {
  const [errorKey, setErrorKey] = useState(0);

  return (
    <ErrorBoundary
      key={errorKey}
      onReset={() => setErrorKey(errorKey + 1)}
    >
      { children }
    </ErrorBoundary>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidCatch() {}

  render() {
    const { children, onReset } = this.props;
    const { error } = this.state;
    if (error) {
      return (
        <PaneMessage
          content="Error caught"
          buttons={<RefreshButton onClick={onReset} />}
        />
      );
    }
    return children;
  }
}

function RefreshButton(props) {
  const { onClick } = props;
  return (
    <Tooltip title="Restart">
      <IconButton
        size="small"
        onClick={onClick}
      >
        <Refresh />
      </IconButton>
    </Tooltip>
  );
}

export default ErrorWrapper;
