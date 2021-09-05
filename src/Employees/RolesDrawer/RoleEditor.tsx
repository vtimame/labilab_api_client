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
import { CREATE_ROLE, UPDATE_ROLE } from '../graphql';
import { Role } from '../../types';

interface AddRoleProps {
  isOpen: boolean;
  setOpenState: Function;
  editableRole?: Role;
  reFetchRoles?: Function;
}
export const RoleEditor: FunctionComponent<AddRoleProps> = observer(
  ({ isOpen, setOpenState, editableRole, reFetchRoles }) => {
    const { app } = useStore();
    const [role, setRole] = useState<Role | any>(editableRole || { name: '' });
    const [createRole] = useMutation(CREATE_ROLE);
    const [updateRole] = useMutation(UPDATE_ROLE);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (role._id) await updateRole({ variables: role });
      else await createRole({ variables: role });
      setOpenState(false);
      if (reFetchRoles) await reFetchRoles();
      if (!role._id) setRole({ name: '' });
    };

    const onChange = (property: string, value: string) => {
      const instance: any = Object.assign({}, role);
      instance[property] = value;
      setRole(instance);
    };

    return (
      <Dialog
        isOpen={isOpen}
        onClose={() => setOpenState(false)}
        className={app.isDark ? Classes.DARK : ''}
        style={{ paddingBottom: 0 }}
      >
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={onSubmit}>
            <FormGroup label="Название роли">
              <InputGroup
                autoFocus
                value={role.name}
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
                disabled={role.name.length === 0}
              >
                Сохранить
              </Button>
            </FormGroup>
          </form>
        </div>
      </Dialog>
    );
  }
);
