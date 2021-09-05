import React, { FunctionComponent, useState } from 'react';
import { Button, Menu, Popover } from '@blueprintjs/core';
import { DeleteAlert } from './DeleteAlert';
import { UpdateDepartment } from './UpdateDepartment';
import { AddDivision } from './AddDivision';
import { usePermissionsQuery } from '../EmployeesPage';
import { Department } from '../../types';

interface Props {
  department: Department;
  reFetchDepartments: Function;
}

export const DepartmentActions: FunctionComponent<Props> = ({
  department,
  reFetchDepartments,
}) => {
  const [
    updateDepartmentDialogIsOpened,
    setUpdateDepartmentDialogOpenedState,
  ] = useState(false);
  const [deleteAlertIsOpened, setDeleteAlertOpenedState] = useState(false);
  const [addDivisionDialogIsOpened, setAddDivisionDialogOpenedState] = useState(
    false
  );
  const permissionsQuery = usePermissionsQuery();
  const userIsWriter = permissionsQuery?.data?.permission?.iAmIsWriter;

  return userIsWriter ? (
    <>
      <DeleteAlert
        isOpened={deleteAlertIsOpened}
        setOpenedState={setDeleteAlertOpenedState}
        department={department}
        reFetchDepartments={reFetchDepartments}
      />
      <UpdateDepartment
        editableDepartment={department}
        isOpened={updateDepartmentDialogIsOpened}
        setOpenedState={setUpdateDepartmentDialogOpenedState}
      />
      <AddDivision
        isOpened={addDivisionDialogIsOpened}
        setOpenedState={setAddDivisionDialogOpenedState}
        departmentId={department._id}
      />
      <Popover
        position={'right-top'}
        content={
          <Menu>
            <Menu.Item
              text="Добавить отдел"
              icon={'plus'}
              onClick={() => setAddDivisionDialogOpenedState(true)}
            />
            <Menu.Divider />
            <Menu.Item
              text="Изменить департамент"
              icon={'edit'}
              onClick={() => setUpdateDepartmentDialogOpenedState(true)}
            />
            <Menu.Item
              text="Удалить департамент"
              icon={'trash'}
              intent={'danger'}
              onClick={() => setDeleteAlertOpenedState(true)}
            />
          </Menu>
        }
      >
        <Button minimal icon={'more'} />
      </Popover>
    </>
  ) : null;
};
