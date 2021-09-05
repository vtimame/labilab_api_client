import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Classes, Dialog } from '@blueprintjs/core';
import { useStore } from '../../store/Store';
import { useMutation } from '@apollo/client';
import { DELETE_DEPARTMENT } from '../graphql';
import { Department } from '../../types';

interface Props {
  isOpened: boolean;
  setOpenedState: Function;
  department: Department;
  reFetchDepartments: Function;
}

export const DeleteAlert: FunctionComponent<Props> = observer(
  ({ isOpened, setOpenedState, department, reFetchDepartments }) => {
    const { app } = useStore();
    const [deleteDepartment] = useMutation(DELETE_DEPARTMENT);

    const onConfirm = async () => {
      await deleteDepartment({ variables: { _id: department._id } });
      await reFetchDepartments();
      setOpenedState(false);
    };

    return department.divisions?.length === 0 ? (
      <Alert
        isOpen={isOpened}
        onClose={() => setOpenedState(false)}
        className={app.isDark ? Classes.DARK : ''}
        intent={'danger'}
        confirmButtonText="Удалить"
        cancelButtonText="Отмена"
        onConfirm={onConfirm}
      >
        <div className={Classes.DIALOG_BODY}>
          Вы действительно хотите удалить
          <span style={{ fontWeight: 600 }}>&nbsp;{department.name}?</span>
        </div>
      </Alert>
    ) : (
      <Dialog
        isOpen={isOpened}
        onClose={() => setOpenedState(false)}
        style={{ paddingBottom: 0, textAlign: 'center' }}
        className={app.isDark ? Classes.DARK : ''}
      >
        <div className={Classes.DIALOG_BODY}>
          Нельзя удалить департамент пока в нем есть отделы
        </div>
      </Dialog>
    );
  }
);
