import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  HTMLSelect,
  InputGroup,
} from '@blueprintjs/core';
import { useStore } from '../../../store/Store';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { client } from '../../../utils/apolloClient';
import { CREATE_USER } from '../../graphql';

interface CreateUserDialogProps {
  isOpen: boolean;
  setOpen: Function;
  divisionId: string;
  reFetchDepartments: Function;
}

interface INewUserInstance {
  name: string;
  surname: string;
  patronymic: string;
  sex: number;
  alias: string;
  divisionId: string;
}

const GET_USER_BY_ALIAS = gql`
  query getUserByAlias($payload: UserInput!) {
    user(payload: $payload) {
      _id
    }
  }
`;

export const CreateUserDialog: FunctionComponent<CreateUserDialogProps> = observer(
  (props) => {
    const { app } = useStore();
    const { register, handleSubmit, errors } = useForm();

    const newUserInstance: INewUserInstance = {
      name: '',
      surname: '',
      patronymic: '',
      sex: 0,
      alias: '',
      divisionId: props.divisionId,
    };

    const [newUser, setNewUser] = useState<INewUserInstance>(newUserInstance);
    const [createUser] = useMutation(CREATE_USER);

    const onSubmit = async (data: any) => {
      data.sex = Number(data.sex);
      await createUser({ variables: { payload: newUser } });
      await props.reFetchDepartments();
      setNewUser(newUserInstance);
      props.setOpen(false);
    };

    const validateAlias = async (alias: string) => {
      const result = await client.query({
        query: GET_USER_BY_ALIAS,
        variables: { payload: { alias } },
      });
      return !result?.data?.user;
    };

    return (
      <Dialog
        className={`${app.isDark ? Classes.DARK : ''} pb-0`}
        isOpen={props.isOpen}
        onClose={() => props.setOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          <div style={{ fontWeight: 600 }}>Добавить нового сотрудника</div>
          <form className="row mt-3" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup label="Фамилия" className="col-4">
              <InputGroup
                value={newUser.surname}
                autoFocus
                name="surname"
                intent={errors.surname ? 'danger' : 'none'}
                inputRef={register({ required: true })}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, ...{ surname: event.target.value } })
                }
              />
            </FormGroup>
            <FormGroup label="Имя" className="col-4">
              <InputGroup
                value={newUser.name}
                name="name"
                intent={errors.name ? 'danger' : 'none'}
                inputRef={register({ required: true })}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, ...{ name: event.target.value } })
                }
              />
            </FormGroup>
            <FormGroup label="Отчество" className="col-4">
              <InputGroup
                value={newUser.patronymic}
                name="patronymic"
                intent={errors.patronymic ? 'danger' : 'none'}
                inputRef={register({ required: true })}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewUser({
                    ...newUser,
                    ...{ patronymic: event.target.value },
                  })
                }
              />
            </FormGroup>
            <FormGroup label="Алиас" className="col-6">
              <InputGroup
                value={newUser.alias}
                name="alias"
                intent={errors.alias ? 'danger' : 'none'}
                inputRef={register({ validate: validateAlias, required: true })}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewUser({
                    ...newUser,
                    ...{ alias: event.target.value },
                  })
                }
              />
            </FormGroup>
            <FormGroup label="Алиас" className="col-6">
              <HTMLSelect
                name="sex"
                elementRef={register}
                fill
                options={[
                  { label: 'Мужской', value: 0 },
                  { label: 'Женский', value: 1 },
                ]}
              />
            </FormGroup>
            <div className="col-12 mb-0">
              <Button fill intent={'success'} type={'submit'} small>
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    );
  }
);
