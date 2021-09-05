import React, { FunctionComponent } from 'react';
import { Divider } from '@blueprintjs/core';

export const UserEditorTab: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Divider className="mx-0" />
      {children}
    </div>
  );
};
