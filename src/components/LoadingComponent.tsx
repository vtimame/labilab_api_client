import React, { FunctionComponent } from 'react';
import { Spinner } from '@blueprintjs/core';

interface LoadingComponentProps {
  height?: string;
}

export const LoadingComponent: FunctionComponent<LoadingComponentProps> = ({
  height = '500px',
}) => {
  return (
    <div
      style={{ height }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner />
    </div>
  );
};
