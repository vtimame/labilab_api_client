import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { useStore } from '../store/Store';

const MUTATION = gql`
  mutation Login($login: String!, $password: String!) {
    login(payload: { login: $login, password: $password }) {
      accessToken
    }
  }
`;

interface Props {
  loginValue: string;
  passwordValue: string;
  setPasswordValue: Function;
}

export const PasswordForm: FunctionComponent<Props> = ({
  loginValue,
  passwordValue,
  setPasswordValue,
}) => {
  const { app } = useStore();
  const [inputError, setInputError] = useState('');
  const history = useHistory();

  const [login] = useMutation(MUTATION, {
    onCompleted: (data) => {
      app.setUserIsLogged(true);
      localStorage.setItem('jwt', data['login']['accessToken']);
      setTimeout(() => {
        history.push('/me');
      }, 500);
    },
    onError: (error) => setInputError(error.message),
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setInputError('');
    await login({ variables: { login: loginValue, password: passwordValue } });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormGroup
        helperText={inputError}
        intent={inputError.length > 0 ? 'danger' : 'none'}
        label="Пин-код"
      >
        <InputGroup
          value={passwordValue}
          autoFocus
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPasswordValue(event.target.value)
          }
        />
      </FormGroup>
      <Button intent={'success'} fill type={'submit'}>
        Войти
      </Button>
    </form>
  );
};
