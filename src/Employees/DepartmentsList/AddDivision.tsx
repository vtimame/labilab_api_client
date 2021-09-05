import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Classes,
  Drawer,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';
import { useStore } from '../../store/Store';
import { useDepartmentsQuery } from '../EmployeesPage';
import { useMutation } from '@apollo/client';
import { CREATE_DIVISION } from '../graphql';

interface AddDivisionProps {
  isOpened: boolean;
  setOpenedState: Function;
  departmentId: string;
}

export const AddDivision: FunctionComponent<AddDivisionProps> = observer(
  ({ isOpened, setOpenedState, departmentId }) => {
    const initialState = {
      name: '',
      departmentId,
      managersIds: [],
    };

    const { app } = useStore();
    const { refetch } = useDepartmentsQuery();
    const [division, setDivision] = useState(initialState);
    const [createDivision] = useMutation(CREATE_DIVISION);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await createDivision({ variables: division });
      await refetch();
      setOpenedState(false);
      setDivision(initialState);
    };

    const onChange = (property: string, value: string) => {
      let instance: any = Object.assign({}, division);
      instance[property] = value;
      setDivision(instance);
    };

    return (
      <Drawer
        isOpen={isOpened}
        onClose={() => setOpenedState(false)}
        className={`${app.isDark ? Classes.DARK : ''} pb-0`}
        style={{ width: '450px' }}
      >
        <div className={Classes.DRAWER_HEADER}>Добавить новый отдел</div>
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={onSubmit}>
            <FormGroup label="Название отдела">
              <InputGroup
                autoFocus
                value={division.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChange('name', event.target.value)
                }
              />
            </FormGroup>
            <FormGroup className="mb-0">
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
