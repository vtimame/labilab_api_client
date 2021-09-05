import React, { FunctionComponent, useState } from 'react';
import { Logotype } from '../components/logotype';
import { observer } from 'mobx-react-lite';
import { LoginForm } from './LoginForm';
import { PasswordForm } from './PasswordForm';
import { Card } from '@blueprintjs/core';
import { BrightnessSwitcher } from '../components/BrightnessSwitcher';
import { RouteComponentProps } from '@reach/router';
import { useStore } from '../store/Store';

interface Props extends RouteComponentProps {}
export const LoginPage: FunctionComponent<Props> = observer(() => {
  const { app } = useStore();
  const [userInstance, setUserInstance] = useState(null);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div
      className="container py-3 d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <BrightnessSwitcher />
      </div>
      <div className="col-xl-8 col-lg-10 col-12">
        <div className="row d-flex align-items-end">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="d-flex justify-content-center justify-content-md-start">
              <Logotype color={app.brightness === 'dark' ? 'white' : ''} />
            </div>
            <h2 className="mb-2">Единый аккаунт Oyster Telecom</h2>
            <div>
              Здесь будет воодушевляющий текст, вдохновляющий на героические
              подвиги и супер успешные сделки
            </div>
          </div>
          <div className="col-12 col-md-6">
            <Card>
              {userInstance === null ? (
                <LoginForm
                  loginValue={loginValue}
                  setLoginValue={setLoginValue}
                  setUserInstance={setUserInstance}
                />
              ) : (
                <PasswordForm
                  loginValue={loginValue}
                  passwordValue={passwordValue}
                  setPasswordValue={setPasswordValue}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});
