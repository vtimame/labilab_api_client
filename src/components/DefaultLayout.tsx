import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { gql, useQuery } from '@apollo/client';
import { Button, Card, Classes, Alignment, Navbar } from '@blueprintjs/core';
import Avatar from 'react-avatar';
import { BrightnessSwitcher } from './BrightnessSwitcher';
import { LoadingPage } from './LoadingPage';
import { useNavigate } from '@reach/router';
import { Routes } from '../utils/Routes';
import { User } from '../types';
import { useStore } from '../store/Store';

export const AUTH_USER = gql`
  query {
    whoAmI {
      name
      surname
      isAdmin
      phones {
        phone
        isLogin
      }
      alias
      createdAt
      avatar {
        link
      }
      role {
        name
      }
      division {
        name
      }
    }
  }
`;

interface Props {
  fluid?: boolean;
}

export const DefaultLayout: FunctionComponent<Props> = observer(
  ({ children, fluid }) => {
    const { data } = useQuery(AUTH_USER);
    const navigate = useNavigate();
    const { app } = useStore();

    const logout = () => {
      localStorage.removeItem('jwt');
      window.location.replace('/');
    };

    const formatPhone = (phone: string | undefined): string => {
      return `+7 ${String(phone).slice(0, 3)} ${String(phone).slice(
        3,
        6
      )}-${String(phone).slice(6, 8)}-${String(phone).slice(8, 10)}`;
    };

    if (data) {
      const user: User = data['whoAmI'];
      app.setUser(user);
      return (
        <div className={`${fluid ? 'container-fluid' : 'container'} py-3`}>
          <div className="row">
            <div
              className={
                fluid ? 'col-lg-10 offset-lg-1' : 'col-lg-8 offset-lg-2'
              }
            >
              <div className="d-flex justify-content-between align-items-end mb-3">
                <div>
                  <div className="d-flex align-items-center ">
                    <Avatar
                      name={`${user['surname']} ${user['name']}`}
                      size="55"
                      src={user.avatar?.link || undefined}
                      round
                    />
                    <div className="mx-3">
                      <div style={{ fontWeight: 600, fontSize: '1.2rem' }}>
                        {user['surname']} {user['name']}
                      </div>
                      {user.phones.length > 0 ? (
                        <div
                          className={Classes.TEXT_MUTED}
                          style={{ fontSize: '13px' }}
                        >
                          {formatPhone(
                            user.phones.find((el) => el?.isLogin)?.phone ||
                              user.phones[0]?.phone
                          )}
                        </div>
                      ) : null}
                      <div
                        className={Classes.TEXT_MUTED}
                        style={{ fontSize: '13px' }}
                      >
                        @{user['alias']}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                  <Button
                    className="bp3-minimal"
                    icon="user"
                    text="Моя учетная запись"
                    onClick={() => navigate(Routes.ME)}
                  />
                  <Navbar.Divider />
                  <Button
                    className="bp3-minimal"
                    icon="list"
                    text="Сотрудники"
                    onClick={() => navigate(Routes.EMPLOYEES)}
                  />
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                  <Button
                    intent="danger"
                    minimal
                    icon={'power'}
                    onClick={logout}
                  >
                    Выйти
                  </Button>
                  <Navbar.Divider />
                  <BrightnessSwitcher />
                </Navbar.Group>
              </Navbar>
              <Card>{children}</Card>
            </div>
          </div>
        </div>
      );
    }

    return <LoadingPage />;
  }
);
