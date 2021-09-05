import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Classes, Dialog } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { DELETE_ROLE } from '../graphql';
import { useStore } from '../../store/Store';
import { Role } from '../../types';

interface DeleteAlertProps {
  reFetchRoles: Function;
  isOpen: boolean;
  role: Role;
  setOpenState: Function;
}

export const DeleteAlert: FunctionComponent<DeleteAlertProps> = observer(
  ({ reFetchRoles, isOpen, role, setOpenState }) => {
    const { app } = useStore();
    const [deleteRole] = useMutation(DELETE_ROLE);

    const onConfirm = async () => {
      await deleteRole({ variables: role });
      await reFetchRoles();
      setOpenState(false);
    };

    // @ts-ignore
    return role?.users?.length > 0 ? (
      <Dialog
        isOpen={isOpen}
        onClose={() => setOpenState(false)}
        className={app.isDark ? Classes.DARK : ''}
      >
        <div className={Classes.DIALOG_BODY}>Эту роль нельзя удалить</div>
      </Dialog>
    ) : (
      <Alert
        isOpen={isOpen}
        onClose={() => setOpenState(false)}
        className={app.isDark ? Classes.DARK : ''}
        intent={'danger'}
        confirmButtonText={'Удалить'}
        cancelButtonText={'Отмена'}
        onCancel={() => setOpenState(false)}
        onConfirm={onConfirm}
      >
        Вы действительно хотите удалить роль ${role.name}?
      </Alert>
    );
  }
);
