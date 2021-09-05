import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { useStore } from '../store/Store';

export const BrightnessSwitcher = observer(() => {
  const { app } = useStore();

  const clicked = () => {
    const brightnessValue = app.brightness === 'light' ? 'dark' : 'light';
    localStorage.setItem('brightness', brightnessValue);
    app.setBrightness(brightnessValue);
  };

  return (
    <Button
      minimal
      icon={app.brightness === 'light' ? 'moon' : 'flash'}
      onClick={clicked}
    />
  );
});
