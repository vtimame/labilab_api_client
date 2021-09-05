import React, { FunctionComponent, useState } from 'react';
import { RoleEditor } from './RoleEditor';
import {
  Button,
  ButtonGroup,
  Callout,
  Classes,
  Divider,
} from '@blueprintjs/core';
import { DeleteAlert } from './DeleteAlert';
import { Role } from '../../types';
import dW from 'decline-word';

interface RoleInstanceProps {
  role: Role;
  rolesLength: number;
  index: number;
  reFetchRoles: Function;
}

export const RoleInstance: FunctionComponent<RoleInstanceProps> = ({
  role,
  index,
  rolesLength,
  reFetchRoles,
}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);

  return (
    <div>
      <RoleEditor
        isOpen={dialogIsOpen}
        setOpenState={setDialogIsOpen}
        editableRole={role}
        reFetchRoles={reFetchRoles}
      />
      <DeleteAlert
        reFetchRoles={reFetchRoles}
        isOpen={alertIsOpen}
        role={role}
        setOpenState={setAlertIsOpen}
      />
      <Callout>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div style={{ fontWeight: 600 }}>{role.name}</div>
            <div className={Classes.TEXT_MUTED} style={{ fontSize: '13px' }}>
              {role.users?.length}{' '}
              {dW(role.users?.length, 'Сотрудник', '', 'а', 'ов')}
            </div>
          </div>
          <ButtonGroup>
            <Button
              minimal
              icon={'edit'}
              onClick={() => setDialogIsOpen(true)}
            />
            <Button
              minimal
              icon={'trash'}
              intent={'danger'}
              onClick={() => setAlertIsOpen(true)}
            />
          </ButtonGroup>
        </div>
      </Callout>
      {index === rolesLength - 1 ? null : <Divider />}
    </div>
  );
};
