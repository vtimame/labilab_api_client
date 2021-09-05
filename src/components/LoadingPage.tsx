import React from 'react';
import { Spinner } from '@blueprintjs/core';

export const LoadingPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Spinner />
    </div>
  );
};
