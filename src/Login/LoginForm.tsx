import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, FormGroup, InputGroup, Toaster } from '@blueprintjs/core';
import moment from 'moment';

const MUTATION = gql`
  mutation CheckUserLogin($login: String!) {
    checkUserLogin(login: $login) {
      user {
        name
        surname
      }
    }
  }
`;

interface Props {
  loginValue: string;
  setLoginValue: Function;
  setUserInstance: Function;
}

interface IUser {
  name: string;
  surname: string;
  mobilePhone: number;
}

const toaster = Toaster.create({ maxToasts: 10, position: 'bottom-right' });
export const LoginForm: FunctionComponent<Props> = ({
  loginValue,
  setLoginValue,
  setUserInstance,
}) => {
  const [inputError, setInputError] = useState('');

  const greeting = () => {
    const date = Number(moment().format('HH'));
    const time = isNaN(date) ? 12 : date;
    if (time >= 0 && time <= 5) return 'Доброй ночи';
    else if (time >= 6 && time <= 11) return 'Доброе утро';
    else if (time >= 12 && time <= 17) return 'Добрый день';
    else if (time >= 18 && time <= 24) return 'Добрый вечер';
  };

  const [checkUserLogin] = useMutation(MUTATION, {
    onCompleted: (data) => {
      const user: IUser = data['checkUserLogin'].user;
      setUserInstance(user);
      toaster.show({
        intent: 'success',
        icon: 'envelope',
        message: `${greeting()}, ${
          user.name
        }! На ваш номер телефона отправлено смс сообщение с пин-кодом`,
      });
      if (inputError.length > 0) setInputError('');
    },
    onError: (error) => setInputError(error.message),
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setInputError('');
    await checkUserLogin({ variables: { login: loginValue } });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormGroup
        helperText={inputError}
        label="Email, alias или номер телефона"
        intent={inputError.length > 0 ? 'danger' : 'none'}
      >
        <InputGroup
          autoFocus={true}
          value={loginValue}
          intent={inputError.length > 0 ? 'danger' : 'none'}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setLoginValue(event.target.value)
          }
        />
      </FormGroup>
      <Button intent={'success'} fill type={'submit'}>
        Продолжить
      </Button>
    </form>
  );
};
