import React, { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { usePermissionsQuery } from '../EmployeesPage';
import { EditDivision } from './EditDivision';
import { Button, Menu, Popover } from '@blueprintjs/core';
import { DeleteAlert } from './DeleteAlert';
import { Division, Maybe } from '../../types';
import { CreateUserDialog } from './DivisionActions/CreateUserDialog';

interface DivisionActionsProps {
  division: Maybe<Division> | null | undefined;
  reFetchDepartments: Function;
}

export const DivisionActions: FunctionComponent<DivisionActionsProps> = observer(
  ({ division, reFetchDepartments }) => {
    const permissionsQuery = usePermissionsQuery();
    const [
      editDivisionDrawerIsOpened,
      setEditDivisionDrawerOpenedState,
    ] = useState(false);
    const [deleteAlertIsOpened, setDeleteAlertOpenedState] = useState(false);
    const userIsWriter = permissionsQuery?.data?.permission?.iAmIsWriter;
    const [newUser, setNewUser] = useState<boolean>(false);

    return userIsWriter ? (
      <div>
        <EditDivision
          isOpen={editDivisionDrawerIsOpened}
          setOpenState={setEditDivisionDrawerOpenedState}
          editableDivision={division}
        />
        <DeleteAlert
          isOpen={deleteAlertIsOpened}
          setOpenedState={setDeleteAlertOpenedState}
          division={division}
        />
        {division?._id ? (
          <CreateUserDialog
            isOpen={newUser}
            setOpen={setNewUser}
            divisionId={division._id}
            reFetchDepartments={reFetchDepartments}
          />
        ) : null}
        <Popover
          position={'right-top'}
          content={
            <Menu>
              <Menu.Item
                text="Добавить сотрудника"
                onClick={() => setNewUser(true)}
              />
              <Menu.Divider />
              <Menu.Item
                text={'Изменить отдел'}
                icon={'edit'}
                onClick={() => setEditDivisionDrawerOpenedState(true)}
              />
              <Menu.Item
                text={'Удалить отдел'}
                onClick={() => setDeleteAlertOpenedState(true)}
                icon={'trash'}
                intent={'danger'}
              />
            </Menu>
          }
        >
          <Button minimal icon={'more'} />
        </Popover>
      </div>
    ) : null;
  }
);
