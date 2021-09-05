import React, { FunctionComponent, useState } from 'react';
import { Button, Callout, Collapse } from '@blueprintjs/core';

interface SectionProps {
  title?: string;
  openedKeyState: string;
  extra?: React.ReactElement;
}

export const Section: FunctionComponent<SectionProps> = (props) => {
  const openedKeyState = props.openedKeyState
    ? localStorage.getItem(props.openedKeyState)
    : null;
  const [isOpen, setOpen] = useState<boolean>(openedKeyState !== null);

  const toggleOpen = () => {
    if (isOpen) {
      localStorage.removeItem(props.openedKeyState);
      setOpen(false);
    } else {
      localStorage.setItem(props.openedKeyState, '1');
      setOpen(true);
    }
  };

  return (
    <Callout>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h5 className="bp3-heading mb-0">{props.title}</h5>
          {isOpen ? <div className="ml-2">{props.extra}</div> : null}
        </div>
        <Button
          minimal
          icon={isOpen ? 'caret-up' : 'caret-down'}
          onClick={toggleOpen}
        />
      </div>
      <Collapse isOpen={isOpen}>{props.children}</Collapse>
    </Callout>
  );
};
