import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/Store';
import { Button, Classes, Drawer } from '@blueprintjs/core';
import { RoleEditor } from './RolesDrawer/RoleEditor';
import { RolesList } from './RolesDrawer/RolesList';
import { useQuery } from '@apollo/client';
import { ROLES } from './graphql';
import { LoadingComponent } from '../components/LoadingComponent';
import { ErrorComponent } from '../components/ErrorComponent';

export const RolesDrawer = observer(() => {
  const { app } = useStore();
  const [drawerIsOpen, setDrawerOpenState] = useState(false);
  const [addRoleDialogIsOpen, setAddRoleDialogOpenState] = useState(false);
  const rolesQuery = useQuery(ROLES);

  if (rolesQuery.loading) return <LoadingComponent />;
  else if (rolesQuery.error) return <ErrorComponent />;

  return (
    <>
      <RoleEditor
        isOpen={addRoleDialogIsOpen}
        setOpenState={setAddRoleDialogOpenState}
        reFetchRoles={rolesQuery.refetch}
      />
      <Button
        minimal
        small
        icon={'clipboard'}
        onClick={() => setDrawerOpenState(true)}
        text="Роли"
      />
      <Drawer
        style={{ width: '450px' }}
        isOpen={drawerIsOpen}
        onClose={() => setDrawerOpenState(false)}
        className={app.isDark ? Classes.DARK : ''}
      >
        <div className={Classes.DRAWER_HEADER}>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ width: '100%' }}
          >
            <div>Управление ролями</div>
            <Button
              intent={'success'}
              minimal
              icon={'plus'}
              onClick={() => setAddRoleDialogOpenState(true)}
            >
              Добавить роль
            </Button>
          </div>
        </div>
        <div className={Classes.DIALOG_BODY} style={{ overflowY: 'auto' }}>
          <RolesList rolesQuery={rolesQuery} />
        </div>
      </Drawer>
    </>
  );
});
