import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react';
import {
  Button,
  Classes,
  Drawer,
  FormGroup,
  HTMLSelect,
  InputGroup,
} from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Store';
import { useMutation } from '@apollo/client';
import { UPDATE_DIVISION } from '../graphql';
import { useDepartmentsQuery } from '../EmployeesPage';
import { Division, Maybe, User } from '../../types';

interface EditDivisionProps {
  isOpen: boolean;
  setOpenState: Function;
  editableDivision?: Division | null;
}

export const EditDivision: FunctionComponent<EditDivisionProps> = observer(
  ({ isOpen, setOpenState, editableDivision }) => {
    const { app } = useStore();
    const departmentsQuery = useDepartmentsQuery();
    const [division, setDivision] = useState<Division | null | undefined>(
      editableDivision
    );
    const [updateDivision] = useMutation(UPDATE_DIVISION);

    const onChange = (property: string, value: string) => {
      const instance: any = Object.assign({}, division);
      instance[property] = value;
      setDivision(instance);
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await updateDivision({
        variables: {
          payload: {
            _id: division?._id,
            name: division?.name,
            chefId: division?.chefId,
          },
        },
      });
      await departmentsQuery.refetch();
      setOpenState(false);
    };

    const renderChefSelect = () => {
      const users: any[] = [
        { label: 'Без руководителя', value: '', key: 'emptyChef' },
      ];
      editableDivision?.users.forEach((user: Maybe<User>) => {
        users.push({
          label: `${user?.surname} ${user?.name}`,
          value: user?._id,
          key: user?._id,
        });
      });

      return (
        <HTMLSelect
          fill
          options={users}
          value={division?.chefId || ''}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            onChange('chefId', event.target.value)
          }
        />
      );
    };

    return (
      <Drawer
        isOpen={isOpen}
        onClose={() => setOpenState(false)}
        className={app.isDark ? Classes.DARK : ''}
        style={{ width: '450px' }}
      >
        <div className={Classes.DRAWER_HEADER}>Измениить отдел</div>
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={onSubmit}>
            <FormGroup label="Название отдела">
              <InputGroup
                autoFocus
                value={division?.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChange('name', event.target.value)
                }
              />
            </FormGroup>
            <FormGroup label="Руководитель отдела">
              {renderChefSelect()}
            </FormGroup>
            <FormGroup>
              <Button fill intent={'success'} type={'submit'}>
                Сохранить
              </Button>
            </FormGroup>
          </form>
        </div>
      </Drawer>
    );
  }
);
