import React from 'react';

function Spacer({ children, childrenStyle, noDiv }) {
  const spacedChildren = React.Children.map(children, (child) => {
    const style = { ...child.props.style, ...childrenStyle };
    return React.cloneElement(child, { style });
  });

  let element;
  if (noDiv) {
    element = <>{ spacedChildren }</>;
  } else {
    element = <div>{ spacedChildren }</div>;
  }
  return element;
}

export default Spacer;
