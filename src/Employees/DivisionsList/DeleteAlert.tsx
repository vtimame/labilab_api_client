import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Classes, Dialog } from '@blueprintjs/core';
import { useStore } from '../../store/Store';
import { useMutation } from '@apollo/client';
import { DELETE_DIVISION } from '../graphql';
import { useDepartmentsQuery } from '../EmployeesPage';
import { Division } from '../../types';

interface DeleteAlertProps {
  isOpen: boolean;
  setOpenedState: Function;
  division?: Division | null;
}

export const DeleteAlert: FunctionComponent<DeleteAlertProps> = observer(
  ({ division, isOpen, setOpenedState }) => {
    const { app } = useStore();
    const [deleteDivision] = useMutation(DELETE_DIVISION);
    const departmentsQuery = useDepartmentsQuery();

    const onConfirm = async () => {
      await deleteDivision({ variables: { _id: division?._id } });
      await departmentsQuery.refetch();
      setOpenedState(false);
    };

    return division?.users?.length === 0 ? (
      <Alert
        isOpen={isOpen}
        onClose={() => setOpenedState(false)}
        className={app.isDark ? Classes.DARK : ''}
        confirmButtonText="Удалить"
        cancelButtonText="Отмена"
        intent={'danger'}
        onConfirm={onConfirm}
      >
        <div>
          Вы действительно хотите удалить{' '}
          <span style={{ fontWeight: 600 }}>{division.name}</span>?
        </div>
      </Alert>
    ) : (
      <Dialog
        isOpen={isOpen}
        onClose={() => setOpenedState(false)}
        className={app.isDark ? `${Classes.DARK} pb-0` : 'pb-0'}
      >
        <div className={`${Classes.DIALOG_BODY} d-flex justify-content-center`}>
          Нельзя удалить отдел пока в нем есть сотрудники
        </div>
      </Dialog>
    );
  }
);
