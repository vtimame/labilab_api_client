import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/Store';
import { Button, Classes, Dialog, Icon } from '@blueprintjs/core';
import { Logotype } from '../components/logotype';
import { useLocation } from '@reach/router';
import { parse } from 'querystring';
import { gql, useQuery } from '@apollo/client';
import { Application } from '../types';

export const AuthPage = observer(() => {
  const { app } = useStore();
  const { search } = useLocation();
  const params = useState(parse(search));

  const application = useQuery(
    gql`
      query application($payload: ApplicationInput!) {
        authApplication(payload: $payload) {
          _id
          name
          url
        }
      }
    `,
    { variables: { payload: { url: params[0]['?destination'] } } }
  );

  const authorizeApplication = () => {
    const destination = params[0]['?destination'];
    window.location.replace(String(destination));
  };

  if (application?.data?.authApplication) {
    const applicationInstance: Application = application?.data?.authApplication;
    return (
      <Dialog
        isOpen={true}
        className={`${app.isDark ? Classes.DARK : ''} pb-0`}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className="d-flex align-items-center justify-content-center">
            <div
              style={{
                borderRadius: '100%',
                height: '72px',
                width: '72px',
                padding: '0.5rem',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Logotype size={15} />
            </div>
            <div
              style={{
                width: '50px',
                borderBottom: `2px dashed ${
                  app.isDark ? '#A7B6C2' : '#738694'
                }`,
              }}
            />
            <div
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#15B371',
                borderRadius: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon icon={'small-tick'} iconSize={18} />
            </div>
            <div
              style={{
                width: '50px',
                borderBottom: `2px dashed ${
                  app.isDark ? '#A7B6C2' : '#738694'
                }`,
              }}
            />

            <div
              style={{
                borderRadius: '100%',
                height: '72px',
                width: '72px',
                padding: '0.5rem',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Logotype size={15} />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 className="mb-2">Авторизация приложения</h2>
            <div className="mb-3">
              Приложение {applicationInstance.name} запрашивает токент
              авторизации
            </div>
            <Button
              intent={'success'}
              icon={'tick'}
              fill
              onClick={authorizeApplication}
            >
              Авторизовать
            </Button>
          </div>
        </div>
      </Dialog>
    );
  } else if (!application?.loading) {
    return <div>Приложение не найдено</div>;
  }

  return null;
});
