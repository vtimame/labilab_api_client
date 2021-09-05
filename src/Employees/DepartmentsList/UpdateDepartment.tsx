import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Store';
import { Classes, Drawer, FormGroup, InputGroup } from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { UPDATE_DEPARTMENT } from '../graphql';
import { Department } from '../../types';
import { PayoutManagersList } from './UpdateDepartment/PayoutManagesList';

interface Props {
  editableDepartment: Department;
  isOpened: boolean;
  setOpenedState: Function;
}

export const UpdateDepartment: FunctionComponent<Props> = observer(
  ({ editableDepartment, isOpened, setOpenedState }) => {
    const { app } = useStore();
    const [department, setDepartment] = useState<Department>();

    const [updateDepartment] = useMutation(UPDATE_DEPARTMENT);

    useEffect(() => {
      setDepartment(editableDepartment);
    }, [editableDepartment]);

    const onChange = (property: string, value: string) => {
      let instance: any = Object.assign({}, department);
      instance[property] = value;
      setDepartment(instance);
    };

    // const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //   await updateDepartment({ variables: department });
    //   setOpenedState(false);
    // };

    return (
      <Drawer
        isOpen={isOpened}
        onClose={() => setOpenedState(false)}
        className={`pb-0 ${app.isDark ? Classes.DARK : ''}`}
        style={{ width: '450px' }}
      >
        <div className={Classes.DRAWER_HEADER}>Изменить департамент</div>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Название департамента">
            <InputGroup
              value={department?.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange('name', event.target.value)
              }
              onBlur={() => updateDepartment({ variables: department })}
            />
          </FormGroup>
          {app.user?.isAdmin ? (
            <PayoutManagersList departmentId={department?._id} />
          ) : null}
        </div>
      </Drawer>
    );
  }
);
