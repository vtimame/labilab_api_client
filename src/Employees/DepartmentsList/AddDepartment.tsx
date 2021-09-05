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
  Dialog,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';
import { useStore } from '../../store/Store';
import { useMutation } from '@apollo/client';
import { CREATE_DEPARTMENT } from '../graphql';

interface Props {
  reFetchDepartments: Function;
}

export const AddDepartment: FunctionComponent<Props> = observer(
  ({ reFetchDepartments }) => {
    const { app } = useStore();
    const [dialogIsOpened, setDialogOpenedState] = useState(false);
    const [department, setDepartment] = useState({ name: '' });

    const [createDepartment] = useMutation(CREATE_DEPARTMENT);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await createDepartment({ variables: department });
      setDialogOpenedState(false);
      setDepartment({ name: '' });
      await reFetchDepartments();
    };

    const onChange = (property: string, value: string) => {
      let instance: any = Object.assign({}, department);
      instance[property] = value;
      setDepartment(instance);
    };

    return (
      <>
        <Button
          icon={'plus'}
          small
          minimal
          onClick={() => setDialogOpenedState(true)}
          text="Департамент"
        />
        <Dialog
          isOpen={dialogIsOpened}
          onClose={() => setDialogOpenedState(false)}
          className={`pb-0 ${app.isDark ? Classes.DARK : ''}`}
        >
          <div className={`${Classes.DIALOG_BODY} pb-0`}>
            <form onSubmit={onSubmit}>
              <FormGroup label="Название департамента">
                <InputGroup
                  autoFocus
                  value={department.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    onChange('name', event.target.value)
                  }
                />
              </FormGroup>
              <FormGroup className="mb-0">
                <Button
                  intent={'success'}
                  fill
                  type={'submit'}
                  disabled={department.name.length === 0}
                >
                  Сохранить
                </Button>
              </FormGroup>
            </form>
          </div>
        </Dialog>
      </>
    );
  }
);
