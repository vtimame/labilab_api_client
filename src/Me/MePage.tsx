import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { Callout, Classes, Divider } from '@blueprintjs/core';
import { Fingerprint } from '../components/Fingerprint';
import { DefaultLayout } from '../components/DefaultLayout';
import { gql, useQuery } from '@apollo/client';
import { UserToken } from '../types';
import { UAParser } from 'ua-parser-js';
import moment from 'moment';
import { LoadingComponent } from '../components/LoadingComponent';

const TOKENS = gql`
  query {
    whoAmI {
      tokens {
        _id
        origin
        userAgent
        createdAt
        token
      }
    }
  }
`;

interface Props {}
export const MePage: FunctionComponent<Props> = observer(() => {
  const tokensQuery = useQuery(TOKENS);
  const tokens: UserToken[] = tokensQuery?.data?.whoAmI?.tokens;

  const getUA = (ua: string) => {
    const parser = new UAParser();
    parser.setUA(ua);
    return parser.getResult();
  };

  if (tokensQuery.loading) return <LoadingComponent />;

  return (
    <DefaultLayout>
      {tokens.length === 0 ? (
        <div
          style={{ height: '500px' }}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <Fingerprint />
          <h2>У вас пока нет сессий</h2>
          <div>Здесь будут ваши авторизованные сессии</div>
          <div className={Classes.TEXT_MUTED}>Этот раздел разрабатывается</div>
        </div>
      ) : (
        tokens.map((token: UserToken, tokenIndex: number) => {
          const ua = getUA(token.userAgent);
          return (
            <div key={token._id}>
              <Callout className={`d-flex justify-content-between`}>
                <div>
                  <div>
                    <div>
                      {localStorage.getItem('jwt') === token.token ? (
                        <span style={{ fontWeight: 600 }}>
                          {' '}
                          Это ваша текущая сессия
                        </span>
                      ) : null}
                    </div>
                    <div>
                      {ua.os.name} {ua.os.version} - {ua.browser.name}{' '}
                      {ua.browser.version}
                    </div>
                  </div>
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href={token.origin} target="_blank">
                    {token.origin}
                  </a>
                </div>
                <div>
                  <div style={{ fontSize: '13px' }}>
                    {moment(token.createdAt).format('DD.MM.YYYY HH:mm:ss')}
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <a
                      href="https://1"
                      onClick={() => {}}
                      style={{ color: '#c23030' }}
                    >
                      Завершить
                    </a>
                  </div>
                </div>
              </Callout>
              {tokenIndex === tokens.length - 1 ? null : <Divider />}
            </div>
          );
        })
      )}
    </DefaultLayout>
  );
});
